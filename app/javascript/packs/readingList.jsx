import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { ReadingList } from '../readingList/readingList';

function loadElement() {
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    const root = document.getElementById('reading-list');
    const {curatedLists} = document.getElementById('curated-list').dataset;
    if (root) {
      render(
        <ReadingList
          availableTags={currentUser.followed_tag_names}
          statusView={root.dataset.view}
          curatedLists={JSON.parse(curatedLists)}
          username={currentUser.username}
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
