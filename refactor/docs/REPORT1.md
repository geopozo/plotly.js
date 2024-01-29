Attached below is the code used in conjunction with github.com/grupopikul/json-browser to develop this report


the `./src/traces/` directory is extraordinary tangled. Many routines organized under a particular trace serve as utility functions for several other traces. Files from `/tracetype1/` will directly import internal javascript files from `/tracetype2/` instead of it's `index.js`.

Just looking at `./src/trace/scatter`, every other trace type tends to enter it.
This is particular true for `calc.js`, defaults, attributes, and layout type files.

Defaults add significant internal complexity.

This remains true if we disclude anything include an `index.js`.


Measureing complexity= (File * Lines of Code would be better, or counting how much times it is referenced for complexity)


If we move away from `trace/scatter/`, and look at something silly like like `trace/plom`, it is there are not many things that are dependendent on it.

So the questions is,
Which particular traces have a lot of inbound:

# Traces:

We ignore intertrace complexity. We also ignore dendendants that point to the proper `index.js`. I'm interested in internal tanglements.

The raw code and results are in REPORT1_TRACES_INBOUND.txt.

Here is the summary:

* Ignore complexity of intertrace, ie how `/scatter/*js` depend on each other. Let's look at things that are going directly at random `/scatter/*.js` (not index.js). And then, after that's eliminated, we look at what's dependent on `/scatter/index.js`.

### /traces/bar, /traces/pie

No out-of-trace dependencies, medium amount of intra-trace dependencies.

### /traces/box, /traces/histogram, /traces/histogram2d... most like this

No out-of-trace deps, for box, only candlestick and violin, but it's pretty heavy.

### /traces/heatmap/

No out-of-trace deps, but popular within traces.

### /traces/scatter/

popular with some out-of-trace deps

### Now let's looking at again ignoring all "layout" and "default" files.

Helps a bit but no slam dunk.

## Inbound to plots

Plots is similiar but more extreme. Cartesian is a massive global dependency, everything else is pretty much independent.

## Inbound to assets

## Inbound to components

so-so

## Inbound to lib

### Outbound

Rewriting stuff that has lots of inbound is hard, stuff is very dependent on it. It can be chipped away at if there are smaller things.

It's better to look at stuff that has a lot of outbound.

Outbound from traces is pretty okay. They all have some files going to lib/plots/components.

Plots is something weird, it's a way of rendering things and it's also a set of components.

One way to refactor is to look at the things with few dependendants, using the inbound, and start converting it import.

For the most part, plots as well is just on lib and components. Components is a bit weird huh.
(and what's the code to do that)

Plots and components seems pretty circular.

Which particular traces have a lot of about, require a lot of things outside.
(and what's the code to do that)


#### Traces dependent on other things

#### Components dependent on other things

#### Most popular library files




So what to do: understand the cartesian and scattter.
I could also keep working on this concept, developer a better more specific sense of complexity.
Gotta fix those bugs.
