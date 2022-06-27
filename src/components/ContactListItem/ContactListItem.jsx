import React from 'react';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

import { useDeleteContactMutation } from '../../redux/contacts/contacts';

import {
  ContactItem,
  WrapperButtonDiv,
  ContactButton,
} from './ContactListItem.styled';

const ContactListItem = ({ id, name, number, onClickEditingContact }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const del = async id => {
    try {
      await deleteContact(id);

      toast.success(`Contact: ${name} - deleted!`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ContactItem key={id}>
        {name}: {number}
        <WrapperButtonDiv>
          <ContactButton
            color="#2196f3"
            type="submit"
            onClick={onClickEditingContact}
          >
            Edit
          </ContactButton>
          <ContactButton
            disabled={isDeleting}
            color="red"
            type="submit"
            onClick={() => del(id)}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </ContactButton>
        </WrapperButtonDiv>
      </ContactItem>
      <ToastContainer />
    </>
  );
};

export default ContactListItem;
