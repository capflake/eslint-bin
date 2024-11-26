# eslint-bin

ESLint binary for bazel. This repository creates binary files for eslint that
can be run without the nodejs environment.

## Install

Install all of the npm dependencies (one-time operation).

```shell
npm install
```

## Build

Build binaries. The binaries will be located in `out/` folder.

```shell
npm run build
```

## Release

Create a new tag:

```shell
git tag -a v0.1.0 -m "Release v0.1.0"
```

Create release on GitHub and upload the binaries, see example:
https://github.com/capflake/eslint-bin/releases/tag/v0.1.0.
