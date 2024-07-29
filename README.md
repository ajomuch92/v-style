# v-style

A Vue 3 directive to dynamically apply CSS styles to elements using JavaScript.

## Installation

Install the package via npm:

```sh
npm install v-style
```

## Usage

First, import and register the directive in your Vue app:

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import vStyleDirective from 'v-style';

const app = createApp(App);

app.use(vStyleDirective);

app.mount('#app');
```

Then, you can use the `v-style` directive in your components:

```vue
<template>
  <div v-style="styles">This div will have dynamic styles</div>
</template>

<script>
export default {
  data() {
    return {
      styles: {
        color: 'red',
        backgroundColor: 'blue',
        fontSize: '20px',
      },
    };
  },
};
</script>
```

Single install(without install global)
```vue
<template>
  <div v-style="styles">This div will have dynamic styles</div>
</template>

<script setup>
import { vStyle } from 'v-style';
import { ref } from 'vue';

const styles = ref( {
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '20px',
});
</script>
```

## API

### Directive: `v-style`

#### `v-style="{ ... }"`

The `v-style` directive accepts an object where keys are CSS properties in camelCase and values are the corresponding CSS values.

## Contributing

Feel free to submit issues and pull requests to the repository.

## License

MIT
