import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

const RequiredExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput
        name="field_name"
        onChange={handleOnChange}
        required
        value={value}
      />
    </PropsTable>
  );
};

export default RequiredExample;
