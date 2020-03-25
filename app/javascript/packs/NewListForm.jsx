import { h, render } from 'preact';
import { getUserDataAndCsrfToken } from '../chat/util';
import { NewListForm } from '../readingList/NewListForm';

function loadElement() {
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    const root = document.getElementById('reading-list');
    if (root) {
      render(
        <NewListForm
          // availableTags={currentUser.followed_tag_names}
          // statusView={root.dataset.view}
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
