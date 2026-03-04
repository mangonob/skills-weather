import { type WeatherData } from "../models";
import { parseNumber } from "../utils";
import { type WeatherNow } from "./models";

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

export function formatWeatherDays(): unknown {
	return 0;
}
