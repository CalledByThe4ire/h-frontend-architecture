// @ts-check

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

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

test('#application1', () => {
  expect(getTree()).toMatchSnapshot();

  const home = document.getElementById('list-home-list');
  const profile = document.getElementById('list-profile-list');

  userEvent.click(home);
  expect(getTree()).toMatchSnapshot();

  userEvent.click(profile);
  expect(getTree()).toMatchSnapshot();

  userEvent.click(home);
  expect(getTree()).toMatchSnapshot();
});

test('#application2', () => {
  expect(getTree()).toMatchSnapshot();

  const home2 = document.getElementById('list2-home-list');
  const profile2 = document.getElementById('list2-profile-list');

  userEvent.click(home2);
  expect(getTree()).toMatchSnapshot();

  userEvent.click(profile2);
  expect(getTree()).toMatchSnapshot();

  userEvent.click(home2);
  expect(getTree()).toMatchSnapshot();
});

test('#application3', () => {
  expect(getTree()).toMatchSnapshot();
});
