declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SKILLS_WEATHER_CONFIG_FILE_PATH?: string;
		}
	}
}

export {};
