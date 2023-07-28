import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import faIR from 'date-fns/locale/fa-IR';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  userEvent,
  within,
} from '../../test/test-utils.mjs';
import LocaleExample from './Locale.example.mjs';
import LocaleExampleRaw from './Locale.example.mjs?raw';

export default {
  title: 'Props/locale',
  component: DateInputWithArgs,
};

export const Example = {
  render: LocaleExample,
};

export const Implementation = {
  args: {
    code: LocaleExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const Text = {
  args: {
    ...defaultArgs,
    locale: faIR,
    value: '2000-10-25',
  },
  play: async ({ canvasElement, step }) => {
    const icon = within(canvasElement).getByTestId('field_name-Icon');

    await step(
      'The calendar tabs are shown in the correct language',
      async () => {
        await userEvent.click(icon);

        expect(
          within(canvasElement).getByTestId('field_name-Tab-Day'),
        ).toHaveTextContent('روز');
        expect(
          within(canvasElement).getByTestId('field_name-Tab-Month'),
        ).toHaveTextContent('ماه');
        expect(
          within(canvasElement).getByTestId('field_name-Tab-Year'),
        ).toHaveTextContent('سال');
      },
    );

    await step('In "Day" view', async () => {
      await userEvent.click(
        within(canvasElement).getByTestId('field_name-Tab-Day'),
      );

      await step(
        'The next/previous button text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-ButtonNext',
            ),
          ).toHaveTextContent('View روز options in آذر');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-ButtonPrevious',
            ),
          ).toHaveTextContent('View روز options in مهر');
        },
      );

      await step(
        'The date range text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Day-Range'),
          ).toHaveTextContent('آبان');
        },
      );

      await step(
        'The day options text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-01',
            ),
          ).toHaveTextContent('۱');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-02',
            ),
          ).toHaveTextContent('۲');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-03',
            ),
          ).toHaveTextContent('۳');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-04',
            ),
          ).toHaveTextContent('۴');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-05',
            ),
          ).toHaveTextContent('۵');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-06',
            ),
          ).toHaveTextContent('۶');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-07',
            ),
          ).toHaveTextContent('۷');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-08',
            ),
          ).toHaveTextContent('۸');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-09',
            ),
          ).toHaveTextContent('۹');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-10',
            ),
          ).toHaveTextContent('۱۰');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-11',
            ),
          ).toHaveTextContent('۱۱');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-12',
            ),
          ).toHaveTextContent('۱۲');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-13',
            ),
          ).toHaveTextContent('۱۳');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-14',
            ),
          ).toHaveTextContent('۱۴');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-15',
            ),
          ).toHaveTextContent('۱۵');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-16',
            ),
          ).toHaveTextContent('۱۶');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-17',
            ),
          ).toHaveTextContent('۱۷');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-18',
            ),
          ).toHaveTextContent('۱۸');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-19',
            ),
          ).toHaveTextContent('۱۹');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-20',
            ),
          ).toHaveTextContent('۲۰');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-21',
            ),
          ).toHaveTextContent('۲۱');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-22',
            ),
          ).toHaveTextContent('۲۲');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-23',
            ),
          ).toHaveTextContent('۲۳');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-24',
            ),
          ).toHaveTextContent('۲۴');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-25',
            ),
          ).toHaveTextContent('۲۵');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-26',
            ),
          ).toHaveTextContent('۲۶');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-27',
            ),
          ).toHaveTextContent('۲۷');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-28',
            ),
          ).toHaveTextContent('۲۸');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-29',
            ),
          ).toHaveTextContent('۲۹');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-30',
            ),
          ).toHaveTextContent('۳۰');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-2000-10-31',
            ),
          ).toHaveTextContent('۳۱');
        },
      );

      await step(
        'The date range year text is shown in the correct language',
        async () => {
          const button = within(canvasElement).getByTestId(
            'field_name-DateRangeYear',
          );
          expect(button).toHaveTextContent('۲۰۰۰');
          expect(button).toHaveAttribute('aria-label', 'Change سال');
        },
      );

      await step(
        'The weekdays text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-1',
            ),
          ).toHaveTextContent('دوشنبه');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-2',
            ),
          ).toHaveTextContent('سه‌شنبه');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-3',
            ),
          ).toHaveTextContent('چهارشنبه');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-4',
            ),
          ).toHaveTextContent('پنجشنبه');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-5',
            ),
          ).toHaveTextContent('جمعه');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-6',
            ),
          ).toHaveTextContent('شنبه');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Day-WeekDay-7',
            ),
          ).toHaveTextContent('یکشنبه');
        },
      );
    });

    await step('In "Month" view', async () => {
      await userEvent.click(
        within(canvasElement).getByTestId('field_name-Tab-Month'),
      );

      await step(
        'The next/previous button text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Month-ButtonNext',
            ),
          ).toHaveTextContent('View ماه options in ۲۰۰۱');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Month-ButtonPrevious',
            ),
          ).toHaveTextContent('View ماه options in ۱۹۹۹');
        },
      );

      await step(
        'The date range text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Month-Range',
            ),
          ).toHaveTextContent('۲۰۰۰');
        },
      );

      await step(
        'The month options text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-01'),
          ).toHaveTextContent('دی');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-02'),
          ).toHaveTextContent('بهمن');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-03'),
          ).toHaveTextContent('اسفند');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-04'),
          ).toHaveTextContent('فروردین');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-05'),
          ).toHaveTextContent('اردیبهشت');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-06'),
          ).toHaveTextContent('خرداد');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-07'),
          ).toHaveTextContent('تیر');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-08'),
          ).toHaveTextContent('مرداد');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-09'),
          ).toHaveTextContent('شهریور');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-10'),
          ).toHaveTextContent('مهر');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-11'),
          ).toHaveTextContent('آبان');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Month-12'),
          ).toHaveTextContent('آذر');
        },
      );
    });

    await step('In "Year" view', async () => {
      await userEvent.click(
        within(canvasElement).getByTestId('field_name-Tab-Year'),
      );

      await step(
        'The next/previous button text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Year-ButtonNext',
            ),
          ).toHaveTextContent('View سال options in ۲۰۱۰ - ۲۰۲۹');
          expect(
            within(canvasElement).getByTestId(
              'field_name-Calendar-Year-ButtonPrevious',
            ),
          ).toHaveTextContent('View سال options in ۱۹۷۰ - ۱۹۸۹');
        },
      );

      await step(
        'The date range text is shown in the correct language',
        async () => {
          await userEvent.click(
            within(canvasElement).getByTestId('field_name-Tab-Year'),
          );
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-Range'),
          ).toHaveTextContent('۱۹۹۰ - ۲۰۰۹');
        },
      );

      await step(
        'The year options text is shown in the correct language',
        async () => {
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1990'),
          ).toHaveTextContent('۱۹۹۰');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1991'),
          ).toHaveTextContent('۱۹۹۱');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1992'),
          ).toHaveTextContent('۱۹۹۲');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1993'),
          ).toHaveTextContent('۱۹۹۳');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1994'),
          ).toHaveTextContent('۱۹۹۴');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1995'),
          ).toHaveTextContent('۱۹۹۵');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1996'),
          ).toHaveTextContent('۱۹۹۶');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1997'),
          ).toHaveTextContent('۱۹۹۷');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1998'),
          ).toHaveTextContent('۱۹۹۸');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-1999'),
          ).toHaveTextContent('۱۹۹۹');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2000'),
          ).toHaveTextContent('۲۰۰۰');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2001'),
          ).toHaveTextContent('۲۰۰۱');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2002'),
          ).toHaveTextContent('۲۰۰۲');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2003'),
          ).toHaveTextContent('۲۰۰۳');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2004'),
          ).toHaveTextContent('۲۰۰۴');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2005'),
          ).toHaveTextContent('۲۰۰۵');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2006'),
          ).toHaveTextContent('۲۰۰۶');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2007'),
          ).toHaveTextContent('۲۰۰۷');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2008'),
          ).toHaveTextContent('۲۰۰۸');
          expect(
            within(canvasElement).getByTestId('field_name-Calendar-Year-2009'),
          ).toHaveTextContent('۲۰۰۹');
        },
      );
    });
  },
};
