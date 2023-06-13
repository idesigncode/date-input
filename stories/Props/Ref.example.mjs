import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import DateInput from '../../src/DateInput.mjs';
import '../../theme.css';
import '../../layout.css';

const RefExample = () => {
  const [value, setValue] = React.useState('');
  const ref = React.useRef();

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
    if (ref && ref.current) {
      console.log(ref.current);
    }
  };

  return (
    <PropsTable>
      <DateInput
        name="field_name"
        onChange={handleOnChange}
        ref={ref}
        value={value}
      />
    </PropsTable>
  );
};

export default RefExample;
