Currently we focus on **analysis** of plotly repository.

# Overview:

## Analysis:

This refactor is based on a new build system which allows more professional analysis of directories.
* It can analyze webpack output.
* (Planned) It can analyze the source code directly.

## Execution:


### Source

Plotly must be cleanly segmented into clear systems in order to be properly strangle-refactored. The goal of the analysis above is to identify which parts are most tangled up.

### Build

Current build systems lead to complexity. They execute procedural processes based on config files, and often try to do much more than they're good at. They are in general, unflexible, and handle too many use cases. The new build system will allow good analysis, better maintenance, and follow-able build steps. The goal is create something suited for large systems maintained by experts, not to create the most work-out-of-the-box build system.

## Installing

## Dependencies

You may need the follow globals: `zsh`, `node`...

The webpack analyzer is currently _not_ packaged and must be installed from [github](https://github.com/grupopikul/brow-json).

*We don't use `package.json` to track dependencies.*

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

# Directory Map

```
refactor/bin/               # contains all executable utilities used by user
refactor/bin/analyze-old    # start a server showing old-plotly's webpack-bundle-analyzer
refactor/bin/check-master   # checks to see if master is merged into your branch, it probably should be
                            # if at some point that no longer becomes appropriate, this should be modified
                            # or what calls it shoudl be modified `grep bin/ -rne "check-master"`

refactor/bin/util/          # commands, but not the first layer of the `refactor` api
refactor/etc/               # contains config files
refactor/etc/deps/:         # contains list for deps
refactor/docs/              # will contain other docs besides this one
refactor/tmp/               # nothing here is committed, temporary output goes here under its name
refactor/tmp/analyze-old/   # intermediate steps from `analyze-old` would go here
```
## Style of Code

Use `/bin/analyze-old` as a template to make scripts.

# Goals

This fork is a refactor of [plotly.py](https://github.com/plotly/plotly.js) with the following goals:
- [ ] Develop a tool for analyzing dependencies between files and individual functions.
- [ ] Samurai-ethos error handling. No quirky, undefined, or implied defaults. Everything is explicitly or an exception is raised.
- [ ] Excellent contributor documentation
