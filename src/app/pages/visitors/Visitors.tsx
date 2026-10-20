import { ChartBar } from '@app/charts/ChartBar';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Select } from 'najwer23morsels/lib/Select';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useMemo, useState } from 'react';
import { chartDataVisitors } from './chartData/chartDataVisitors';
import { queryVisitorsHits } from './Visitors.query';
import { sortByDate, sumByDate, sumByYear } from './Visitors.utils';

const START_YEAR = 2026;

export const Visitors = () => {
  useDocumentTitle(`Visitors | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const currentYear = String(new Date().getFullYear());
  const [year, setYear] = useState(currentYear);

  const {
    result: resultQueryVisitorsHits,
    isLoading: isLoadingQueryVisitorsHits,
    isError: isErrorQueryVisitorsHits,
  } = useImmediateThrottledQuery(
    {
      queryKey: ['queryVisitorsHits', 'queryVisitorsHits' + year],
      queryFn: () => queryVisitorsHits(year),
      staleTime: 0,
      gcTime: 0,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const analytics = resultQueryVisitorsHits?.data?.items ?? [];

  const yearlyViews = useMemo(() => {
    return sumByYear(analytics);
  }, [analytics]);

  const pageViewsByDate = useMemo(() => {
    return sortByDate(sumByDate(analytics));
  }, [analytics]);

  const resumeViews = useMemo(() => {
    const resumeItems = analytics.filter((item) => item.path === '/resume');
    return sortByDate(sumByDate(resumeItems));
  }, [analytics]);

  const blogViews = useMemo(() => {
    const blogItems = analytics.filter((item) => item.path.startsWith('/blog'));
    return sortByDate(sumByDate(blogItems));
  }, [analytics]);

  const maxViewDay = useMemo(() => {
    return pageViewsByDate.reduce(
      (max, current) => (current[1] > max[1] ? current : max),
      pageViewsByDate[0] ?? ['-', 0],
    );
  }, [pageViewsByDate]);

  const minViewDay = useMemo(() => {
    return pageViewsByDate.reduce(
      (min, current) => (current[1] < min[1] ? current : min),
      pageViewsByDate[0] ?? ['-', 0],
    );
  }, [pageViewsByDate]);

  const current = pageViewsByDate.at(-1)?.[1] ?? 0;
  const previous = pageViewsByDate.at(-2)?.[1] ?? 0;
  const diff = current - previous;
  const percent = previous === 0 ? 0 : ((current - previous) / previous) * 100;

  const [maxDate, maxViews] = maxViewDay;
  const [minDate, minViews] = minViewDay;

  return (
    <Grid layout="container" widthMax="100%">
      <Grid layout="container" widthMax="100%" margin="0 0 30px 0">
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Visitors
        </Typography>

        <Typography appearance="light" variant="caption">
          najwer23.github.io
        </Typography>
      </Grid>

      <Grid
        layout="columns"
        gap={{ col: '100px', row: '20px' }}
        col={{
          smallDesktop: 2,
          desktop: 2,
          mobile: 1,
          tablet: 2,
        }}
      >
        <Grid layout="container" widthMax="100%" margin="0 0 30px">
          <Select
            label="Year"
            name="year"
            options={Array.from({ length: Math.max(0, Number(currentYear) - START_YEAR + 1) }, (_, i) => {
              const y = START_YEAR + i;
              return { value: y.toString(), label: y.toString() };
            })}
            initialValue={{ value: year, label: year }}
            onBlur={(_, data) => setYear(data.value)}
          />
        </Grid>
      </Grid>

      {isLoadingQueryVisitorsHits && <LoaderDots />}

      {!isLoadingQueryVisitorsHits && isErrorQueryVisitorsHits && (
        <TextBox tag="p" desktopSize={16} mobileSize={16} fontWeight={500}>
          No results
        </TextBox>
      )}

      {!isLoadingQueryVisitorsHits && !isErrorQueryVisitorsHits && (
        <>
          <Grid margin="0 0 30px" layout="container" widthMax="100%">
            <div>
              <TextBox tag="p" desktopSize={22} mobileSize={18} fontWeight={200}>
                Yearly Visits:{' '}
                <TextBox tag="span" desktopSize={18} mobileSize={16} fontWeight={600}>
                  {yearlyViews[year] ?? 0}
                </TextBox>
              </TextBox>
            </div>

            <div>
              <TextBox tag="p" desktopSize={22} mobileSize={18} fontWeight={200}>
                Daily Change:{' '}
                <TextBox tag="span" desktopSize={18} mobileSize={16} fontWeight={600}>
                  {diff},&nbsp;
                  <TextBox
                    tag="span"
                    desktopSize={18}
                    mobileSize={16}
                    fontWeight={400}
                    color={diff >= 0 ? 'green' : 'red'}
                  >
                    ({percent.toFixed(2)}&nbsp;%)
                  </TextBox>
                </TextBox>
              </TextBox>
            </div>

            <div>
              <TextBox tag="p" desktopSize={22} mobileSize={18} fontWeight={200}>
                Max daily views:{' '}
                <TextBox tag="span" desktopSize={18} mobileSize={16} fontWeight={600}>
                  <b>{maxViews}</b>, ({maxDate})
                </TextBox>
              </TextBox>
            </div>

            <div>
              <TextBox tag="p" desktopSize={22} mobileSize={18} fontWeight={200}>
                Min daily views:{' '}
                <TextBox tag="span" desktopSize={18} mobileSize={16} fontWeight={600}>
                  <b>{minViews}</b>, ({minDate})
                </TextBox>
              </TextBox>
            </div>
          </Grid>

          <Grid layout="container" widthMax="100%" margin="0px auto 30px auto" minHeight="700px">
            <ChartBar title="Daily Visitors Over Time" ySymbol="" data={chartDataVisitors(pageViewsByDate)} />
          </Grid>

          <Grid layout="container" widthMax="100%" margin="0px auto 30px auto" minHeight="700px">
            <ChartBar title="Daily Visitors for /resume" ySymbol="" data={chartDataVisitors(resumeViews)} />
          </Grid>

          <Grid layout="container" widthMax="100%" margin="0px auto 30px auto" minHeight="700px">
            <div style={{ height: '700px' }}>
              <ChartBar title="Daily Visitors for /blog" ySymbol="" data={chartDataVisitors(blogViews)} />
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};
