import { type WeatherData } from "../models";
import { parseNumber } from "../utils";
import type { WeatherDays, WeatherHours, WeatherNow } from "./models";

export function formatWeatherNow(now: WeatherNow): WeatherData {
	const {
		obsTime,
		temp,
		feelsLike,
		text,
		wind360,
		windDir,
		windScale,
		windSpeed,
		humidity,
		precip,
		pressure,
		vis,
		cloud,
	} = now;

	const [windScaleLow, _windScaleHigh] = windScale.split("-");
	const windScaleHigh = _windScaleHigh ?? windScaleLow;

	return {
		observationTime: obsTime,
		temperature: parseNumber(temp),
		feelsLike: parseNumber(feelsLike),
		description: text,
		windDirection: windDir,
		windDegree: parseNumber(wind360),
		windSpeed: parseNumber(windSpeed),
		windScaleHigh: parseNumber(windScaleHigh),
		windScaleLow: parseNumber(windScaleLow),
		humidity: parseNumber(humidity),
		precipitation: parseNumber(precip),
		pressure: parseNumber(pressure),
		visibility: parseNumber(vis),
		cloudCover: parseNumber(cloud),
	};
}

export function formatWeatherHours(hours: WeatherHours): WeatherData {
	const {
		fxTime,
		temp,
		text,
		wind360,
		windDir,
		windScale,
		windSpeed,
		humidity,
		pop,
		precip,
		cloud,
		pressure,
	} = hours;

	const [windScaleLow, _windScaleHigh] = windScale.split("-");
	const windScaleHigh = _windScaleHigh ?? windScaleLow;

	return {
		forecastTime: fxTime,
		temperature: parseNumber(temp),
		description: text,
		windDirection: windDir,
		windDegree: parseNumber(wind360),
		windSpeed: parseNumber(windSpeed),
		windScaleHigh: parseNumber(windScaleHigh),
		windScaleLow: parseNumber(windScaleLow),
		humidity: parseNumber(humidity),
		precipitationProbability: parseNumber(pop),
		precipitation: parseNumber(precip),
		pressure: parseNumber(pressure),
		cloudCover: parseNumber(cloud),
	};
}

export function formatWeatherDays(days: WeatherDays): WeatherData {
	const {
		fxDate,
		sunrise,
		sunset,
		moonrise,
		moonset,
		moonPhase,
		tempMax,
		tempMin,
		textDay,
		textNight,
		wind360Day,
		windDirDay,
		windScaleDay,
		windSpeedDay,
		wind360Night,
		windDirNight,
		windScaleNight,
		windSpeedNight,
		humidity,
		precip,
		pressure,
		vis,
		cloud,
		uvIndex,
	} = days;

	const [windScaleDayLow, _windScaleDayHigh] = windScaleDay.split("-");
	const windScaleDayHigh = _windScaleDayHigh ?? windScaleDayLow;
	const [windScaleNightLow, _windScaleNightHigh] = windScaleNight.split("-");
	const windScaleNightHigh = _windScaleNightHigh ?? windScaleNightLow;

	return {
		forecastTime: fxDate,
		sunriseTime: sunrise,
		sunsetTime: sunset,
		moonriseTime: moonrise,
		moonsetTime: moonset,
		moonPhase,
		temperatureHigh: parseNumber(tempMax),
		temperatureLow: parseNumber(tempMin),
		day: {
			description: textDay,
			windDegree: parseNumber(wind360Day),
			windDirection: windDirDay,
			windScaleLow: parseNumber(windScaleDayLow),
			windScaleHigh: parseNumber(windScaleDayHigh),
			windSpeed: parseNumber(windSpeedDay),
		},
		night: {
			description: textNight,
			windDegree: parseNumber(wind360Night),
			windDirection: windDirNight,
			windScaleLow: parseNumber(windScaleNightLow),
			windScaleHigh: parseNumber(windScaleNightHigh),
			windSpeed: parseNumber(windSpeedNight),
		},
		humidity: parseNumber(humidity),
		precipitation: parseNumber(precip),
		pressure: parseNumber(pressure),
		visibility: parseNumber(vis),
		cloudCover: parseNumber(cloud),
		uvIndex: parseNumber(uvIndex),
	};
}
