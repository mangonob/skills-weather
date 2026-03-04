import { exit } from "node:process";
import type { CLIOptions, WeatherArgs, Configuration } from "./types";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * 输出错误信息并以失败状态码终止当前进程。
 *
 * @param message 要输出到标准错误的消息。
 * @param code 进程退出码，默认值为 `1`。
 * @returns 不会返回；函数会调用 `process.exit` 结束进程。
 */
export function error(message: string, code: number = 1): never {
	console.error(message);
	exit(code);
}

/**
 * 以格式化 JSON 输出结果并以成功状态码终止当前进程。
 *
 * @param json 需要输出的任意可序列化对象。
 * @returns 不会返回；函数会调用 `process.exit(0)` 结束进程。
 */
export function success(json: unknown): never {
	console.log(JSON.stringify(json, null, 2));
	exit(0);
}

/**
 * 加载天气技能配置文件。
 *
 * 配置路径优先级如下：
 * 1. `configURL` 参数
 * 2. 环境变量 `SKILLS_WEATHER_CONFIG_FILE_PATH`
 *
 * @param configURL 可选的配置文件路径。
 * @returns 解析后的配置对象。
 * @throws {Error} 当配置文件不存在时抛出错误。
 * @throws {SyntaxError} 当配置文件内容不是合法 JSON 时抛出错误。
 */
export function loadConfig(configURL?: string): Configuration {
	const __filename = fileURLToPath(import.meta.url);
	const url =
		configURL ??
		process.env.SKILLS_WEATHER_CONFIG_FILE_PATH ??
		path.join(path.dirname(__filename), "config.json");

	if (!existsSync(url)) {
		throw new Error(`Config file not found at path: ${url}`);
	} else {
		return JSON.parse(readFileSync(url, "utf-8"));
	}
}

/**
 * 断言条件成立；若条件不成立则抛出错误。
 *
 * @param pred 要检查的条件表达式。
 * @param msg 条件不成立时的错误消息。
 * @throws {Error} 当 `pred` 为假值时抛出。
 */
export function ensure(pred: unknown, msg: string) {
	if (!pred) {
		throw new Error(msg);
	}
}

/**
 * 根据键值映射渲染模板字符串中的占位符。
 *
 * 占位符格式为 `{key}`。当前实现每个 key 仅执行一次 `replace`，
 * 即只替换模板中该占位符的首次出现位置。
 *
 * @param template 包含占位符的模板字符串。
 * @param lookup 占位符键值映射。
 * @returns 渲染后的字符串。
 */
export function renderTemplateString(
	template: string,
	lookup: Record<string, string>,
) {
	let renderString = template;
	Object.entries(lookup).forEach(([key, value]) => {
		renderString = renderString.replace(`{${key}}`, value);
	});
	return renderString;
}

/**
 * 将 CLI 输入选项转换为标准化天气查询参数。
 *
 * 支持两种输入模式：
 * - `coordinates`：格式应为 `"latitude,longitude"`
 * - `location`：文本位置名称
 *
 * `days` 和 `hours` 会被转换为数值类型。
 *
 * @param options CLI 参数对象。
 * @returns 可用于 provider 查询的天气参数。
 * @throws 不会显式抛出；校验失败时会调用 `error` 并终止进程。
 */
export function optionsToWeatherArgs(options: CLIOptions): WeatherArgs {
	const { coordinates, location, hours, days } = options;

	if (!coordinates && !location) {
		error("Please provide either a location or coordinates.");
	}

	if (coordinates) {
		const [latitude, longitude] = coordinates.split(",");
		if (!latitude || !longitude) {
			error(
				"Invalid location format. Please provide latitude and longitude separated by a comma.",
			);
		}
		return {
			latitude: latitude.trim(),
			longitude: longitude.trim(),
			days: Number(days),
			hours: Number(hours),
		};
	} else if (location) {
		return {
			location: location.trim(),
			days: Number(days),
			hours: Number(hours),
		};
	} else {
		error("Please provide either a location or coordinates.");
	}
}

/**
 * 将输入值解析为数字。
 *
 * - 当输入本身为 `number` 时直接返回。
 * - 当输入为 `string` 时使用 `Number()` 解析。
 * - 其他类型或解析失败时返回 `null`。
 *
 * @param raw 待解析的原始值。
 * @returns 解析成功后的数字，或 `null`。
 */
export function parseNumber(raw: unknown): number | null {
	if (typeof raw === "number") {
		return raw;
	} else if (typeof raw === "string") {
		const parsed = Number(raw);
		return isNaN(parsed) ? null : parsed;
	} else {
		return null;
	}
}

/**
 * 类型断言辅助函数，仅用于编译期类型收窄。
 *
 * 此函数在运行时不执行任何逻辑；它通过 TypeScript 的
 * `asserts value is T` 语法帮助调用方表达“此处值应为 T”。
 *
 * @typeParam T 目标类型。
 * @param value 待断言的值。
 */
export function assertType<T>(value: unknown): asserts value is T {}

/**
 * 确保私钥字符串包含标准 PEM 头尾标记。
 *
 * 若输入已包含 `-----BEGIN PRIVATE KEY-----`，则原样返回；
 * 否则自动补齐头尾行并换行包装内容。
 *
 * @param privateKey 原始私钥内容。
 * @returns 带有完整 PEM 头尾的私钥字符串。
 */
export function ensurePrivateKeyHeader(privateKey: string): string {
	if (privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
		return privateKey;
	} else {
		return `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
	}
}
