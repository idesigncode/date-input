# @idesigncode/date-input

An ESM date input component with a composable datepicker UI for React.

## Features

- Calendar datepicker UI for date selection.
- Composable components for flexible customisation (optional).
- Customisable display and value formats (as per [date-fns format](https://date-fns.org/docs/format)).
- Maximum/minimum date range.
- Uses the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) to [setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity) (with optional message customisation).
- User typing support.
- [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) screen reader support.
- Keyboard navigation support with `Tab`, `Space`/`Enter` & `Esc/Escape` keys.
- Locale support for internationalisation.
- Inherited text direction support for "RTL" (Right To Left) written languages.
- Light & dark themes with [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
- React [controlled component](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).

## Examples

Check out the [Storybook docs](https://idesigncode-date-input.netlify.app/) for working examples.

## Install

Update/install the [peer dependencies](package.json) as needed.

Install the package:

```
npm i @idesigncode/date-input
```

## Basic usage

Here is a basic example of how to set up the component:

```jsx
import React from 'react';
import DateInput from '@idesigncode/date-input/DateInput.mjs';
import '@idesigncode/date-input/theme.css';
import '@idesigncode/date-input/layout.css';

const BasicUsage = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <DateInput name="field_name" onChange={handleOnChange} value={value} />
  );
};

export default BasicUsage;
```

For more information see the [Required Props](https://idesigncode-date-input.netlify.app/?path=/docs/required-props--docs) example.

## Composable usage

If you want further customisation of the components you can compose them yourself:

```jsx
import React from 'react';
import '@idesigncode/date-input/theme.css';
import Calendar from '@idesigncode/date-input/Calendar.mjs';
import '@idesigncode/date-input/Calendar.css';
import CalendarArrow from '@idesigncode/date-input/CalendarArrow.mjs';
import '@idesigncode/date-input/CalendarArrow.css';
import DateInput from '@idesigncode/date-input/DateInput.mjs';
import '@idesigncode/date-input/DateInput.css';
import CalendarTabs from '@idesigncode/date-input/CalendarTabs.mjs';
import '@idesigncode/date-input/CalendarTabs.css';
import Field from '@idesigncode/date-input/Field.mjs';
import '@idesigncode/date-input/Field.css';
import View from '@idesigncode/date-input/View.mjs';
import '@idesigncode/date-input/View.css';
import ViewBody from '@idesigncode/date-input/ViewBody.mjs';
import '@idesigncode/date-input/ViewBody.css';
import ViewHead from '@idesigncode/date-input/ViewHead.mjs';
import '@idesigncode/date-input/ViewHead.css';
import ViewWeekDays from '@idesigncode/date-input/ViewWeekDays.mjs';
import '@idesigncode/date-input/ViewWeekDays.css';

const ComposableUsage = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <DateInput name="field_name" onChange={handleOnChange} value={value}>
      <Field />
      <Calendar>
        <CalendarArrow />
        <CalendarTabs />
        <View>
          <ViewHead />
          <ViewBody>
            <ViewWeekDays />
          </ViewBody>
        </View>
      </Calendar>
    </DateInput>
  );
};

export default ComposableUsage;
```

For more information about composable usage, please see the [props/children](https://idesigncode-date-input.netlify.app/?path=/docs/props-children--docs) example.

## Styling

The [CSS (themes)](https://idesigncode-date-input.netlify.app/?path=/docs/styling-css-themes--docs) & [CSS (layout)](https://idesigncode-date-input.netlify.app/?path=/docs/styling-css-layout--docs) are exported for use via stylesheets. It is best to declare these default styles _before_ your own styles.

You can also supply your own pre-styled component for the input field with the `as` prop (see the [props/as](https://idesigncode-date-input.netlify.app/?path=/docs/props-as--docs) documentation for more information).

## Validation

Validation of the `value` is performed with the `displayFormat`, `format`, `max`, `min` and `required` props (if given).

This validation occurs during the input field's `onInput` event, and also on initial load (if there is a given `value`).

For more information about validation, please see the [Validation](https://idesigncode-date-input.netlify.app/?path=/docs/validation--docs) example.

You can also set your own custom validity messages with the `onValidationMessage` prop (see the [props/onValidationMessage](https://idesigncode-date-input.netlify.app/?path=/docs/props-onvalidationmessage--docs) example).

## Accessibility

[ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) are used to provide screen reader support.

All interactive elements are keyboard accessible by using the standard `Tab` & `Space`/`Enter` key navigation. The `Esc/Escape` key can also be used to close the `<Calendar />` while open.

Upon the user opening the `<Calendar />`, either the selected date or first selectable date recieves `:focus`.

## Required props

| Prop | Type | Description |
| :-- | :-- | :-- |
| `name` | string | Standard HTML attribute for the field name. |
| `onChange` | func | A function for custom handling of onChange events. Receives the input field's onChange `event` and the `formatValue` (formatted as per `format`). |
| `value` | string | A date string formatted as per the `format` prop or an empty string. |

> _**Note**: It is recommended to update your local state with the `formatValue` rather than the `event.target.value`._

## Optional props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `as` | elementType OR string |  | Customise the input field with either a custom component or an HTML element. |
| `className` | string |  | Can be directly given to each component. |
| `disabled` | bool |  | Disable the input field and prevent calendar opening. |
| `displayFormat` | string | `dd/MM/yyyy` | The [date-fns format](https://date-fns.org/docs/format) of the selected date when displayed to the user. This also becomes the placeholder text (lowercase). |
| `format` | string | `yyyy-MM-dd` | The [date-fns format](https://date-fns.org/docs/format) of the `max`, `min` and `value` props. Also formats the `formatValue` returned from the `onChange` function. |
| `initialView` | string | `Day` | The view to open the calendar to (either `Day`, `Month` or `Year`). |
| `locale` | object | [en-AU](https://github.com/date-fns/date-fns/tree/master/src/locale/en-AU) | The [date-fns locale](https://date-fns.org/docs/Locale) object used for formatting and text translation. |
| `max` | string |  | A date string formatted as per the `format` prop. This will prevent the user selecting a date after this date. |
| `min` | string |  | A date string formatted as per the `format` prop. This will prevent the user selecting a date before this date. |
| `onValidationMessage` | function |  | A function for custom handling of validation messages. Receives an error `message` string (due to an invalid value) or an empty string from the input field's `onInput` event. |
| `open` | bool | `false` | Shows the `<Calendar />` on initial load. |
| `ref` | ref object |  | A React ref for referencing the input field. This must only be applied to the `<DateInput />` component. |
| `required` | bool |  | Standard HTML attribute for specifying a value is required. |
| ...HTML attributes |  |  | These will be passed to the input field unless they are reserved for use within the component. |

### Resources

- Powered by [React](https://github.com/facebook/react) & [date-fns](https://github.com/date-fns/date-fns).
- Styled with [Sass](https://github.com/sass/sass) & [PostCSS](https://github.com/postcss/postcss).

#### License

[MIT](LICENSE)
