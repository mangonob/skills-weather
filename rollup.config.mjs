import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export default {
	input: "src/index.ts",
	output: {
		file: "dist/index.js",
		format: "es",
		sourcemap: false,
		banner: "#!/usr/bin/env node",
	},
	external: ["commander", /^node:/],
	plugins: [
		nodeResolve({
			preferBuiltins: true,
		}),
		commonjs(),
		typescript({
			tsconfig: "./tsconfig.json",
			sourceMap: false,
			declaration: false,
			declarationMap: false,
			compilerOptions: {
				module: "ESNext",
			},
		}),
		copy({
			targets: [{ src: "*.md", dest: "dist" }],
			hook: "writeBundle",
		}),
	],
};
