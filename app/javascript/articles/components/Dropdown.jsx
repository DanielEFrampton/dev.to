import { h } from 'preact';
import { articlePropTypes } from '../../src/components/common-prop-types/article-prop-types';
// import { userData } from '../../../assets/javascripts/utilities/userData';

export const Dropdown = ({ article }) => {
  const curatedListsAndIDs = {};
  const addToList = e => {
    if (curatedListsAndIDs[e.target.value].includes(article.id)) {
      return;
    }
    const user = JSON.parse(document.querySelector('body').dataset.user);
    const url = `/${user.username}/curated_lists/${e.target.value}/curated_list_articles`;
    const options = {
      method: 'POST',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ article_id: article.id }),
      credentials: 'same-origin',
    };
    window.fetch(url, options);
  };

  const curatedLists = JSON.parse(
    document.getElementById('curated-list').dataset.curatedLists,
  );

  const dropdownOptions = curatedLists.map(list => {
    curatedListsAndIDs[list.slug] = list.articles;
    console.log(article.id);
    // if (curatedListsAndIDs[list.slug].includes(article.id)) {
    //   return (
    //     <option disabled value={list.slug}>
    //       {list.name}
    //     </option>
    //   );
    // }
    return <option value={list.slug}>{list.name}</option>;
  });

  return (
    <select
      onChange={e => addToList(e)}
      onBlur={() => {}}
      className="article_list-dropdown"
    >
      <option disabled selected value="">
        ADD TO LIST
      </option>
      {dropdownOptions}
    </select>
  );
};

Dropdown.propTypes = {
  article: articlePropTypes.isRequired,
};
