import { h, render } from 'preact';
import { Dropdown } from '../articles/components/Dropdown';

function loadElement() {
  //   const curatedLists = JSON.parse(
  //     document.getElementById('curated-list').dataset.curatedLists,
  //   );

  const article = document.getElementById('articleID');
  if (article) {
    const articleObject = { id: JSON.parse(article.dataset.id) };
    render(<Dropdown article={articleObject} />);
  }
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
