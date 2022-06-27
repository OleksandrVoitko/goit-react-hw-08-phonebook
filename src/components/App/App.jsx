import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

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
import { useCreateContactMutation } from 'redux/contacts/contacts';

import { Wrapper } from './App.styled';

export default function App() {
  const [filterContacts, setFilterContacts] = useState('');

  const { data, isFetching } = useFetchContactsQuery();
  const [createContact, { isLoading }] = useCreateContactMutation();

  const save = 'Save';
  const add = 'Add contact';

  const editingName = useSelector(state => state.edit.editingName);
  const editingNumber = useSelector(state => state.edit.editingNumber);

  const dispatch = useDispatch();

  const formSubmitHandler = async (name, number) => {
    const newContact = {
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

    try {
      await createContact(newContact);
    } catch (error) {
      console.log(error);
    }
  };

  const filterHandler = e => {
    setFilterContacts(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return data.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(filterContacts.toLocaleLowerCase())
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
          isLoadingNow={isLoading}
          editingName={editingName}
          editingNumber={editingNumber}
        />
      </EditModal>
      <Form
        onSubmit={formSubmitHandler}
        textButton={add}
        isLoadingNow={isLoading}
      />
      <h2>Contacts</h2>
      <Filter value={filterContacts} onChange={filterHandler} />
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
