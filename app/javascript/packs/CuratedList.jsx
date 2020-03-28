import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { CuratedList } from '../readingList/CuratedList';

function loadElement() {
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    const root = document.getElementById('curated-list');
    const curatedListData = JSON.parse(root.dataset.curatedLists);
    if (root) {
      render(
        <CuratedList
          curatedListData={curatedListData[0]}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();