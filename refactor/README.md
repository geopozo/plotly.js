Currently we focus on **analysis** of plotly repository.

# Using

All runnable commands are in `/refactor/bin`.

## Installing

The common tools (npm, package.json) aren't used here! Go see the *[Dependencies](#dependencies)* section of *Contributing*

## Building

Nothing to build yet...

## Testing

Nothing to test yet

## Analyzing

### Analyzing Old Plotly:

Default old-Ploty entry point is `/lib/index.js`.

`/bin/analyze-old -h` to see commands, or w/o `-h` to run default. Will open browser:


```
# Definitions:

# stat:   input size of file
# parsed: minified sized
# gzip:   size of minified after gzip
```


#### Notes
##### Old Plotly Entry Points

*Note: Old _Plotly_ has it's `/lib` folder that seems to be filled with hand-written `.js` files that just map themselves to their actual selves through `module.exports = require("the real me");` like `bar.js` which is just `module.exports = require("../src/traces/bar")`. The build system seems to only ever touches what's in that folder, maybe so no one could easily create tangled dependenciesbetween the build system and `src/`.*

# Contributing

## Dependencies

You may need the follow globals: `zsh`, `node`...

In `/etc/deps` there are several `requirements-*.txt`, it's like this:

```
- requirements.txt # necessary for code
- requirements-build.txt # necessary for building
- requirements-analysis.txt # necessary for analyzing
```
Add your npm packages manually to these things. They can overlap a little, but otherwise do:

```
- requirements.txt
- requirements-build.txt
- requirements-analysis.txt.list
```
Where `.list` will be a list of files needed.

```bash
npm install $(cat /etc/deps/requirements.txt)
npm install --upgrade $(cat /etc/deps/requirements.txt)
# or
npm install  $(cat $(cat requirements-analysis.list))
```
## Directory Map

```
refactor/bin/               # contains all executable utilities used by user
refactor/bin/analyze-old    # will start a server showing old-plotly's webpack-bundle-analyzer
refactor/bin/util/          # commands, but not the first layer of the `refactor` api
refactor/etc/               # contains config files
refactor/etc/deps/:         # contains file files for deps
refactor/docs/              # will contain other docs besides this one
refactor/tmp/               # nothing here is committed, temporary output goes here under its name
refactor/tmp/analyze-old/   # intermediate steps form `analyze-old` would go here
```
## Style

Use `/bin/analyze-old` as a template.

# Goals

This fork is a refactor of [plotly.py](https://github.com/plotly/plotly.js) with the following goals:
1. Develop a tool for analyzing dependencies between files and individual functions.
2. Samurai-ethos error handling. No quirky, undefined, or implied defaults. Everything is explicitly or an exception is raised.
3. Excellent documentation
