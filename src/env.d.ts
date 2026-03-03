declare global {
	namespace NodeJS {
		interface ProcessEnv {
			QWEATHER_PRIVATE_KEY?: string;
			QWEATHER_PRIVATE_KEY_PATH?: string;
		}
	}
}

export {};
