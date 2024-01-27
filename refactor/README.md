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

## Style:

Use `/bin/analyze-old` as a template.

# Goals

This fork is a refactor of [plotly.py](https://github.com/plotly/plotly.js) with the following goals:
1) Develop a tool for analyzing dependencies between files and individual functions.
5) Samurai-ethos error handling. No quirky, undefined, or implied defaults. Everything is explicitly or an exception is raised.

There may be some _vertical_ refactoring as well (ie. things that use or are used by `cartesian/`) but no _horizontal_ refactory (won't be refactoring `geo`).

The current goal is for all of this to be completed by end of March.
