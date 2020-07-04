// @ts-check

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { delay } from 'nanodelay';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import run from '../src/application.js';

nock.disableNetConnect();

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

const fixturesPath = path.join(__dirname, '__fixtures__');
const getTree = () => prettier.format(document.body.innerHTML, options);

let elements;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join(fixturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run();

  elements = {
    form: document.querySelector('[data-form="sign-up"]'),
    nameInput: document.getElementById('sign-up-name'),
    emailInput: document.getElementById('sign-up-email'),
    passwordInput: document.getElementById('sign-up-password'),
    passwordConfirmationInput: document.getElementById('sign-up-password-confirmation'),
  };
});

test('application 1', async () => {
  expect(getTree()).toMatchSnapshot();

  await userEvent.type(elements.nameInput, 'Petya', { allAtOnce: true });
  elements.nameInput.setAttribute('value', 'Petya');
  await userEvent.type(elements.emailInput, 'wrong-email', { allAtOnce: true });
  elements.emailInput.setAttribute('value', 'wrong-email');
  await userEvent.type(elements.passwordInput, 'long password without confirmation', { allAtOnce: true });
  elements.passwordInput.setAttribute('value', 'long password without confirmation');

  await delay(10);
  expect(getTree()).toMatchSnapshot();
});

test('application 2', async () => {
  await userEvent.type(elements.passwordInput, 'qwert', { allAtOnce: true });
  elements.passwordInput.setAttribute('value', 'qwert');

  await delay(10);
  expect(getTree()).toMatchSnapshot();
});

test('application 3', async () => {
  const scope = nock('http://localhost')
    .post('/users')
    .reply(200);

  await userEvent.type(elements.emailInput, 'support@hexlet.io', { allAtOnce: true });
  elements.emailInput.setAttribute('value', 'support@hexlet.io');
  await userEvent.type(elements.passwordInput, 'qwerty', { allAtOnce: true });
  elements.passwordInput.setAttribute('value', 'qwerty');
  await userEvent.type(elements.passwordConfirmationInput, 'qwerty', { allAtOnce: true });
  elements.passwordConfirmationInput.setAttribute('value', 'qwerty');

  await delay(10);
  expect(getTree()).toMatchSnapshot();

  elements.form.submit();
  await delay(10);
  await delay(10);
  await delay(10);
  await delay(10);
  expect(getTree()).toMatchSnapshot();

  scope.done();
});

test('application 4', async () => {
  expect(getTree()).toMatchSnapshot();
});
