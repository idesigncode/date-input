import Source from '@idesigncode/storybook-tools/Source.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  userEvent,
  waitFor,
  within,
} from '../../test/test-utils.mjs';
import InitialViewExample from './InitialView.example.mjs';
import InitialViewExampleRaw from './InitialView.example.mjs?raw';

export default {
  title: 'Props/initialView',
  component: DateInputWithArgs,
};

export const Example = {
  render: InitialViewExample,
};

export const Implementation = {
  args: {
    code: InitialViewExampleRaw,
  },
  render: Source,
};

export const Month = {
  args: {
    ...defaultArgs,
    initialView: 'Month',
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Calendar opens to the given [initialView] if input has no value',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        expect(
          within(canvasElement).queryByTestId('field_name-Tab-Day')
        ).not.toHaveAttribute('aria-selected');
        expect(
          within(canvasElement).queryByTestId('field_name-Tab-Month')
        ).toHaveAttribute('aria-selected', 'true');
        expect(
          within(canvasElement).queryByTestId('field_name-Tab-Year')
        ).not.toHaveAttribute('aria-selected');
      }
    );

    await step('The "Day" calendar tab is not disabled', async () => {
      expect(
        within(canvasElement).queryByTestId('field_name-Tab-Day')
      ).not.toHaveAttribute('disabled');
    });

    await step('The "Month" calendar tab is disabled', async () => {
      expect(
        within(canvasElement).queryByTestId('field_name-Tab-Month')
      ).toHaveAttribute('disabled');
    });

    await step('The "Year" calendar tab is not disabled', async () => {
      expect(
        within(canvasElement).queryByTestId('field_name-Tab-Year')
      ).not.toHaveAttribute('disabled');
    });

    await step(
      'User can navigate to the "Year" view with the calendar tab after initial open',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        const tab = within(canvasElement).queryByTestId('field_name-Tab-Year');
        expect(tab).not.toHaveAttribute('aria-selected');
        await userEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      }
    );

    await step(
      'User can navigate to the "Day" view with the calendar tab after initial open',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        const tab = within(canvasElement).queryByTestId('field_name-Tab-Day');
        expect(tab).not.toHaveAttribute('aria-selected');
        await userEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      }
    );

    await step(
      'User can navigate to the "Year" view with the date range year',
      async () => {
        const tab = within(canvasElement).queryByTestId('field_name-Tab-Year');
        expect(tab).not.toHaveAttribute('aria-selected');
        await userEvent.click(
          within(canvasElement).queryByTestId('field_name-DateRangeYear')
        );
        expect(tab).toHaveAttribute('aria-selected', 'true');
      }
    );

    await step(
      'Calendar opens to the given [initialView] if selected view changed and input has no value',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year')
        );
        expect(
          within(canvasElement).getByTestId('field_name-Tab-Month')
        ).not.toHaveAttribute('aria-selected');
        expect(
          within(canvasElement).getByTestId('field_name-Tab-Year')
        ).toHaveAttribute('aria-selected', 'true');
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await waitFor(() =>
          expect(
            within(canvasElement).getByTestId('field_name-Tab-Month')
          ).toHaveAttribute('aria-selected', 'true')
        );
        await waitFor(() =>
          expect(
            within(canvasElement).getByTestId('field_name-Tab-Year')
          ).not.toHaveAttribute('aria-selected')
        );
      }
    );

    await step(
      'Calendar opens to the previously selected view if input has value',
      async () => {
        await userEvent.paste(
          within(canvasElement).getByTestId('field_name'),
          '2000-10-25'
        );
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Day')
        );
        expect(
          within(canvasElement).getByTestId('field_name-Tab-Day')
        ).toHaveAttribute('aria-selected', 'true');
        expect(
          within(canvasElement).getByTestId('field_name-Tab-Month')
        ).not.toHaveAttribute('aria-selected');
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await waitFor(() =>
          expect(
            within(canvasElement).getByTestId('field_name-Tab-Day')
          ).toHaveAttribute('aria-selected', 'true')
        );
        await waitFor(() =>
          expect(
            within(canvasElement).getByTestId('field_name-Tab-Month')
          ).not.toHaveAttribute('aria-selected')
        );
      }
    );

    await step(
      'Calendar opens to the given [initialView] if input cleared',
      async () => {
        await userEvent.clear(within(canvasElement).getByTestId('field_name'));
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        await waitFor(() =>
          expect(
            within(canvasElement).getByTestId('field_name-Tab-Day')
          ).not.toHaveAttribute('aria-selected')
        );
        await waitFor(() =>
          expect(
            within(canvasElement).getByTestId('field_name-Tab-Month')
          ).toHaveAttribute('aria-selected', 'true')
        );
      }
    );
  },
};
