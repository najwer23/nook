import { ChartLine } from '@app/charts/ChartLine';
import { ChartMixed } from '@app/charts/ChartMixed';
import { useDocumentTitle } from '@app/hooks/useDocumentTitle';
import { useImmediateThrottledQuery } from '@app/hooks/useImmediateThrottledQuery';
import { Grid } from 'najwer23morsels/lib/Grid';
import { useWindowSize } from 'najwer23morsels/lib/Hooks';
import { LoaderDots } from 'najwer23morsels/lib/LoaderDots';
import { Select } from 'najwer23morsels/lib/Select';
import { SliderScroll } from 'najwer23morsels/lib/SliderScroll';
import { Typography } from 'najwer23morsels/lib/Typography';
import { useMemo, useState } from 'react';
import { chartDataPressure } from './chartData/chartDataPressure';
import { chartDataRainfall } from './chartData/chartDataRainfall';
import { chartDataTemp } from './chartData/chartDataTemp';
import { chartDataWind } from './chartData/chartDataWind';
import styles from './Weather.module.css';
import { queryWeatherCoords } from './Weather.query';
import { forecastDataFormat, formatDateFromDt, sortArrOfObjByLabel } from './Weather.utils';
import { WeatherForecastData } from './WeatherForecastData';
import { WeatherImg } from './WeatherImg';

