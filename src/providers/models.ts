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

export type QweatherResponse<T> = T & {
	code: string;
	updateTime: string;
	fxLink: string;
	refer: {
		sources: string[];
		license: string[];
	};
};

export type NowWeatherData = QweatherResponse<{
	now: WeatherNow;
}>;

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

export type WeatherHoursData = QweatherResponse<{
	hourly: WeatherHours[];
}>;

export type WeatherHours = {
	fxTime: string;
	temp: string;
	icon: string;
	text: string;
	wind360: string;
	windDir: string;
	windScale: string;
	windSpeed: string;
	humidity: string;
	pop: string;
	precip: string;
	pressure: string;
	cloud: string;
	dew: string;
};

export type WeatherDaysData = QweatherResponse<{
	daily: WeatherDays[];
}>;

export type WeatherDays = {
	fxDate: string;
	sunrise: string;
	sunset: string;
	moonrise: string;
	moonset: string;
	moonPhase: string;
	moonPhaseIcon: string;
	tempMax: string;
	tempMin: string;
	iconDay: string;
	textDay: string;
	iconNight: string;
	textNight: string;
	wind360Day: string;
	windDirDay: string;
	windScaleDay: string;
	windSpeedDay: string;
	wind360Night: string;
	windDirNight: string;
	windScaleNight: string;
	windSpeedNight: string;
	humidity: string;
	precip: string;
	pressure: string;
	vis: string;
	cloud: string;
	uvIndex: string;
};
