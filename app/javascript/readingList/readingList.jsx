// Import Preact library and related packages
import { h, Component } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

// Import functions from searchableItemList component
import {
  defaultState,
  loadNextPage,
  onSearchBoxType,
  performInitialSearch,
  search,
  toggleTag,
  clearSelectedTags,
} from '../searchableItemList/searchableItemList';

// Import additional Preact components
import { ItemListItem } from '../src/components/ItemList/ItemListItem';
import { ItemListItemArchiveButton } from '../src/components/ItemList/ItemListItemArchiveButton';
import { ItemListLoadMoreButton } from '../src/components/ItemList/ItemListLoadMoreButton';
import { ItemListTags } from '../src/components/ItemList/ItemListTags';

// Declare immutable constant variables
const STATUS_VIEW_VALID = 'valid';
const STATUS_VIEW_ARCHIVED = 'archived';
const READING_LIST_ARCHIVE_PATH = '/readinglist/archive';
const READING_LIST_PATH = '/readinglist';

// Define FilterText component which renders an H1 element with content
// conditional upon number of selected tags and number of query results
const FilterText = ({ selectedTags, query, value }) => {
  return (
    <h1>
      {selectedTags.length === 0 && query.length === 0
        ? value
        : 'Nothing with this filter 🤔'}
    </h1>
  );
};

// Define the ReadlingList component which inherits Component behavior.
export class ReadingList extends Component {
  // Constructor method which sets initial state based on the props it was
  // initialized with.
  constructor(props) {
    // Required use of super which allows `this` to be used from then onward.
    super(props);

    // Declaring instance properties for use throughout rest of component.

    // Declares availableTags and statusView variables using object
    // destructuring syntax unique to React framework.
    const { availableTags, statusView } = this.props;

    // Sets local state equal to return value of defaultState function given
    // contents of the above variables taken from props.
    this.state = defaultState({ availableTags, archiving: false, statusView });

    // bind and initialize all shared functions
    this.onSearchBoxType = debounce(onSearchBoxType.bind(this), 300, {
      leading: true,
    });
    this.loadNextPage = loadNextPage.bind(this);
    this.performInitialSearch = performInitialSearch.bind(this);
    this.search = search.bind(this);
    this.toggleTag = toggleTag.bind(this);
    this.clearSelectedTags = clearSelectedTags.bind(this);
  }

  // Code to run after component has successfully rendered
  componentDidMount() {
    // Declare variables using object destructuring from state instance property
    const { hitsPerPage, statusView } = this.state;

    // Invoke performInitialSearch method imported from searchableItemList
    this.performInitialSearch({
      containerId: 'reading-list',
      indexName: 'SecuredReactions',
      searchOptions: {
        hitsPerPage,
        filters: `status:${statusView}`,
      },
    });
  }

  // toggleStatusView class function defined, takes event as argument.
  // This is invoked when the link is clicked to toggle between the normal
  // reading list items and the "archived" reading list items.
  toggleStatusView = event => {
    // preventDefault function called on event object
    event.preventDefault();

    // object destructuring used to declare two variables from state property
    const { query, selectedTags } = this.state;

    // variable declared with return value of statusViewValid function,
    // line 146, which simply checks if the statusView property of the class
    // is equal to 'valid'
    const isStatusViewValid = this.statusViewValid();
    // declares variable with new status, the opposite of whatever current is.
    const newStatusView = isStatusViewValid
      ? STATUS_VIEW_ARCHIVED
      : STATUS_VIEW_VALID;
    // declares new path, the opposite of whatever the current is.
    const newPath = isStatusViewValid
      ? READING_LIST_ARCHIVE_PATH
      : READING_LIST_PATH;

    // empty items so that changing the view will start from scratch
    // When this occurs, the page will re-render because of the React
    // component life-cycle
    this.setState({ statusView: newStatusView, items: [] });

    // This is one of the methods imported from searchableItemList
    this.search(query, {
      page: 0,
      tags: selectedTags,
      statusView: newStatusView,
    });

    // change path in the address bar
    window.history.replaceState(null, null, newPath);
  };

  // Function invoked when "Archive" button is clicked on a particular article,
  // changes button and sends PUT request to update in DB.
  toggleArchiveStatus = (event, item) => {
    event.preventDefault();

    const { statusView, items, totalCount } = this.state;
    window.fetch(`/reading_list_items/${item.id}`, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ current_status: statusView }),
      credentials: 'same-origin',
    });

    // Updates state without newly archived article
    const t = this;
    const newItems = items;
    newItems.splice(newItems.indexOf(item), 1);
    t.setState({
      archiving: true,
      items: newItems,
      totalCount: totalCount - 1,
    });

    // hide the snackbar in a few moments
    setTimeout(() => {
      t.setState({ archiving: false });
    }, 1000);
  };

  statusViewValid() {
    const { statusView } = this.state;
    return statusView === STATUS_VIEW_VALID;
  }

  // Function for what to conditionally render if list is empty
  renderEmptyItems() {
    const { itemsLoaded, selectedTags, query } = this.state;

    // When viewing regular list
    if (itemsLoaded && this.statusViewValid()) {
      return (
        <div className="items-empty">
          <FilterText
            selectedTags={selectedTags}
            query={query}
            value="Your Reading List is Lonely"
          />
          <h3>
            Hit the
            <span className="highlight">SAVE</span>
            or
            <span className="highlight">
              Bookmark
              <span role="img" aria-label="Bookmark">
                🔖
              </span>
            </span>
            to start your Collection
          </h3>
        </div>
      );
    }

    // When viewing archived list
    return (
      <div className="items-empty">
        <FilterText
          selectedTags={selectedTags}
          query={query}
          value="Your Archive List is Lonely"
        />
      </div>
    );
  }

  // Main render function
  render() {
    // Load variables from state
    const {
      items,
      itemsLoaded,
      totalCount,
      availableTags,
      selectedTags,
      showLoadMoreButton,
      archiving,
    } = this.state;

    // Retrieve status view
    const isStatusViewValid = this.statusViewValid();

    // Conditional setting of archive button
    const archiveButtonLabel = isStatusViewValid ? 'archive' : 'unarchive';
    // Iterates over items to make ItemListItem components for each
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
    // Actual page rendering output
    return (
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

// Defines default prop values if none are provided when instantiating
// the ReadingList component, derived from STATUS_VIEW_VALID const above.
ReadingList.defaultProps = {
  statusView: STATUS_VIEW_VALID,
};

// Defining prop types for ReadingList component; telsts data types of given
// variables when running in development environment
ReadingList.propTypes = {
  availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  statusView: PropTypes.oneOf([STATUS_VIEW_VALID, STATUS_VIEW_ARCHIVED]),
};

// Defining prop types for FilterText component; telsts data types of given
// variables when running in development environment
FilterText.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  query: PropTypes.arrayOf(PropTypes.string).isRequired,
};
