import { program } from "commander";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import qweather from "./providers/qweather";
import { type CLIOptions } from "./types";
import { error, loadConfig, optionsToWeatherArgs, success } from "./utils";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { version, name } = JSON.parse(
	readFileSync(path.resolve(__dirname, "../package.json"), "utf8"),
) as { version: string; name: string };

program
	.name(name)
	.description("Get the weather for a specific location or coordinates")
	.version(version)
	.option("-l, --location <string>", "Location to get the weather for")
	.option("-d, --days <number>", "", "0")
	.option("-h, --hours <number>", "")
	.option("-f, --config <string>", "Path to the config file")
	.option(
		"-c, --coordinates <string>",
		"Latitude and longitude to get the weather for (format: lat,lon)",
	);

program.parse();

process
	.on("uncaughtException", (err) => {
		error("Uncaught Exception: " + err);
	})
	.on("unhandledRejection", (reason) => {
		error("Unhandled Rejection: " + reason);
	})
	.on("rejectionHandled", () => {
		console.warn("Promise rejection handled later");
	})
	.on("SIGINT", () => {
		success("SIGINT received");
	})
	.on("SIGTERM", () => {
		success("SIGTERM received");
	});

const args = optionsToWeatherArgs(program.opts<CLIOptions>());
const weather = await qweather(args, loadConfig());
success(weather);
