import { useState } from 'react';
import shortid from 'shortid';
import {
  PhonebookTitle,
  PhonebookInputWrapper,
  PhonebookLabel,
  PhonebookInput,
  AddButton,
} from './ContactForm.styled';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from 'services/contactsApi';

const ContactForm = () => {
  const { data: contacts } = useFetchContactsQuery();
  const [addContact] = useAddContactMutation();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (contacts?.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const user = { name, phone: number };

      addContact(user);
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <PhonebookInputWrapper>
          <PhonebookLabel htmlFor={nameInputId}>
            <PhonebookInput
              name="name"
              type="text"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              placeholder=""
              onChange={handleInputChange}
              id={nameInputId}
            />
            Name
          </PhonebookLabel>
          <PhonebookLabel htmlFor={numberInputId}>
            <PhonebookInput
              name="number"
              type="text"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              placeholder=""
              onChange={handleInputChange}
              id={numberInputId}
            />
            Number
          </PhonebookLabel>
          <AddButton type="submit">Add contact</AddButton>
        </PhonebookInputWrapper>
      </div>
    </form>
  );
};

export default ContactForm;
