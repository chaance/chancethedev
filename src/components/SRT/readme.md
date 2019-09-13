# SRT Component

SRT stands for `screen reader text`. This is a relatively simple component that will visually hide any content that may be needed for screen reader users. It's similar to [Reach UI's `VisuallyHidden`](https://github.com/reach/reach-ui/blob/master/packages/visually-hidden/src/index.js) component (which is probably a better name for it TBH), except that here you can pass a `component` prop to specify whether or not to render a `div` or a `span` element since the two have different permitted nested content per the HTML spec.

## Examples

```jsx
function MyComponent() {
  return (
    // A button with a visible icon needs text to describe the action for screen readers
    <button onClick={() => dispatch({ type: 'download' })}>
      <svg {...svgProps} aria-hidden />
      <SRT>Download the File</SRT> {/* No one will (visually) see this text! */}
    </button>
  );
}
```
