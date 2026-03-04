export type WeatherData = {
	/** 观测时间 */
	observationTime?: string;
	/** 温度，单位：摄氏度 */
	temperature?: number | null;
	/** 体感温度，单位：摄氏度 */
	feelsLike?: number | null;
	/** 天气状况描述 */
	description: string;
	/** 风向 */
	windDirection: string;
	/** 风向角 */
	windDegree?: number | null;
	/** 风速，单位：公里/小时 */
	windSpeed?: number | null;
	/** 风力等级(上限) */
	windScaleHigh?: number | null;
	/** 风力等级(下限) */
	windScaleLow?: number | null;
	/** 相对湿度，单位：百分比 */
	humidity?: number | null;
	/** 累计降水量，单位：毫米 */
	precipitation?: number | null;
	/** 大气压强，单位：百帕 */
	pressure?: number | null;
	/** 能见度，单位：公里 */
	visibility?: number | null;
	/** 云量，单位：百分比 */
	cloudCover?: number | null;

	/** 预报时间 */
	forecastTime?: string;
	/** 降雨概率，单位：百分比 */
	precipitationProbability?: number | null;
};
