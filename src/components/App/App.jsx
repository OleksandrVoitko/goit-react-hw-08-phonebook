import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { TailSpin } from 'react-loader-spinner';

import Form from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import EditModal from '../EditModal/EditModal';

import { editing } from 'redux/edit/slice';
import { setEditingID } from 'redux/edit/slice';
import { setEditingName } from 'redux/edit/slice';
import { setEditingNumber } from 'redux/edit/slice';

import { useFetchContactsQuery } from 'redux/contacts/contacts';

import { addContact, delContact } from 'redux/items/slice';
import { addFilter } from 'redux/filter/slice';
import { Wrapper } from './App.styled';

export default function App() {
  const save = 'Save';
  const add = 'Add contact';

  const { data, isFetching } = useFetchContactsQuery();

  const filter = useSelector(state => state.filter);

  const editingName = useSelector(state => state.edit.editingName);
  const editingNumber = useSelector(state => state.edit.editingNumber);

  const dispatch = useDispatch();

  const formSubmitHandler = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      data.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    dispatch(addContact(newContact));
  };

  const filterHandler = e => {
    dispatch(addFilter(e.currentTarget.value));
  };

  const getFilteredContacts = () => {
    return data.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const editingContact = (id, name, number) => {
    dispatch(editing(true));
    dispatch(setEditingID(id));
    dispatch(setEditingName(name));
    dispatch(setEditingNumber(number));
  };

  return (
    <Wrapper>
      <h2>Phone book</h2>
      <EditModal>
        <Form
          onSubmit={formSubmitHandler}
          textButton={save}
          editingName={editingName}
          editingNumber={editingNumber}
        />
      </EditModal>
      <Form onSubmit={formSubmitHandler} textButton={add} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterHandler} />
      {isFetching && <TailSpin color="#2196f3" height={80} width={80} />}
      {data && (
        <ContactList
          contacts={getFilteredContacts()}
          editingContact={editingContact}
        />
      )}
    </Wrapper>
  );
}
