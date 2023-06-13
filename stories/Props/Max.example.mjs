import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import format from 'date-fns/format';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

const MaxExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput
        max={format(new Date(), 'yyyy-MM-dd')}
        name="field_name"
        onChange={handleOnChange}
        value={value}
      />
    </PropsTable>
  );
};

export default MaxExample;
