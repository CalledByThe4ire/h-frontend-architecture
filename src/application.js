// @ts-check

import onChange from 'on-change';

// BEGIN (write your solution here)
export default () => {
  const state = {
    lists: {},
  };

  const tabs = document.querySelectorAll('[data-toggle="list"]');
  const activeTabs = document.querySelectorAll('[data-toggle="list"].active');

  activeTabs.forEach((activeTab) => {
    const listId = activeTab.closest('div').id;
    state.lists[listId] = {
      tabId: activeTab.id,
      tabPanelId: activeTab.hash.slice(1),
    };
  });

  const watchedState = onChange(state, (path, current, previous) => {
    if (current.tabId === previous.tabId) {
      return;
    }

    const currentBodyEl = document.getElementById(current.tabPanelId);
    currentBodyEl.classList.add('active', 'show');
    const prevousBodyEl = document.getElementById(previous.tabPanelId);
    prevousBodyEl.classList.remove('active', 'show');

    const currentHeaderEl = document.getElementById(current.tabId);
    currentHeaderEl.classList.add('active');
    const prevousHeaderEl = document.getElementById(previous.tabId);
    prevousHeaderEl.classList.remove('active');
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const listId = e.target.closest('div').id;
      watchedState.lists[listId] = {
        tabPanelId: e.target.hash.slice(1),
        tabId: e.target.id,
      };
    });
  });
};
// END
