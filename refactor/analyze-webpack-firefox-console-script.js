// This right now is for running in dev console, but one day I would like to do be able to do actual AST and static analysis on files. That means the folder will need be served, and there will have to be a function for accessing those served files.

// Warning, this only supports one chunk, since it gets modules from the one chunk. I think. I don't know if the way it gets modules works with two chunks.

// Will make all re-run
var allRun = false;

// toRun returns true if variable is not set properly. Wrap your variable in an object so we can get its variable name.
function toRun(variable) {
  const access = Object.values(variable)[0];
  if(allRun) {
    console.log(`Setting ${Object.keys(variable)}`)
    return true;
  }
  if(access === 0 || access === false) return false;
  if(!access || access === true) {
    console.log(`Setting ${Object.keys(variable)}`)
    return true;
  }
  return false
}

// incDict will either initialize a key to 1 or increment. Good for counting unique unique values.
function addDict(dict, key, value) {
	if(dict[key] === undefined) dict[key] = value;
  else dict[key] += value;
}
// shortcut to above, unfavored
function incDict(dict, key) {
  addDict(dict, key, 1);
}

// like addDict but we're making a list
function pushDict(dict, key, value) {
  if(dict[key] === undefined) dict[key] = [value];
  else dict[key].push(value);
}

// countUniqueValues will find items that have key and count frequency of their values, returning a dictionary.
function countUniqueValues(items, key) {
  var values = {};
  if(!Array.isArray(items)) items = Object.keys(items);
  items.forEach((item) => {
    if(item[key] !== undefined) {
      incDict(values, item[key])
    }
  })
  return values;
}


var all_mods;

if(toRun({all_mods})) {
	all_mods = window.json_browser.get_tuple().object["modules"];
}

var mod_types;

if (toRun({mod_types})) {
	mod_types = countUniqueValues(all_mods, "type")
}

var mod_names;

if(toRun({mod_names})) {
  mod_names = countUniqueValues(all_mods, "name")
}

// Let's get the mods that are just files:
var mod_by_file;

if(toRun({mod_by_file})) {
  mod_by_file = {};
	const re = new RegExp(/\.\/.*(\.js|\.ts|\.mjs|\.cjs)$/);
	all_mods.forEach((mod) => {
    if(!mod.name) return;
    if(re.test(mod.name)) {
      mod_by_file[mod.name] = mod;
    }
	})
}

// Very good reason breakdown
// all reason types and all reasons there
var all_reason_types;
// all unique reasons and their frequency
var count_all_reason_types;
// total number of reasons and its modules (not frequency among modules)
var reason_counts;
// # of unique reasons types and its modules ( not frequency among modules )
var reason_unique_type_counts;
// # of reasons and its modules grouped by depth
var reason_counts_by_depth;
if(toRun({all_reason_types}) || 
   toRun({count_all_reason_types}) || 
   toRun({reason_counts}) || 
   toRun({reason_unique_type_counts}) ||
   toRun({reason_counts_by_depth})) {
  all_reason_types = {}; // NOW ADD TO IT!
  count_all_reason_types = {};
  reason_counts = {};
  reason_unique_type_counts = {};
  reason_counts_by_depth = [];
  Object.values(mod_by_file).forEach((mod) => {
    if (!reason_counts_by_depth[mod.depth]) {
      reason_counts_by_depth[mod.depth] = {};
    }
    // total number of reasons and its frequency among modules
    pushDict(reason_counts, mod.reasons.length, mod);
    pushDict(reason_counts_by_depth[mod.depth], mod.reasons.length, mod);
    let temp_dict = countUniqueValues(mod.reasons, "type");
    mod.reasons.forEach((reason) => {
      pushDict(all_reason_types, reason.type, {"holdingModule":mod,"reason":reason})
    });
    // # of unique reasons and its frequency among modules
    pushDict(reason_unique_type_counts, Object.keys(temp_dict).length, mod);
    for (const key in temp_dict) {
      // all unique reasons and their frequency
      addDict(count_all_reason_types, key, temp_dict[key]);
    }
  });
}
// Most of this interesting to look at w/ certain filters on folders
console.log(all_reason_types);
console.log(count_all_reason_types);
console.log(reason_counts);
console.log(reason_unique_type_counts);
console.log(reason_counts_by_depth); // Interesting to graph, better w/o filters

// How many types have module names look at that? (maybe we can push reasons)
// What's the unique set of module names? match mod_by_file.length?
// Redo the above but with unique module names

// Identify if it's cjs or ESM


// Get all modules for which I'm a reason

// let's create a directory tree
// let's create a depth tree
// process reasons
// folders with index.js
// folders w/ no index.js, all files

"done"