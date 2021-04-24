# Trello

## Technological Choices Made

- React ES6
- React Hooks
- Indexed DB for storage
  - Huge amount of storage compared to localStorage
  - Asynchronous
  - Versioning Can Be Done in The Future If Needed
- HTML5 Drag And Drop API abstracted into reusable-hooks
- Data Structure Used: `Object` like a `Map`
  - Provides Faster Access To `Lists`, `Tasks` due to Hashing
  - Keys are `UUIDs` generated.
  - Easily Serializing compared to `Map`
  - Keys Must Be `Strings` which must `not be parseable to numbers` as it preserves insertion order otherwise keys are sorted.
- Global State
  - Context + UseReducer
- Folder Structure
  - Models
  - Lib Components
  - Components
  - Icons
  - Hooks
  - Icons
- Abstraction of DnD API into package.
  - Copy `useDrag` and `useDrop` hooks.
  - Copy `DNDContext`.

## Running Project

### Installation of Dependencies

```bash
yarn
```

### Running the Project

```bash
yarn run start
```

### Links

- [Github](https://github.com/rednithin/Trello)
- [Demo](https://rednithin.github.io/Trello/)
