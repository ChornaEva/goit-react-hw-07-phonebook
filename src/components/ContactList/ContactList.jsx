import React from 'react';
import PropTypes from 'prop-types';
import {
  UsersContactList,
  ContactListItem,
  UserName,
  UserNumber,
  ContactListButton,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'components/redux/contactsSlice';
import { getContacts, getFilter } from 'components/redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const deleteUser = userId => {
    dispatch(deleteContact(userId));
  };
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div>
      <UsersContactList>
        {filteredContacts?.map(contact => (
          <ContactListItem key={contact.id}>
            <UserName>{contact.name}</UserName>
            <UserNumber>{contact.number}</UserNumber>
            <ContactListButton onClick={() => deleteUser(contact.id)}>
              Delete
            </ContactListButton>
          </ContactListItem>
        ))}
      </UsersContactList>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
export default ContactList;
