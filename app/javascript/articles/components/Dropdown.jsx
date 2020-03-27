import { h } from 'preact';
import { articlePropTypes } from '../../src/components/common-prop-types/article-prop-types';

export const Dropdown = ({ article }) => {
  const addToList = () => {
    return null;
  };

  const curatedLists = JSON.parse(
    document.getElementById('curated-list').dataset.curatedLists,
  );

  console.log(curatedLists);

  const dropdownOptions = curatedLists.map(list => (
    <option value={list.name} onClick={() => addToList(article)}>
      {list.name}
    </option>
  ));

  return (
    <select className="article_list-dropdown">
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
