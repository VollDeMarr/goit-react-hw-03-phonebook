import { Component } from 'react';

import Contacts from '../Contacts/Contacts';
import Form from '../Form/Form';
import Filter from '../Filter/Filter';

import s from './Phoneboock.module.css';

class Phoneboock extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmit = data => {
    const { contacts } = this.state;

    const findeName = contacts.find(item => item.name === data.name);
    if (findeName) {
      alert(`${data.name} is already in contacts list`);
      return;
    }
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, data] };
    });
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterList = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const inLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(inLowerCase)
    );
  };
  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contact);
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const filteredContacts = this.getVisibleContacts();

    return (
      <div className={s.container}>
        <h1>Phoneboock</h1>
        <div className={s.inputContainer}>
          <Form onSubmit={this.formSubmit} />
        </div>
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterList} />
        <div className={s.contactsWrapper}>
          <Contacts contacts={filteredContacts} removeFn={this.removeContact} />
        </div>
      </div>
    );
  }
}
export default Phoneboock;
