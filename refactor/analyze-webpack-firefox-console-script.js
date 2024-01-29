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
function incDict(dict, key) {
  if(dict[key] === undefined) dict[key] = 1;
  else dict[key]++;
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
console.log("Done!")

console.log(all_mods);
console.log(mod_types);
console.log(mod_names);
console.log(mod_by_file);
// get needs one module
// get needed one module
