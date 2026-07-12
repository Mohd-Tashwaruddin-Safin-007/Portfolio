import { scroller } from 'react-scroll';

// Imperative smooth-scroll to a section by id.
//
// We intentionally do NOT use react-scroll's <Link component> pattern on MUI
// buttons: MUI's ButtonBase attaches a focus-visible ref that expects a real
// DOM node (it reads node.ownerDocument), but react-scroll's <Link> is a class
// component that doesn't forward its ref to the underlying element. That
// mismatch throws "Cannot read properties of undefined (reading
// 'addEventListener')" on mount and blanks the whole app. Using onClick +
// scroller keeps the MUI components rendering plain DOM nodes.
const DEFAULTS = { smooth: true, duration: 500, offset: -70 };

export function scrollToSection(id, options = {}) {
  scroller.scrollTo(id, { ...DEFAULTS, ...options });
}
