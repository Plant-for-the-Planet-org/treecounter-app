const userAgent = (navigator && navigator.userAgent || '').toLowerCase();

// build a 'comparator' object for various comparison checks
const comparator = {
    '<': function(a, b) { return a < b; },
    '<=': function(a, b) { return a <= b; },
    '>': function(a, b) { return a > b; },
    '>=': function(a, b) { return a >= b; }
};

// helper function which compares a version to a range
function compareVersion(version, range) {
    let string = (range + '');
    let n = +(string.match(/\d+/) || NaN);
    let op = string.match(/^[<>]=?|/)[0];
    return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
}

// check for safari version
function safari(range) {
  let match = userAgent.match(/version\/(\d+).+?safari/);
  return match !== null && compareVersion(match[1], range);
}

// check for samsung version
function samsung(range) {
  let match = userAgent.match(/samsungbrowser\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

export function browserNotCompatible() {
  return safari('<10') || samsung('<6') || !Object.values || !window.Intl || !window.crypto;
}
