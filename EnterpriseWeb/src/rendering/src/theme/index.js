const base = require('./tailwind.base');
const aw = require('./tailwind.aw');
const rba = require('./tailwind.rba');

module.exports = {
  base: base,
  themes: [aw, rba],
};
