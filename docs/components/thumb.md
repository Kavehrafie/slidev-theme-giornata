# Thumb

## Description

Draws a set of illustration of a hand with a thumb. Useful icon but larger than using the slidev icondes.

## `Thumb` component

The Thumbs component has the following props:

- `dir` (optional) the thumb could point up or down
- `color` (optional) the color scheme of the thumb. the default is 'white'. The best options tend to be the light colors (e.g., `green`, `red`, `blue`)
- `width` (optional) the initial width of the image. Default is 140px

```vue
<Thumb color="green" width="300px" v-drag />
```

Renders as:

<Thumb color='green' width="300px"/>

```vue
<Thumb color="sky" v-drag />
```

Renders as:

<Thumb color="sky" />

```vue
<Thumb color="red" dir="down" v-drag />
```

Renders as:

<Thumb color="red" dir='down'/>
