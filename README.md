# hypernova-svelte

[Svelte](https://github.com/sveltejs/svelte) bindings for [Hypernova](https://github.com/airbnb/hypernova).

On the server, wraps the component in a function to render it to a HTML string given its props.

On the client, calling this function with your component scans the DOM for any server-side rendered instances of it. It then resumes those components using the server-specified props.

## Install

```sh
npm install hypernova-svelte
```

## Usage

Here's how to use it in your module:

```js
import { renderSvelte } from 'hypernova-svelte'
import HeaderComponent from './components/HeaderComponent.svelte'

export default renderSvelte('Header', HeaderComponent)
```