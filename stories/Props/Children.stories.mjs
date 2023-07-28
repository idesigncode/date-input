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
import ChildrenExample from './Children.example.mjs';
import ChildrenExampleRaw from './Children.example.mjs?raw';

export default {
  title: 'Props/children',
  component: DateInputWithArgs,
};

export const Example = {
  render: ChildrenExample,
};

export const Implementation = {
  args: {
    code: ChildrenExampleRaw.replace(/^\/\* eslint-disable.*\n/, ''),
  },
  render: (args) => <Source {...args} />,
};

export const AllChildren = {
  args: {
    ...defaultArgs,
    children: (
      <React.Fragment>
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
      </React.Fragment>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step('Renders DOM elements correctly', async () => {
      await step('Input', async () => {
        expect(
          within(canvasElement).queryByTestId('field_name')
        ).not.toBeNull();
      });

      await step('Icon button', async () => {
        expect(
          within(canvasElement).queryByTestId('field_name-OpenCalendarButton')
        ).not.toBeNull();
      });

      await step('Calendar', async () => {
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar')
        ).toBeNull();

        await step('Is rendered as [open] if the icon is clicked', async () => {
          await userEvent.click(
            within(canvasElement).getByTestId('field_name-Icon')
          );
          expect(
            within(canvasElement).getByTestId('field_name-Calendar')
          ).not.toBeNull();
        });

        await step(
          'Is not rendered as [open] if the user clicks outside of the <Calendar />',
          async () => {
            expect(
              within(canvasElement).getByTestId('field_name-Calendar')
            ).not.toBeNull();
            await userEvent.click(document.body);
            expect(
              within(canvasElement).queryByTestId('field_name-Calendar')
            ).toBeNull();
          }
        );

        await step(
          'Is not rendered as [open] if the user presses the "escape" key',
          async () => {
            await userEvent.click(
              within(canvasElement).getByTestId('field_name-Icon')
            );
            expect(
              within(canvasElement).queryByTestId('field_name-Calendar')
            ).not.toBeNull();
            await userEvent.keyboard('{Escape}');
            expect(
              within(canvasElement).queryByTestId('field_name-Calendar')
            ).toBeNull();
            expect(
              within(canvasElement).getByTestId('field_name-OpenCalendarButton')
            ).toHaveFocus();
          }
        );
      });
    });
  },
};

export const SingleChild = {
  args: {
    ...defaultArgs,
    children: <div data-testid="child" />,
  },
  play: async ({ canvasElement, step }) => {
    await step('Renders DOM elements correctly', async () => {
      await step('Input', async () => {
        expect(within(canvasElement).queryByTestId('field_name')).toBeNull();
      });

      await step('Icon button', async () => {
        expect(
          within(canvasElement).queryByTestId('field_name-OpenCalendarButton')
        ).toBeNull();
      });

      await step('Calendar', async () => {
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar')
        ).toBeNull();
      });

      await step('Child element', async () => {
        expect(within(canvasElement).getByTestId('child')).not.toBeNull();
      });
    });
  },
};
