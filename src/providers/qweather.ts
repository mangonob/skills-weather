/**
 * @description 和风天气获取
 */

import { importPKCS8, SignJWT } from "jose";
import { Configuration, type WeatherArgs } from "../types";
import { ensure } from "../utils";
import { APIProvider, IQweatherAPI, QweatherAPI, usedAPI } from "./api";
import { CityLookupData, NowWeatherData } from "./models";
import { formatWeatherNow } from "./fromatters";

export default async function qweather(
	args: WeatherArgs,
	config: Configuration,
) {
	const { apiHost, appId, privateKey, credentialId } = config;

	ensure(apiHost, "[config] API Host is required");
	ensure(appId, "[config] App ID is required");
	ensure(privateKey, "[config] Private Key is required");
	ensure(credentialId, "[config] Credential ID is required");

	if (apiHost && appId && privateKey && credentialId) {
		const header = {
			alg: "EdDSA",
			kid: credentialId,
		};
		const now = Math.floor(Date.now() / 1000);
		const payload = {
			sub: appId,
			iat: now,
			exp: now + 3000,
		};

		const pk = await importPKCS8(privateKey, "EdDSA");
		const sign = await new SignJWT(payload).setProtectedHeader(header).sign(pk);

		const requestHeaders = { Authorization: `Bearer ${sign}` };
		const api = QweatherAPI(apiHost, requestHeaders);

		if ("location" in args) {
			const response = await api.get("CITY_LOOKUP", {
				location: args.location,
			});

			if (response.status !== 200) {
				throw `[qweather] API request failed with status ${await response.text()}`;
			}

			const data: CityLookupData = await response.json();
			const location = data.location[0];

			if (!location) {
				throw "[qweather] Location not found";
			} else {
				return fetchWeather(api, {
					locationID: location.id,
					days: args.days,
					hours: args.hours,
				});
			}
		} else {
			return fetchWeather(api, {
				latitude: args.latitude,
				longitude: args.longitude,
				days: args.days,
				hours: args.hours,
			});
		}
	}
}

type FetchWeatherOptions = (
	| { locationID: string }
	| {
			latitude: string;
			longitude: string;
	  }
) & {
	days?: number;
	hours?: number;
};

function getNeedDays(day: number): number {
	if (day <= 3) {
		return 3;
	} else if (day <= 7) {
		return 7;
	} else if (day <= 10) {
		return 10;
	} else if (day <= 15) {
		return 15;
	} else {
		return 30;
	}
}

function getNeedHours(hour: number): number {
	if (hour <= 24) {
		return 24;
	} else if (hour <= 72) {
		return 72;
	} else {
		return 168;
	}
}

async function fetchWeather(
	api: IQweatherAPI,
	options: FetchWeatherOptions,
): Promise<unknown> {
	let apiProvider: APIProvider;

	if (options.days && options.days > 0) {
		apiProvider = {
			api: "WEATHER_DAYS",
			lookup: { days: getNeedDays(options.days) + "d" },
		};
	} else if (options.hours && options.hours > 0) {
		apiProvider = {
			api: "WEATHER_HOURS",
			lookup: { hours: getNeedHours(options.hours) + "h" },
		};
	} else {
		apiProvider = "WEATHER_NOW";
	}

	let location: string;

	if ("locationID" in options) {
		location = options.locationID;
	} else {
		location = `${options.latitude},${options.longitude}`;
	}

	const response = await api.get(apiProvider, { location });
	if (response.status !== 200) {
		throw `[qweather] API request failed with status ${response.status}`;
	} else {
		const data: NowWeatherData = await response.json();
		switch (usedAPI(apiProvider)) {
			case "WEATHER_NOW":
				return formatWeatherNow(data.now);
			case "WEATHER_DAYS":
				return data;
			case "WEATHER_HOURS":
				return data;
			default:
				return {};
		}
	}
}
