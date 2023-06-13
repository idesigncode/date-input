import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import format from 'date-fns/format';
import DateInput from '../src/DateInput.mjs';
import '../theme.css';
import '../layout.css';

const ValidationExample = () => {
  const [value, setValue] = React.useState('');
  const ref = React.useRef();

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
    setTimeout(() => {
      // setTimeout prevents interference with Safari's automatic reportValidity
      if (ref && ref.current) {
        ref.current.reportValidity();
      }
    }, 0);
  };

  return (
    <PropsTable>
      <DateInput
        displayFormat="MM-yyyy-dd"
        format="MM-yyyy-dd"
        max={format(new Date(), 'MM-yyyy-dd')}
        min={format(new Date(), 'MM-yyyy-dd')}
        name="field_name"
        onChange={handleOnChange}
        ref={ref}
        required
        value={value}
      />
    </PropsTable>
  );
};

export default ValidationExample;
