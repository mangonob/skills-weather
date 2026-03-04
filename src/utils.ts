import { exit } from "node:process";
import type { CLIOptions, WeatherArgs, Configuration } from "./types";
import { existsSync, readFileSync } from "node:fs";

export function error(message: string, code: number = 1): never {
	console.error(message);
	exit(code);
}

export function success(json: unknown): never {
	console.log(JSON.stringify(json, null, 2));
	exit(0);
}

export function loadConfig(configURL?: string): Configuration {
	const url =
		configURL ??
		process.env.SKILLS_WEATHER_CONFIG_FILE_PATH ??
		"skills-weather-config.json";

	if (!existsSync(url)) {
		throw new Error(`Config file not found at path: ${url}`);
	} else {
		return JSON.parse(readFileSync(url, "utf-8"));
	}
}

export function ensure(pred: unknown, msg: string) {
	if (!pred) {
		throw new Error(msg);
	}
}

export function renderTemplateString(
	template: string,
	lookup: Record<string, string>,
) {
	let renderString = template;
	Object.entries(lookup).forEach(([key, value]) => {
		renderString = renderString.replace(`{${key}}`, value);
	});
	return renderString;
}

export function optionsToWeatherArgs(options: CLIOptions): WeatherArgs {
	const { coordinates, location, hours, days } = options;

	if (!coordinates && !location) {
		error("Please provide either a location or coordinates.");
	}

	if (coordinates) {
		const [latitude, longitude] = coordinates.split(",");
		if (!latitude || !longitude) {
			error(
				"Invalid location format. Please provide latitude and longitude separated by a comma.",
			);
		}
		return {
			latitude: latitude.trim(),
			longitude: longitude.trim(),
			days: Number(days),
			hours: Number(hours),
		};
	} else if (location) {
		return {
			location: location.trim(),
			days: Number(days),
			hours: Number(hours),
		};
	} else {
		error("Please provide either a location or coordinates.");
	}
}

export function parseNumber(raw: unknown): number | null {
	if (typeof raw === "number") {
		return raw;
	} else if (typeof raw === "string") {
		const parsed = Number(raw);
		return isNaN(parsed) ? null : parsed;
	} else {
		return null;
	}
}
