import { renderTemplateString } from "../utils";

export const API = {
	/** 检索城市 */
	CITY_LOOKUP: "/geo/v2/city/lookup",
	/** 实况天气 */
	WEATHER_NOW: "/v7/weather/now",
	/** 逐天预报 */
	WEATHER_DAYS: "/v7/weather/{days}",
	/** 逐小时预报 */
	WEATHER_HOURS: "/v7/weather/{hours}",
};

export type APIProvider =
	| keyof typeof API
	| { api: keyof typeof API; lookup: Record<string, string> };

export interface IQweatherAPI {
	get: (
		api: APIProvider,
		query?: Record<string, string>,
		init?: RequestInit,
	) => Promise<Response>;
}

export function QweatherAPI(
	host: string,
	headers: Record<string, string>,
): IQweatherAPI {
	const nativeFetch = fetch;
	const _host = host.startsWith("http") ? host : "https://" + host;

	return {
		get(api, query, init) {
			const path =
				typeof api === "string"
					? API[api]
					: renderTemplateString(API[api.api], api.lookup);
			const url = new URL(_host + path);
			if (query) {
				const search = new URLSearchParams(query).toString();
				url.search = search;
			}
			return nativeFetch(url, {
				...init,
				headers: { ...headers, ...init?.headers },
				method: "GET",
			});
		},
	};
}
