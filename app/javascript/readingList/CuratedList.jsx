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
    // let curatedCards = 
    return ( 
    <div className={`${this.props.curatedListData.name}-curated-list`}>
      <h1>
        {this.props.curatedListData.name}
      </h1>
      <section className='curated-cards'>
        <div className='curated-card'>

        </div>
      </section>
    </div>
    )
  }
}
