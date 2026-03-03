/**
 * @description 和风天气获取
 */

import { readFileSync, existsSync } from "node:fs";
import { type WeatherArgs } from "../types";
import { success } from "../utils";

export default async function qweather(args: WeatherArgs) {
	let privateKey = process.env.QWEATHER_PRIVATE_KEY?.trim();
	const privateKeyPath = process.env.QWEATHER_PRIVATE_KEY_PATH;

	if (!privateKey && !privateKeyPath) {
		throw "QWEATHER_PRIVATE_KEY or QWEATHER_PRIVATE_KEY_PATH is required";
	} else if (!privateKey && privateKeyPath) {
		if (!existsSync(privateKeyPath)) {
			throw `Private key file not found at path: ${privateKeyPath}`;
		} else {
			privateKey = readFileSync(privateKeyPath).toString().trim();
		}
	}

	if (privateKey && privateKey.length) {
		success(privateKey);
	} else {
		throw "Private key is required";
	}
}
