import './App.css';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import { FormContainer, ContactsTitle } from './App.styled';

const App = () => {
  return (
    <>
      <FormContainer>
        <ContactForm />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        <ContactList />
      </FormContainer>
    </>
  );
};

export default App;
