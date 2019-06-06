# dlc-markdown-editor



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute         | Description                                                                                                         | Type                                      | Default     |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `content`             | `content`         | To set the content of the editor element (input, textarea...)                                                       | `string`                                  | `undefined` |
| `customEditorElement` | --                | We can pass in a custom element to handle the editor (<textarea>, <input> or an element that contains one of these) | `HTMLInputElement \| HTMLTextAreaElement` | `undefined` |
| `enableShortcuts`     | `enableshortcuts` | Whether enable or not the keyboard shortcuts                                                                        | `boolean`                                 | `true`      |


## Methods

### `bold() => Promise<void>`

Bold the selected text

#### Returns

Type: `Promise<void>`



### `h1() => Promise<void>`

Convert the selected text into an h1

#### Returns

Type: `Promise<void>`



### `italics() => Promise<void>`

Format the selected text into italics

#### Returns

Type: `Promise<void>`



### `link() => Promise<void>`

Create a link onto the selected text

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
