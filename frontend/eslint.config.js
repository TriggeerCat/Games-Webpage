import css from "@eslint/css";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import importSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    js.configs.recommended,

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
            "simple-import-sort": importSortPlugin
        },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "req|res|next" }
            ],
            "prettier/prettier": "error"
        },
        languageOptions: {
            globals: globals.browser
        }
    },

    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,

    {
        files: ["**/*.css"],
        plugins: { css },
        language: "css/css"
    }
]);
