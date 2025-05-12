import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsEslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tsEslint
  .config(
    { ignores: ["dist", "public", "src/assets", "copy-types.mjs"] },
    {
      extends: [js.configs.recommended, ...tsEslint.configs.recommended],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        "simple-import-sort": simpleImportSort,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Side effect imports.
              ["^\\u0000"],
              // Packages. `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              [
                "^(@assets|@components|@home|@host|@player|@sharedTypes|@socket|@constants)(/.*|$)",
              ],
              // Relative paths.
              [
                "^\\.\\.(?!/?$)",
                "^\\.\\./?$",
                "^\\./(?=.*/)(?!/?$)",
                "^\\.(?!/?$)",
                "^\\./?$",
                "^\.\/styles.ts",
                "^\.\/styles.tsx",
              ],
            ],
          },
        ],
        "simple-import-sort/exports": "error",
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },
  )
  .concat(eslintPluginPrettier);
