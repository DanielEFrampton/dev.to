import { h, Component } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

import {
  defaultState,
  loadNextPage,
  onSearchBoxType,
  performInitialSearch,
  search,
  toggleTag,
  clearSelectedTags,
} from '../searchableItemList/searchableItemList';
import { ItemListItem } from '../src/components/ItemList/ItemListItem';
import { ItemListItemArchiveButton } from '../src/components/ItemList/ItemListItemArchiveButton';
import { ItemListLoadMoreButton } from '../src/components/ItemList/ItemListLoadMoreButton';
import { ItemListTags } from '../src/components/ItemList/ItemListTags';

const STATUS_VIEW_VALID = 'valid';
const STATUS_VIEW_ARCHIVED = 'archived';
const READING_LIST_ARCHIVE_PATH = '/readinglist/archive';
const READING_LIST_PATH = '/readinglist';

export class CuratedList extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: '', articles: []}

    // const { availableTags, statusView } = this.props;
    // this.state = defaultState({ availableTags, archiving: false, statusView });

    // bind and initialize all shared functions
    this.onSearchBoxType = debounce(onSearchBoxType.bind(this), 300, {
      leading: true,
    });
    // bind these functions to the context of this component
    this.loadNextPage = loadNextPage.bind(this);
    this.performInitialSearch = performInitialSearch.bind(this);
    this.search = search.bind(this);
    this.toggleTag = toggleTag.bind(this);
    this.clearSelectedTags = clearSelectedTags.bind(this);
  }

  componentDidMount() {
    // const { hitsPerPage, statusView } = this.state;

    // this.performInitialSearch({
    //   containerId: 'reading-list',
    //   indexName: 'SecuredReactions',
    //   searchOptions: {
    //     hitsPerPage,
    //     filters: `status:${statusView}`,
    //   },
    // });
  }
  render() {
    // const {
    //   items,
    //   itemsLoaded,
    //   totalCount,
    //   availableTags,
    //   selectedTags,
    //   showLoadMoreButton,
    //   archiving,
    // } = this.state;

    const isStatusViewValid = this.statusViewValid();

    const archiveButtonLabel = isStatusViewValid ? 'archive' : 'unarchive';
    // itemsToRender will map over each article in a specific curated list, assign the resulting ItemListItem to an array
    const itemsToRender = items.map(item => {
      return (
        <ItemListItem item={item}>
          <ItemListItemArchiveButton
            text={archiveButtonLabel}
            onClick={e => this.toggleArchiveStatus(e, item)}
          />
        </ItemListItem>
      );
    });

    const snackBar = archiving ? (
      <div className="snackbar">
        {isStatusViewValid ? 'Archiving...' : 'Unarchiving...'}
      </div>
    ) : (
      ''
    );
    return (
      // when rendered, find articles within state or wherever they are stored, render each one of those as a ItemListItem
      <div className="home item-list">
        <div className="side-bar">
          <div className="widget filters">
            <input
              onKeyUp={this.onSearchBoxType}
              placeHolder="search your list"
            />
            <div className="filters-header">
              <h4 className="filters-header-text">my tags</h4>
              {Boolean(selectedTags.length) && (
                <a
                  className="filters-header-action"
                  href={
                    isStatusViewValid
                      ? READING_LIST_PATH
                      : READING_LIST_ARCHIVE_PATH
                  }
                  onClick={this.clearSelectedTags}
                  data-no-instant
                >
                  clear all
                </a>
              )}
            </div>
            <ItemListTags
              availableTags={availableTags}
              selectedTags={selectedTags}
              onClick={this.toggleTag}
            />

            <div className="status-view-toggle">
              <a
                href={READING_LIST_ARCHIVE_PATH}
                onClick={e => this.toggleStatusView(e)}
                data-no-instant
              >
                {isStatusViewValid ? 'View Archive' : 'View Reading List'}
              </a>
            </div>
          </div>
          <div className='curated-lists'>
            <h2>Curated Lists</h2>
            {/* on click, display addCuratedList form */}
            <button>+</button>
            <ul>
              {/* // make these clickable and links to a curatedList component view */}
              <p></p><li>Best of 2019</li>
              <p></p><li>Cool Stuff</li>
            </ul>
            <NewListForm />
          </div>
        </div>

        <div className="items-container">
          <div className={`results ${itemsLoaded ? 'results--loaded' : ''}`}>
            <div className="results-header">
              {isStatusViewValid ? 'Reading List' : 'Archive'}
              {` (${totalCount > 0 ? totalCount : 'empty'})`}
            </div>
            <div>
              {items.length > 0 ? itemsToRender : this.renderEmptyItems()}
            </div>
          </div>

          <ItemListLoadMoreButton
            show={showLoadMoreButton}
            onClick={this.loadNextPage}
          />
        </div>

        {snackBar}
      </div>
    );
  }
}