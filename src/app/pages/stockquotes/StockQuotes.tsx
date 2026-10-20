import { ChartLine } from '@app/charts/ChartLine';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQueries } from '@app/hooks/useImmediateThrottledQueries';
import { Grid } from 'najwer23morsels/lib/Grid';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { TextBox } from 'najwer23morsels/lib/TextBox';
import { Typography } from 'najwer23morsels/lib/Typography';
import { chartDataCurrency } from './chartData/chartDataCurrency';
import { queryStockQuotes } from './StockQuotes.query';

const currencies = ['usd', 'eur', 'chf', 'gbp'];

export const StockQuotes = () => {
  useDocumentTitle(`Stock Quotes | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);

  const queriesStockQuotes = currencies.map((currency) => ({
    queryKey: ['queryStockQuotes', 'queryStockQuotes' + currency],
    queryFn: () => queryStockQuotes(currency),
    staleTime: 30 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 0,
    enabled: true,
  }));

  const { resultsArray: resultsArrayQueryStockQuotes, isLoading: isLoadingQueryStockQuotes } =
    useImmediateThrottledQueries(queriesStockQuotes, 500);

  return (
    <>
      <Grid layout="container" widthMax="100%" padding="0">
        <Grid layout="container" widthMax="900px" margin="0 0 30px 0">
          <Typography appearance="light" variant="display" style={{ margin: 0 }}>
            Stock Quotes
          </Typography>
        </Grid>

        <Grid widthMax="700px" layout="container" padding="0" margin="0 0 30px 0">
          <Typography appearance="light" variant="body">
            <TextBox tag="span" color="#FF0000" desktopSize="inherit" mobileSize="inherit" fontWeight="bold">
              Bid Price (3.9852)
            </TextBox>
            : If you want to sell the asset, you can sell it at this price.
          </Typography>

          <Typography appearance="light" variant="body">
            <TextBox tag="span" color="green" desktopSize="inherit" mobileSize="inherit" fontWeight="bold">
              Ask Price (4.0658)
            </TextBox>
            : If you want to buy the asset, you will have to pay this price.
          </Typography>
        </Grid>
      </Grid>

      {isLoadingQueryStockQuotes && <LoaderDots />}

      {!isLoadingQueryStockQuotes && (
        <Grid layout="container" widthMax="100%" margin="30px auto 0">
          {resultsArrayQueryStockQuotes.map((resultQueryStockQuotes) => (
            <Grid
              key={resultQueryStockQuotes.data?.code}
              layout="container"
              widthMax="100%"
              padding="0"
              margin="0 auto 30px"
              minHeight="700px"
            >
              <div style={{ height: '700px' }}>
                <ChartLine
                  title={`${resultQueryStockQuotes.data?.code ?? 'N/A'}/PLN`}
                  data={chartDataCurrency(resultQueryStockQuotes.data?.rates ?? [])}
                  ySymbol=" PLN"
                  yStepSize={0.001}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
