const rimraf = require('rmfr');
const ncp = require('ncp');
const colors = require('colors');
const { exec } = require('child-process-promise');

const OUT_DIR = './dist';

const showError = error => console.log(colors.red(error));

const transpileLibrary = () => (
  exec(`babel ./src --out-dir ${OUT_DIR}`)
);

const exportSource = () => (
  ncp('./src', `${OUT_DIR}/es`, (err) => {
    if (err) {
      showError(err);
    } else {
      console.log('exported source'.green);
    }
  })
);

console.log('building library'.green);

rimraf(OUT_DIR)
  .then(transpileLibrary)
  .then(exportSource)
  .then(() => { console.log('library built'.green); });
