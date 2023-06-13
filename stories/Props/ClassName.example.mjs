import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../../src/DateInput.mjs';
import Field from '../../src/Field.mjs';
import '../../DateInput.css';
import '../../Field.css';

const ClassNameExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput
        className="firstClass"
        name="field_name"
        onChange={handleOnChange}
        value={value}
      >
        <Field className="secondClass" />
      </DateInput>
    </PropsTable>
  );
};

export default ClassNameExample;
