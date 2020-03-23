// Import Preact core files
import { h, render } from 'preact';
// Import single method from JS utility file which retrieves
// user info and CSRF (cross-site request forgery) token
import { getUserDataAndCsrfToken } from '../chat/util';
// Import ReadingList component
import { ReadingList } from '../readingList/readingList';

// Main function which renders ReadingList component with
// current user info as props and statusView loaded
// from the data attributes of the reading-list div on the
// reading_list_items index.html.erb file.
function loadElement() {
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    const root = document.getElementById('reading-list');
    if (root) {
      render(
        <ReadingList
          availableTags={currentUser.followed_tag_names}
          statusView={root.dataset.view}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}

// InstantClick function to pre-load the element
window.InstantClick.on('change', () => {
  loadElement();
});

// Execute main function
loadElement();
