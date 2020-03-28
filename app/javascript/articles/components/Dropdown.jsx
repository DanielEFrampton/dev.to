import { h } from 'preact';
import { articlePropTypes } from '../../src/components/common-prop-types/article-prop-types';
// import { userData } from '../../../assets/javascripts/utilities/userData';

export const Dropdown = ({ article }) => {
  const addToList = e => {
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
    // .then(response => response.json())
    // .then(data => console.log(data));
    // .catch(error => console.log(error));
    console.log(options);
  };

  const curatedLists = JSON.parse(
    document.getElementById('curated-list').dataset.curatedLists,
  );

  const dropdownOptions = curatedLists.map(list => {
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
