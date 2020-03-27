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
  handleSubmit = e => {
    e.preventDefault();
    window.fetch(`/${this.props.username}/curated_lists`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name,
                             description: this.state.description,
                             slug: this.sluggify(this.state.name)}),
      credentials: 'same-origin',
    });
  }

  sluggify = name => {
    return name.replace(/ +/g, '-').toLowerCase();
  };

  render() {
    const { name, description } = this.state
    return (
      <form className='new-list-form' onSubmit={this.handleSubmit}>
        <input
          className='new-list-form__name'
          type="text"
          placeholder="Name"
          name="name"
          value={name}
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
        <button className='new-list-form__button'>
          Create Curated List
        </button>

    </form>)
  }
}
