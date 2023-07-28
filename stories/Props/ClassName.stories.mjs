import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import Calendar from '../../src/Calendar.mjs';
import CalendarArrow from '../../src/CalendarArrow.mjs';
import CalendarTabs from '../../src/CalendarTabs.mjs';
import Field from '../../src/Field.mjs';
import View from '../../src/View.mjs';
import ViewBody from '../../src/ViewBody.mjs';
import ViewHead from '../../src/ViewHead.mjs';
import ViewWeekDays from '../../src/ViewWeekDays.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  userEvent,
  within,
} from '../../test/test-utils.mjs';
import ClassNameExample from './ClassName.example.mjs';
import ClassNameExampleRaw from './ClassName.example.mjs?raw';

export default {
  title: 'Props/className',
  component: DateInputWithArgs,
};

export const Example = {
  render: ClassNameExample,
};

export const Implementation = {
  args: {
    code: ClassNameExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const OuterDiv = {
  args: {
    ...defaultArgs,
    className: 'firstClass',
  },
  play: async ({ canvasElement, step }) => {
    await step('Outer div receives className', async () => {
      expect(
        within(canvasElement)
          .getByTestId('field_name-DateInput')
          .classList.contains('firstClass'),
      ).toBe(true);
    });
  },
};

export const Children = {
  args: {
    ...defaultArgs,
    children: (
      <React.Fragment>
        <Field className="test" />
        <Calendar className="test">
          <CalendarArrow className="test" />
          <CalendarTabs className="test" />
          <View className="test">
            <ViewHead className="test" />
            <ViewBody className="test">
              <ViewWeekDays className="test" />
            </ViewBody>
          </View>
        </Calendar>
      </React.Fragment>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step('Each child can receive a className', async () => {
      await step('Field', async () => {
        expect(
          within(canvasElement)
            .getByTestId('field_name')
            .classList.contains('test'),
        ).toBe(true);
      });

      await step('Calendar', async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon'),
        );
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar')
            .classList.contains('test'),
        ).toBe(true);
      });

      await step('CalendarArrow', async () => {
        expect(
          within(canvasElement)
            .getByTestId('field_name-CalendarArrow')
            .classList.contains('test'),
        ).toBe(true);
      });

      await step('CalendarTabs', async () => {
        expect(
          within(canvasElement)
            .getByTestId('field_name-CalendarTabs')
            .classList.contains('test'),
        ).toBe(true);
      });

      await step('ViewHead', async () => {
        expect(
          within(canvasElement)
            .getByTestId('field_name-ViewHead')
            .classList.contains('test'),
        ).toBe(true);
      });

      await step('ViewBody', async () => {
        expect(
          within(canvasElement)
            .getByTestId('field_name-ViewBody')
            .classList.contains('test'),
        ).toBe(true);
      });

      await step('ViewWeekDays', async () => {
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-1')
            .classList.contains('test'),
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-2')
            .classList.contains('test'),
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-3')
            .classList.contains('test'),
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-4')
            .classList.contains('test'),
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-5')
            .classList.contains('test'),
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-6')
            .classList.contains('test'),
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-WeekDay-7')
            .classList.contains('test'),
        ).toBe(true);
      });
    });
  },
};
