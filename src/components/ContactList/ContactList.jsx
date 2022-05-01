import React from 'react';
import PropTypes from 'prop-types';
import {
  useDeleteContactMutation,
  useFetchContactsQuery,
} from 'services/contactsApi';
import {
  UsersContactList,
  ContactListItem,
  UserName,
  UserNumber,
  ContactListButton,
} from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { TailSpin } from 'react-loader-spinner';

const ContactList = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(getFilter);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div>
      {isFetching && <TailSpin color="#00BFFF" />}
      <UsersContactList>
        {filteredContacts?.map(contact => (
          <ContactListItem key={contact.id}>
            <UserName>{contact.name}</UserName>
            <UserNumber>{contact.phone}</UserNumber>
            <ContactListButton onClick={() => deleteContact(contact.id)}>
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
