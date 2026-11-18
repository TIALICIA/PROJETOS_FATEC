import babelParser from "@babel/eslint-parser";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "src/generated/**"]
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-typescript"]
        }
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
