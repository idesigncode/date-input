import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

export const CustomInput = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      style={{
        color: 'deepskyblue',
      }}
    />
  );
});

CustomInput.displayName = 'CustomInput';

const AsComponentExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput
        as={CustomInput}
        name="field_name"
        onChange={handleOnChange}
        value={value}
      />
    </PropsTable>
  );
};

export default AsComponentExample;
