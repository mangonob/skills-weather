import { exit } from "node:process";

export function error(message: string, code: number = 1) {
	console.error(message);
	exit(code);
}

export function success(json: unknown) {
	console.log(JSON.stringify(json, null, 2));
	exit(0);
}
