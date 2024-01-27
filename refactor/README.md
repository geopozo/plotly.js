# Refactor

This fork is a refactor of [plotly.py](https://github.com/plotly/plotly.js) with the following goals:
1) Develop a tool for analyzing dependencies between files and individual functions.
5) Samurai-ethos error handling. No quirky, undefined, or implied defaults. Everything is explicitly or an exception is raised.

There may be some _vertical_ refactoring as well (ie. things that use or are used by `cartesian/`) but no _horizontal_ refactory (won't be refactoring `geo`).

The current goal is for all of this to be completed by end of March.
