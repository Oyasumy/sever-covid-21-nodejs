function compare(a, b) {
  if (a.cases < b.cases) {
    return 1;
  }
  if (a.cases > b.cases) {
    return -1;
  }
  return 0;
}

function checkNumber(num) {
  const parse = parseInt(num);
  if (Number.isInteger(parse)) return parse;
  return null;
}

module.exports = {
  compare,
  checkNumber,
};
