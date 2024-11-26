const { ESLint } = require("eslint");
const minimist = require("minimist");
const format = require("./node_modules/eslint/lib/cli-engine/formatters/stylish.js");

(async function main() {
  const config = {
    "env": {
      "browser": true,
      "node": true,
      "es2021": true,
      "jest": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:import/recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "ecmaFeatures": {
        "jsx": true
      },
      "sourceType": "module"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "plugins": [
      "import",
      "react"
    ],
    "rules": {
      "block-scoped-var": "error",
      "camelcase": "error",
      "class-methods-use-this": "error",
      "curly": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      "eqeqeq": "error",
      "func-style": "error",
      "no-alert": "error",
      "no-array-constructor": "error",
      "no-await-in-loop": "error",
      "no-console": "error",
      "no-constant-binary-expression": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-eval": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-useless-computed-key": "error",
      "no-use-before-define": "error",
      "no-var": "error",
      "object-shorthand": [
        "error",
        "never"
      ],
      "prefer-const": "error",
      "prefer-object-has-own": "error",
      "require-atomic-updates": "error",
      "array-bracket-newline": [
        "error",
        {
          "multiline": true
        }
      ],
      "array-element-newline": [
        "error",
        "consistent"
      ],
      "arrow-parens": "error",
      "arrow-spacing": "error",
      "block-spacing": "error",
      "brace-style": [
        "error",
        "1tbs"
      ],
      "comma-style": [
        "error",
        "last"
      ],
      "function-call-argument-newline": [
        "error",
        "consistent"
      ],
      "eol-last": [
        "error",
        "always"
      ],
      "indent": [
        "error",
        2,
        {
          "FunctionDeclaration": {
            "parameters": 2
          },
          "FunctionExpression": {
            "parameters": 2
          },
          "SwitchCase": 1
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "max-len": [
        "error",
        {
          "code": 80
        }
      ],
      "no-extra-semi": "error",
      "no-multi-spaces": "error",
      "no-trailing-spaces": "error",
      "quotes": [
        "error",
        "double"
      ],
      "semi": [
        "error",
        "always"
      ],
      "semi-spacing": "error",
      "semi-style": [
        "error",
        "last"
      ],
      "import/export": "error",
      "import/no-empty-named-blocks": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-as-default": "error",
      "import/no-named-as-default-member": "error",
      "import/no-absolute-path": "error",
      "import/no-commonjs": "error",
      "import/no-cycle": "error",
      "import/no-dynamic-require": "error",
      "import/no-self-import": "error",
      "import/first": "error",
      "import/newline-after-import": [
        "error",
        {
          "count": 1
        }
      ],
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ]
        }
      ]
    }
  };

  // Parse configs.
  const argv = minimist(process.argv.slice(2));

  const options = {
    allowInlineConfig: false,
    overrideConfig: config,
  };

  const files = argv._;
  console.log("Files to process:", files);

  // Lint the files.
  const eslint = new ESLint(options);
  const results = await eslint.lintFiles(files);

  // Generate formatted results.
  const resultText = format(results);

  // If there is at least one error or warning, fail the process.
  for (const result of results) {
    if (result.errorCount > 0 || result.warningCount > 0) {
      throw new Error(resultText);
    }
  }

  // No errors or warnings.
  console.log("OK");
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
