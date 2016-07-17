import path from 'path';

const componentName = 'a-request';

const tempDirectory = 'tmp';
const sourceDirectory = 'src';
const libDirectory = 'lib';
const testFiles = [
  'test/**/*.spec.js'
];
const scriptSourceFiles = [
  'src/**/*.js',
];
const styleSourceFiles = [
  'src/**/*.{scss,css}',
];
const lintFiles = [
  'test/**/*.js',
  'src/**/*.js',
];
const scriptsToConcat = [
  'tmp/src-bundle.js',
];

export {
  componentName,
  tempDirectory,
  sourceDirectory,
  libDirectory,
  testFiles,
  scriptSourceFiles,
  styleSourceFiles,
  lintFiles,
  scriptsToConcat,
};
