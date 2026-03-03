import { program } from "commander";
import { readFileSync } from "node:fs";
import path from "node:path";

const { version, name } = JSON.parse(
	readFileSync(path.resolve(__dirname, "../package.json"), "utf8"),
) as { version: string; name: string };

program
	.name(name)
	.description("Get the weather for a specific location or coordinates")
	.version(version)
	.option("-l, --location <string>", "Location to get the weather for")
	.option("-d, --day <number>", "", "0")
	.option("-h, --hour <number>", "")
	.option(
		"-c, --coordinates <string>",
		"Latitude and longitude to get the weather for (format: lat,lon)",
	);

type Options = {
	location?: string;
	coordinates?: string;
	day?: number;
	hour?: number;
};

program.parse();
const { coordinates, location } = program.opts<Options>();

if (!coordinates && !location) {
	program.error("Please provide either a location or coordinates.");
}

if (coordinates) {
	const [latitude, longitude] = coordinates.split(",");
	if (!latitude || !longitude) {
		program.error(
			"Invalid location format. Please provide latitude and longitude separated by a comma.",
		);
	}
} else if (location) {
	void 0;
}
