const distance = function (a, b) {
  var _a;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a.length > b.length) (_a = [b, a]), (a = _a[0]), (b = _a[1]);
  var row = [];
  for (var i = 0; i <= a.length; i++) row[i] = i;
  for (var i = 1; i <= b.length; i++) {
    var prev = i;
    for (var j = 1; j <= a.length; j++) {
      var val = void 0;
      if (b.charAt(i - 1) === a.charAt(j - 1)) val = row[j - 1];
      else val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }
  return row[a.length];
};

/**
 *
 */
const closestMatch = function (target, array, showOccurrences) {
  if (showOccurrences === void 0) {
    showOccurrences = false;
  }
  if (array.length === 0) return null;
  var vals = [];
  var found = [];
  for (var i = 0; i < array.length; i++)
    vals.push((0, distance)(target, array[i]));
  var min = Math.min.apply(Math, vals);
  for (var i = 0; i < vals.length; i++) {
    if (vals[i] === min) found.push(array[i]);
  }
  return showOccurrences ? found : found[0];
};

/**
 * Finds results from repos using levenchtein distance.
 * This function first tries to find results that include the str, then uses Levenchtein
 * @param str str to find in array
 * @param array array to find results from
 * @returns results of search
 */
export default function matchRepos(str, array) {
  const closeMatches = [];

  array.forEach((element) => {
    if (element.toLowerCase().includes(str.toLowerCase())) {
      closeMatches.push(element);
    }
  });
  array.forEach((element) => {
    const splitmatch = distance(str, element.substring(0, str.length));

    if (
      splitmatch <= 3 &&
      closeMatches.length < 8 &&
      !element.toLowerCase().includes(str.toLowerCase())
    ) {
      closeMatches.push(element);
    }
  });

  return closeMatches;
}