// @ts-check

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import timer from 'timer-promise';

import run from '../src/application';

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

const fixturesPath = path.join(__dirname, '__fixtures__');
const getTree = () => prettier.format(document.body.innerHTML, options);

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join(fixturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run();
});

test('application', async () => {
  expect(getTree()).toMatchSnapshot();

  const [nameLink, valueLink] = document.querySelectorAll('a');

  nameLink.click();
  await timer.start(10);
  expect(getTree()).toMatchSnapshot();

  valueLink.click();
  await timer.start(10);
  expect(getTree()).toMatchSnapshot();

  valueLink.click();
  await timer.start(10);
  expect(getTree()).toMatchSnapshot();

  nameLink.click();
  await timer.start(10);
  expect(getTree()).toMatchSnapshot();

  valueLink.click();
  await timer.start(10);
  expect(getTree()).toMatchSnapshot();
});

test('application 2', async () => {
  expect(getTree()).toMatchSnapshot();
});
