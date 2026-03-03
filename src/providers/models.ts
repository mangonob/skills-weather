export type CityLookupData = {
	code: string;
	location: CityLookupLocation[];
};

export type CityLookupLocation = {
	name: string;
	id: string;
	lat: string;
	lon: string;
	adm2: string;
	adm1: string;
	country: string;
	tz: string;
	utcOffset: string;
	isDst: string;
	type: string;
	rank: string;
	fxLink: string;
};

export type NowWeatherData = {
	code: string;
	updateTime: string;
	fxLink: string;
	now: WeatherNow;
	refer: {
		sources: string[];
		license: string[];
	};
};

export type WeatherNow = {
	obsTime: string;
	temp: string;
	feelsLike: string;
	icon: string;
	text: string;
	wind360: string;
	windDir: string;
	windScale: string;
	windSpeed: string;
	humidity: string;
	precip: string;
	pressure: string;
	vis: string;
	cloud: string;
	dew: string;
};
