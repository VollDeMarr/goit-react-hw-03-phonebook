import { Component } from 'react';
import { nanoid } from 'nanoid'

import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
      id:nanoid()
    });
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onInputChange}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.onInputChange}
          ></input>
        </label>

        <button className={s.btnInput} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
export default Form;