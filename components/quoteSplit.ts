// Splits markdown-compiled slot VNodes into click chunks on a text delimiter
// (`%%`), for the Quote component's progressive-reveal modes.
//
// The walker only cuts where it can do so losslessly:
//   - text nodes are split on the delimiter
//   - plain elements containing a boundary are cloned once per side, so inline
//     formatting (em, mark, code…) survives on BOTH chunks
//   - fragments are transparent (their children join the parent's walk)
//   - everything else (components, void elements, static/stringified vnodes)
//     lands whole in the current chunk — delimiters inside those never split
//
// No whitespace normalization: chunks render as `display: inline` spans inside
// one inline formatting context, so HTML whitespace collapsing handles spacing
// across chunk boundaries by itself.
//
// NOTE: keyed slot content would produce duplicate-key warnings when cloned —
// markdown vnodes are unkeyed, so this is safe for the intended use.
import { Comment, Fragment, Text, createTextVNode, h, isVNode } from 'vue'
import type { VNode } from 'vue'

export type VNodeChunk = VNode[]

interface Part {
  /** true when this part begins a new chunk (i.e. it follows a delimiter) */
  startsChunk: boolean
  vnode: VNode
}

export function split_vnodes(vnodes: VNode[], delimiter = '%%'): VNodeChunk[] {
  const chunks: VNodeChunk[] = [[]]
  for (const part of split_children(vnodes, delimiter)) {
    if (part.startsChunk) chunks.push([])
    chunks[chunks.length - 1].push(part.vnode)
  }
  return chunks
}

/** A chunk is kept only if it renders something — whitespace-only chunks from
 *  consecutive/edge delimiters are dropped, so they cost no clicks. */
export function chunk_has_visible_content(chunk: VNodeChunk): boolean {
  return chunk.some(vnode_is_visible)
}

function split_children(children: VNode[], delimiter: string): Part[] {
  const parts: Part[] = []
  for (const child of children) {
    if (!isVNode(child)) {
      // defensive: hand-built children arrays can contain raw strings
      parts.push(...split_string(String(child), delimiter))
      continue
    }
    parts.push(...split_one(child, delimiter))
  }
  return parts
}

function split_one(v: VNode, delimiter: string): Part[] {
  if (v.type === Text) {
    return split_string(String(v.children ?? ''), delimiter)
  }
  if (v.type === Comment) {
    return [{ startsChunk: false, vnode: v }]
  }
  if (v.type === Fragment) {
    // fragments are transparent — splice their children into this walk
    return split_children((v.children ?? []) as VNode[], delimiter)
  }
  if (typeof v.type === 'string') {
    const children = v.children
    if (children == null || (typeof children !== 'string' && !Array.isArray(children))) {
      // void element or unusual children shape — atomic
      return [{ startsChunk: false, vnode: v }]
    }
    const child_array: VNode[] = Array.isArray(children)
      ? (children as VNode[])
      : [createTextVNode(String(children))]
    const inner = split_children(child_array, delimiter)
    if (!inner.some(p => p.startsChunk)) {
      // no boundary inside — keep the original vnode untouched
      return [{ startsChunk: false, vnode: v }]
    }
    // A boundary falls inside this element (e.g. `==foo %% bar==`): group the
    // inner parts into runs between boundaries and rebuild the element once per
    // run (cloneVNode has no children override — children must go through h()),
    // so formatting survives on both sides of the cut. The markdown paragraph
    // wrapper (`p`) is the exception: re-wrapping each run in a block-level
    // <p> would put every chunk on its own line, so its runs are emitted as
    // transparent fragments and the chunks keep flowing inline.
    const out: Part[] = []
    let run: VNode[] = []
    let run_index = 0
    const inline = v.type !== 'p'
    const flush = () => {
      if (chunk_has_visible_content(run)) {
        out.push({
          startsChunk: run_index > 0,
          vnode: inline ? h(v.type as string, v.props, run) : h(Fragment, null, run),
        })
      } else if (run_index > 0) {
        // boundary inside an invisible run (e.g. `%%` at the element's edge) —
        // keep the boundary itself alive with an empty marker
        out.push({ startsChunk: true, vnode: createTextVNode('') })
      }
      run = []
      run_index++
    }
    for (const part of inner) {
      if (part.startsChunk) flush()
      run.push(part.vnode)
    }
    flush()
    return out
  }
  // components and static (stringified) vnodes cannot be cut — land whole
  return [{ startsChunk: false, vnode: v }]
}

function split_string(s: string, delimiter: string): Part[] {
  const segments = s.split(delimiter)
  const parts: Part[] = []
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    if (seg === '') {
      // delimiter at a segment edge — emit an empty marker so the boundary
      // still takes effect (the flag would otherwise have nothing to ride on)
      if (i > 0) parts.push({ startsChunk: true, vnode: createTextVNode('') })
      continue
    }
    parts.push({ startsChunk: i > 0, vnode: createTextVNode(seg) })
  }
  return parts
}

function vnode_is_visible(v: VNode): boolean {
  if (v.type === Text) return String(v.children ?? '').trim() !== ''
  if (v.type === Comment) return false
  if (typeof v.type === 'string') {
    // structural/void elements (br, img, …) count as visible by definition
    if (v.children == null) return true
    if (typeof v.children === 'string') return v.children.trim() !== ''
    if (Array.isArray(v.children)) return (v.children as VNode[]).some(vnode_is_visible)
  }
  return true
}
