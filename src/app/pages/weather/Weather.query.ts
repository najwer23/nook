import { apiOrigin } from '@app/api/apiOrigin';
import type { FetchClientBaseResponse } from '@app/fetchClient/fetchClient.types';
import { fetchClientConfig } from '@app/fetchClient/fetchClientConfig';
import { fetchClientExecute } from '@app/fetchClient/fetchClientExecute';
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

export interface QueryWeatherGetByCoordsResponse extends FetchClientBaseResponse {
  resOpenWeatherMap: OpenWeatherMapOneCall;
}

export const queryWeatherGetByCoords = (lat: string, lon: string): Promise<QueryWeatherGetByCoordsResponse> => {
  const endpointUrl = new URL(`${apiOrigin()}/openweathermap/forecast/onecall`);
  endpointUrl.searchParams.set('lat', lat);
  endpointUrl.searchParams.set('lon', lon);

  return fetchClientExecute<QueryWeatherGetByCoordsResponse>(endpointUrl, fetchClientConfig({ method: 'GET' }));
};
