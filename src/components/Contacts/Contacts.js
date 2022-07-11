import s from '../Contacts/Contacts.module.css';

const Contacts = ({ contacts, removeFn }) => {
  const ell = contacts.map(contact => (
    <li key={contact.id} className={s.item}>
      {contact.name}: {contact.number}
      <button type="button" onClick={() => removeFn(contact.id)}>
        Delete
      </button>
    </li>
  ));

  return <ul className={s.list}>{ell}</ul>;
};
export default Contacts;