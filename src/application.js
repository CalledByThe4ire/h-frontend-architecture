// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import _ from 'lodash';
import * as yup from 'yup';

import onChange from 'on-change';
import axios from 'axios';

// Never hardcore urls
const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation does not match to password',
    ),
});

const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// BEGIN (write your solution here)

// END
