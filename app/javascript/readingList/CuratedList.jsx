import { h, Component, render } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

export class CuratedList extends Component {
  constructor(props) {
    super(props)
    this.state = {articles: []}
  }

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
            <button className='remove-article-button'>Remove From List</button>
          </a>
        </div>
      )
    })
    return ( 
    <div className='curated-list-container' id={`${this.props.curatedListData.name}`}>
      <h1>
        {this.props.curatedListData.name}
      </h1>
      <a className='back-to-list-btn' href='/readinglist'>Back to Reading List</a>
      <section className='curated-cards'>
          {curatedCards}
      </section>
    </div>
    )
  }
}
