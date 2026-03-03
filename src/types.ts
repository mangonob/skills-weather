export type WeatherArgs = (
	| {
			/**  自然语言描述的地理位置 */
			location: string;
	  }
	| {
			/** 纬度 */
			latitude: string;
			/** 经度 */
			longitude: string;
	  }
) & {
	/** 每日天气查询 */
	day?: number;
	/** 逐小时天气查询 */
	hour?: number;
};
