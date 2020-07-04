// @ts-check
/* eslint no-restricted-syntax: ["off", "ForInStatement"] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable guard-for-in */

import i18next from 'i18next';
import onChange from 'on-change';
import resources from './locales';

// BEGIN (write your solution here)
const getSimplePropertiesFor = (object) => {
  const properties = [];
  for (const name in object) { // or use fromPairsIn (lodash)
    const value = object[name];
    const type = typeof value;
    if (['object', 'function'].includes(type) || value === '') {
      continue; // eslint-disable-line
    }
    properties.push({ name, value });
  }

  return properties;
};

const getOrderDirection = (name, { by, desc }) => {
  if (name !== by) {
    return i18next.t('unsorted');
  }
  return i18next.t(desc ? 'desc' : 'asc');
};

const generateColHeaderClickHandler = (name, grid) => (e) => {
  e.preventDefault();
  const { by, desc } = grid.order;
  grid.order = {
    desc: by === name ? !desc : false,
    by: name,
  };
};

const render = (container, watchedState) => {
  const { grid } = watchedState;
  const { order } = grid;
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  table.classList.add('table');
  const trHeader = document.createElement('tr');
  const thName = document.createElement('th');
  const nameLink = document.createElement('a');
  nameLink.setAttribute('href', '');
  nameLink.innerHTML = i18next.t('grid.cols.name', { direction: getOrderDirection('name', order) });
  nameLink.addEventListener('click', generateColHeaderClickHandler('name', grid));
  thName.appendChild(nameLink);
  const thValue = document.createElement('th');
  const valueLink = document.createElement('a');
  valueLink.setAttribute('href', '');
  valueLink.innerHTML = i18next.t('grid.cols.value', { direction: getOrderDirection('value', order) });
  valueLink.addEventListener('click', generateColHeaderClickHandler('value', grid));
  thValue.appendChild(valueLink);

  trHeader.append(thName, thValue);
  tbody.appendChild(trHeader);

  const properties = getSimplePropertiesFor(document.location);
  properties.sort((a, b) => {
    const { by, desc } = order;
    const [firstValue, secondValue] = desc ? [b[by], a[by]] : [a[by], b[by]];
    return String(firstValue).localeCompare(secondValue, i18next.language, { numeric: true });
  });
  properties.forEach(({ name, value }) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.innerHTML = name;
    const tdValue = document.createElement('td');
    tdValue.innerHTML = value;
    tr.append(tdName, tdValue);
    tbody.appendChild(tr);
  });
  container.innerHTML = '';
  container.appendChild(table);
};

export default async () => {
  await i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  const state = {
    grid: {
      order: {
        by: 'name',
        desc: false,
      },
    },
  };

  const container = document.querySelector('.container');
  const watchedState = onChange(state, () => render(container, watchedState));

  render(container, watchedState);
};
// END
