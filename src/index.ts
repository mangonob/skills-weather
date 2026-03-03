import { program } from "commander";

program
	.option("-c", "ailsdjfalsdjklf")
	.requiredOption("-t, --token <token>")
	.argument("<string>");

program.parse();
