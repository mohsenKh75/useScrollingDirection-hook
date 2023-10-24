# useScrollingDirection-hook
this hook detect user scrolling direction

usage: asgin this hook to a variable. use a ref as an argument or let the window object be the default value:

//MyComponent.tsx

`const elRef = useRef(null)`

`const direction = useScrollingDirection(elRef)`

or

`const direction = useScrollingDirection()`
