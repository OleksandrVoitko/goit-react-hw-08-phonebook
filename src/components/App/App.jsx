import { useState } from 'react';

import { TailSpin } from 'react-loader-spinner';

import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

import Form from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import EditModal from '../EditModal/EditModal';

import { useFetchContactsQuery } from 'redux/contacts/contacts';
import { useCreateContactMutation } from 'redux/contacts/contacts';

import { Wrapper } from './App.styled';

export default function App() {
  const [filterContacts, setFilterContacts] = useState('');
  const [editContact, setEditContact] = useState({
    isEditing: false,
    id: '',
    name: '',
    number: '',
  });

  const { data, isFetching } = useFetchContactsQuery();
  const [createContact, { isLoading }] = useCreateContactMutation();

  const SAVE = 'Save';
  const ADD = 'Add contact';

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
      return toast.warn(`Contact: ${newContact.name} - already in contacts!`);
    }
    try {
      await createContact(newContact);
      toast.success(`Contact: ${name} - added!`);
    } catch (error) {
      toast.error(error);
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
    setEditContact({ isEditing: true, id, name, number });
  };

  const resetEditingState = () => {
    setEditContact({ isEditing: false, id: '', name: '', number: '' });
  };

  return (
    <Wrapper>
      <h2>Phone book</h2>
      <EditModal isEditing={editContact.isEditing} reset={resetEditingState}>
        <Form
          onSubmit={formSubmitHandler}
          textButton={SAVE}
          isLoadingNow={isLoading}
          resetEditingState={resetEditingState}
          editId={editContact.id}
          editingName={editContact.name}
          editingNumber={editContact.number}
        />
      </EditModal>
      <Form
        onSubmit={formSubmitHandler}
        textButton={ADD}
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
