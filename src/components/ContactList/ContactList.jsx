import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import { ContactsUl } from './ContactList.styled';

const ContactList = ({ contacts, editingContact, deleteContact }) => {
  return (
    <ContactsUl>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onClickEditingContact={() => editingContact(id, name, number)}
          onClickDeleteContact={() => deleteContact(id)}
        ></ContactListItem>
      ))}
    </ContactsUl>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
