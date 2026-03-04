import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

const isProd = process.env.NODE_ENV === "production";

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
		json(),
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
		isProd
			? terser({
					format: {
						comments: false,
					},
				})
			: { name: "noop" },
		copy({
			targets: [{ src: "*.md", dest: "dist" }],
			hook: "writeBundle",
		}),
	],
};
