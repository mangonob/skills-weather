export type WeatherArgs =
	| {
			/**  自然语言描述的地理位置 */
			location: string;
	  }
	| {
			/** 纬度 */
			latitude: string;
			/** 经度 */
			longitude: string;
	  };
