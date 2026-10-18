import { configApiOrigin } from '@app/config/configApiOrigin';
import { configFetch, executeFetch, type ResponseBase } from '@app/config/configFetch';
import type { Forecast } from './chartData/chartData.types';

export interface ForecastCurrent extends Omit<Forecast, 'pop'> {
  sunrise: number;
  sunset: number;
}

export interface ForecastDaily extends Omit<Forecast, 'temp' | 'feels_like' | 'visibility' | 'rain' | 'snow'> {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  rain?: number;
  snow?: number;
}

export interface OpenWeatherMapOneCall {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: ForecastCurrent;
  hourly: Forecast[];
  daily: ForecastDaily[];
}

export interface WeatherCoordsResponse extends ResponseBase {
  resOpenWeatherMap: OpenWeatherMapOneCall;
}

export const queryWeatherCoords = (lat: string, lon: string): Promise<WeatherCoordsResponse> => {
  const endpointUrl = new URL(`${configApiOrigin()}/openweathermap/forecast/onecall`);
  endpointUrl.searchParams.set('lat', lat);
  endpointUrl.searchParams.set('lon', lon);

  return executeFetch<WeatherCoordsResponse>(endpointUrl, configFetch({ method: 'GET' }));
};
