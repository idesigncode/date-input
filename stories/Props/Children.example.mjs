/* eslint-disable simple-import-sort/imports */
import React from 'react';
import PropsTable from '@idesigncode/storybook-tools/PropsTable.mjs';
import '../../theme.css';
import Calendar from '../../src/Calendar.mjs';
import '../../Calendar.css';
import CalendarArrow from '../../src/CalendarArrow.mjs';
import '../../CalendarArrow.css';
import DateInput from '../../src/DateInput.mjs';
import '../../DateInput.css';
import CalendarTabs from '../../src/CalendarTabs.mjs';
import '../../CalendarTabs.css';
import Field from '../../src/Field.mjs';
import '../../Field.css';
import View from '../../src/View.mjs';
import '../../View.css';
import ViewBody from '../../src/ViewBody.mjs';
import '../../ViewBody.css';
import ViewHead from '../../src/ViewHead.mjs';
import '../../ViewHead.css';
import ViewWeekDays from '../../src/ViewWeekDays.mjs';
import '../../ViewWeekDays.css';

const ChildrenExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
  };

  return (
    <PropsTable>
      <DateInput name="field_name" onChange={handleOnChange} value={value}>
        <Field />
        <Calendar>
          <CalendarArrow />
          <CalendarTabs />
          <View>
            <ViewHead />
            <ViewBody>
              <ViewWeekDays />
            </ViewBody>
          </View>
        </Calendar>
      </DateInput>
    </PropsTable>
  );
};

export default ChildrenExample;
