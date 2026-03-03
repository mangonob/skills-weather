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
	days?: number;
	/** 逐小时天气查询 */
	hours?: number;
};

export type Configuration = {
	/** API请求Host */
	apiHost?: string;
	/** 应用ID */
	appId?: string;
	/** 私钥 */
	privateKey?: string;
	/** 凭据ID */
	credentialId?: string;
};

export type CLIOptions = {
	location?: string;
	coordinates?: string;
	days?: number;
	hours?: number;
};
