import { h, Component, render } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

export class CuratedList extends Component {
  constructor(props) {
    super(props)
    this.state = {articles: []}
  }
  componentDidMount() {
    console.log('props:', this.props)
  }

  render() {
    let curatedCards = this.props.curatedListData.articles.map(article => {
      article = JSON.parse(article)
      console.log('article:', article)
      return (
        <a className="item" href={article.path}>
          <h1 className="item-title">{article.title}</h1>
          <p className='item-description'>{article.description}</p>
        </a>
      )
    })
    return ( 
    <div className={`${this.props.curatedListData.name}-curated-list`}>
      <h1>
        {this.props.curatedListData.name}
      </h1>
      <section className='curated-cards'>
        <div className='curated-card'>
          {curatedCards}
        </div>
      </section>
    </div>
    )
  }
}
