import { h } from 'preact';

export function Element(props) {
  let el = h(props.el.tag, { class: props.el.class }, props.el.text);
  return el;
}
