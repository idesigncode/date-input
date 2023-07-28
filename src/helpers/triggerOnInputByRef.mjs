/**
 * Triggers an "onInput" event and sets the value of an input
 * Used when changing the value of an input by interacting with other DOM elements
 * ? Reference: https://stackoverflow.com/a/62111884/1015678
 * @param {object} ref - the ref of the input
 * @param {*} newValue - the value to update the input with
 */
export const triggerOnInputByRef = (ref, newValue) => {
  if (ref && ref.current) {
    const valueSetter = Object.getOwnPropertyDescriptor(
      ref.current,
      'value',
    ).set;

    const prototypeValueSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(ref.current),
      'value',
    ).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(ref.current, newValue);
    } else {
      valueSetter.call(ref.current, newValue);
    }

    ref.current.dispatchEvent(
      new Event('input', { bubbles: true, composed: true }),
    );
    ref.current.focus();
  }
};
