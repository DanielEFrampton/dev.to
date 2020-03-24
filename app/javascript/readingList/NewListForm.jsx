import { h, Component } from 'preact';
import { PropTypes } from 'preact-compat';
import debounce from 'lodash.debounce';

export class NewListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }
  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value})
  // }
  handleClick = e => {
    e.preventDefault();
    console.log(this.state)
  }
  render() {
    const { title, description } = this.state
    return (
      <form className='new-list-form'>
        <input
          className='new-list-form__title'
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          className='new-list-form__description'
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <button className='new-list-form__button'>Create Curated List</button>
        {/* onClick={() => this.handleClick()} */}
    </form>)
  }
}