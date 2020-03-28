import { h, Component, render } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

export class CuratedList extends Component {
  constructor(props) {
    super(props)
    this.state = {articles: []}
  }

  render() {
    let curatedCards = this.props.curatedListData.articles.map(article => {
      article = JSON.parse(article)
      return (
        <a className="article-card" href={article.path}>
          <h1 className="item-title">{article.title}</h1>
          <p className='item-description'>{article.description}</p>
          <button className='remove-article-button'>Remove From List</button>
        </a>
      )
    })
    return ( 
    <div className='curated-list-container' id={`${this.props.curatedListData.name}`}>
      <h1>
        {this.props.curatedListData.name}
      </h1>
      <section className='curated-cards'>
          {curatedCards}
      </section>
    </div>
    )
  }
}
