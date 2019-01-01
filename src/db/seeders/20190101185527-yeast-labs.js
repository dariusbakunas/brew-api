const labs = [
  'Brewferm',
  'Brewtek',
  'Coopers',
  'East Coast Yeast',
  'Fermentis',
  'Gigayeast',
  'Imperial Yeast',
  'Inland Island Yeast',
  'Lallemand',
  'Mangrove Jack\'s',
  'Omega Yeast',
  'SouthYeast',
  'Yeast Bay',
  'White Labs',
  'Wyeast',
];

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('yeast_labs',
    Object.values(labs).map(lab => ({
      name: lab,
    }))),

  down: queryInterface => queryInterface.bulkDelete('yeast_labs', null, {}),
};
