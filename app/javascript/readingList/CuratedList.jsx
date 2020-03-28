import { h, Component, render } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

export class CuratedList extends Component {
  constructor(props) {
    super(props)
    this.state = {articles: []}
  }

  removeArticle(article_id) {
    const curatedListId = this.props.curatedListData.id;
    window.fetch(`/curated_list_articles/${curatedListId}/${article_id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(
      () => window.location.reload()
    );
  };

  deleteList() {
    const curatedListId = this.props.curatedListData.id;
    window.fetch(`/curated_lists/${curatedListId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    }).then(
      () => window.location.pathname = '/readinglist'
    );
  };

  render() {
    if (window.location.href === 'http://localhost:3000/readinglist' || window.location.href === 'http://localhost:3000/') {
      return;
    }
    let curatedCards = this.props.curatedListData.articles.map(article => {
      article = JSON.parse(article)
      return (
        <div className='article-card' >
          <a className="article-card-link" href={article.path}>
            <h1 className="item-title">{article.title}</h1>
            <p className='item-description'>{article.description}</p>
          </a>
          <button
            className='remove-article-button'
            onClick={() => this.removeArticle(article.id)}
          >
            Remove From List
          </button>
        </div>
      )
    })
    return (
    <div className='curated-list-container' id={`${this.props.curatedListData.name}`}>
      <h1>
        {this.props.curatedListData.name}
      </h1>
      <h3>{this.props.curatedListData.description}</h3>
      <a className='back-to-list-btn' href='/readinglist'>Back to Reading List</a>
      <section className='curated-cards'>
          {curatedCards}
      </section>
      <button
        className='delete-list-button'
        onClick={() => this.deleteList()}
      >
        Delete List
      </button>
    </div>
    )
  }
}
