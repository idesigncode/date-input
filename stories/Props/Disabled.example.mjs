import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

const DisabledExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput
        disabled
        name="field_name"
        onChange={handleOnChange}
        value={value}
      />
    </PropsTable>
  );
};

export default DisabledExample;
