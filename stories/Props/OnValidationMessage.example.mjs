import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

const OnValidationMessageExample = () => {
  const [value, setValue] = React.useState('');
  const ref = React.useRef();

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  const handleOnValidationMessage = (message) => {
    setTimeout(() => {
      // setTimeout prevents interference with Safari's automatic reportValidity
      if (ref && ref.current) {
        ref.current.setCustomValidity(
          message.length ? 'Custom error message' : ''
        );
        ref.current.reportValidity();
      }
    }, 0);
  };

  return (
    <PropsTable>
      <DateInput
        name="field_name"
        onChange={handleOnChange}
        onValidationMessage={handleOnValidationMessage}
        ref={ref}
        value={value}
      />
    </PropsTable>
  );
};

export default OnValidationMessageExample;
