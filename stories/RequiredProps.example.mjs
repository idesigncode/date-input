import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../src/DateInput.mjs';
import '../theme.css';
import '../layout.css';

const RequiredPropsExample = () => {
  const [value, setValue] = React.useState('2000-12-31');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput name="field_name" onChange={handleOnChange} value={value} />
    </PropsTable>
  );
};

export default RequiredPropsExample;
