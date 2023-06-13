import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import faIR from 'date-fns/locale/fa-IR';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

const LocaleExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable
      props={{
        locale: {
          type: 'object',
          value: 'faIR',
        },
      }}
    >
      <DateInput
        locale={faIR}
        name="field_name"
        onChange={handleOnChange}
        value={value}
      />
    </PropsTable>
  );
};

export default LocaleExample;