export const Weather: React.FC = () => {
  useDocumentTitle(`Weather | ${import.meta.env.VITE_ANALYTICS_APP_NAME}`);
  const { width } = useWindowSize();

  const [coords, setCoords] = useState<{ value: string; label: string }>({
    value: '51.1:17.0333',
    label: 'Wrocław (PL)',
  });
  const lat = coords.value.split(':')[0];
  const lon = coords.value.split(':')[1];

  const { result, isLoading } = useImmediateThrottledQuery(
    {
      queryKey: ['queryWeatherCoords', 'queryWeatherCoords' + coords.value],
      queryFn: () => queryWeatherCoords(lat, lon),
      staleTime: 30 * 1000 * 60,
      gcTime: 30 * 1000 * 60,
      retry: 0,
      enabled: true,
    },
    500,
  );

  const townListForSelect = useMemo(() => {
    return sortArrOfObjByLabel([
      { value: '51.1:17.0333', label: 'Wrocław (PL)' },
      { value: '52.237049:21.017532', label: 'Warszawa (PL)' },
      { value: '50.270908:19.039993', label: 'Katowice (PL)' },
      { value: '51.1445731:16.2410821', label: 'Legnickie Pole (PL)' },
      { value: '41.3828939:2.1774322', label: 'Barcelona (ES)' },
      { value: '64.145981:-21.9422367', label: 'Reykjavík (IS)' },
      { value: '52.4006632:16.91973259', label: 'Poznań (PL)' },
      { value: '50.06143:19.93658', label: 'Kraków (PL)' },
    ]);
  }, []);

  const weather8Days = result?.resOpenWeatherMap?.daily ?? [];
  const weatherHourly = result?.resOpenWeatherMap?.hourly ?? [];
  const weatherCurrent = result?.resOpenWeatherMap?.current;

  const isNotReady = isLoading || !weatherCurrent?.weather || !weather8Days.length;

  return (
    <Grid layout="container" widthMax={'100%'}>
      <Grid layout="container" widthMax={'100%'} margin={'0 0 30px 0'}>
        <Typography appearance="light" variant="display" style={{ margin: 0 }}>
          Weather
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
        <Grid layout="container" widthMax={'100%'} margin={'0 0 30px'}>
          <Select
            label="Town"
            name={'town'}
            options={townListForSelect}
            initialValue={{ value: coords.value, label: coords.label }}
            onBlur={(_, data) => setCoords({ value: data.value, label: data.label })}
          />
        </Grid>
      </Grid>

      {isNotReady && <LoaderDots />}

      {!isNotReady && weatherCurrent?.weather && (
        <>
          <Grid layout="container" widthMax={'100%'} padding={width <= 767.98 ? 0 : '0 0px'} minHeight="415px">
            <div className={styles.weatherWrapper}>
              <SliderScroll gap="10px">
                <div
                  style={{
                    background: 'darkgrey',
                    margin: width <= 767.98 ? '0 0 0 0px' : 0,
                  }}
                  className={styles.weatherTiles}
                >
                  <WeatherImg imgArr={weatherCurrent.weather} />
                  <WeatherForecastData title={'dayOfWeek'} value={weatherCurrent.dt} />
                  <WeatherForecastData title={'Temp'} value={forecastDataFormat(weatherCurrent.temp, 4)} />
                  <WeatherForecastData
                    title={'Sunrise'}
                    value={formatDateFromDt(weatherCurrent.sunrise)?.split(',')[1] ?? ''}
                  />
                  <WeatherForecastData
                    title={'Sunset'}
                    value={formatDateFromDt(weatherCurrent.sunset)?.split(',')[1] ?? ''}
                  />
                  <WeatherForecastData title={'Wind'} value={forecastDataFormat(weatherCurrent.wind_speed, 1)} />
                  <WeatherForecastData title={'Pressure'} value={forecastDataFormat(weatherCurrent.pressure, 3)} />
                  <WeatherForecastData title={'Humidity'} value={forecastDataFormat(weatherCurrent.humidity, 2)} />
                  <WeatherForecastData title={'Clouds'} value={forecastDataFormat(weatherCurrent.clouds, 2)} />
                </div>

                {weather8Days
                  .filter((_: unknown, i: number) => i !== 0)
                  .map((x: any, i: number, arr: any) => (
                    <div
                      style={{
                        background: '#cfcfcf',
                        margin: i === arr.length - 1 && width <= 767.98 ? '0 0px 0 0' : 0,
                      }}
                      key={x.dt}
                      className={styles.weatherTiles}
                    >
                      <WeatherImg imgArr={x.weather} />
                      <WeatherForecastData title={'dayOfWeek'} value={x.dt} />
                      <WeatherForecastData title={'Temp'} value={forecastDataFormat(x.temp.day, 4)} />
                      <WeatherForecastData title={'Sunrise'} value={formatDateFromDt(x.sunrise)?.split(',')[1] ?? ''} />
                      <WeatherForecastData title={'Sunset'} value={formatDateFromDt(x.sunset)?.split(',')[1] ?? ''} />
                      <WeatherForecastData title={'Wind'} value={forecastDataFormat(x.wind_speed, 1)} />
                      <WeatherForecastData title={'Pressure'} value={forecastDataFormat(x.pressure, 3)} />
                      <WeatherForecastData title={'Humidity'} value={forecastDataFormat(x.humidity, 2)} />
                      <WeatherForecastData title={'Clouds'} value={forecastDataFormat(x.clouds, 2)} />
                    </div>
                  ))}
              </SliderScroll>
            </div>
          </Grid>

          <Grid layout="container" widthMax={'100%'} padding={'0 0px'} margin={'30px auto 30px auto'} minHeight="700px">
            <ChartLine
              title="Temeperature for next 48h"
              data={chartDataTemp(weatherHourly, weather8Days[0]?.sunrise, weather8Days[0]?.sunset)}
              ySymbol={` ${'\u00b0'}C`}
            />
          </Grid>

          <Grid layout="container" widthMax={'100%'} padding={'0 0px'} margin={'0px auto 30px auto'} minHeight="700px">
            <ChartLine
              title="Speed of wind for next 48h"
              data={chartDataWind(weatherHourly, weather8Days[0]?.sunrise, weather8Days[0]?.sunset)}
              ySymbol={` km/h`}
            />
          </Grid>

          <Grid layout="container" widthMax={'100%'} padding={'0 0px'} margin={'0px auto 30px auto'} minHeight="700px">
            <ChartMixed
              title="Rain / Snow for next 48h"
              data={chartDataRainfall(weatherHourly, weather8Days[0]?.sunrise, weather8Days[0]?.sunset)}
              ySymbol={` mm/h`}
            />
          </Grid>

          <Grid layout="container" widthMax={'100%'} padding={'0 0px'} margin={'0px auto 30px auto'} minHeight="700px">
            <ChartLine
              title="Pressure"
              data={chartDataPressure(weatherHourly, weather8Days[0]?.sunrise, weather8Days[0]?.sunset)}
              ySymbol={` hPa`}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};
