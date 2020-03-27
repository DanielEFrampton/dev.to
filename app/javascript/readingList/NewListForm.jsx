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
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }
  handleClick = e => {
    e.preventDefault();
    window.fetch(`/${this.props.username}/curated_lists`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name,
                             description: this.state.description }),
      credentials: 'same-origin',
    });
  }
  render() {
    const { title, description } = this.state
    return (
      <form className='new-list-form' onSubmit={this.handleClick}>
        <input
          className='new-list-form__title'
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => this.handleChange(e)}
        />
        <input
          className='new-list-form__description'
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => this.handleChange(e)}
        />
        <button className='new-list-form__button'
                // type='submit'
                // onClick={() => this.handleClick()}
                >
          Create Curated List
        </button>

    </form>)
  }
}
