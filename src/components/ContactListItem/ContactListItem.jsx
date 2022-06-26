import React from 'react';
import { useDeleteContactMutation } from '../../redux/contacts/contacts';

import {
  ContactItem,
  WrapperButtonDiv,
  ContactButton,
} from './ContactListItem.styled';

const ContactListItem = ({ id, name, number, onClickEditingContact }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

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
            onClick={() => deleteContact(id)}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </ContactButton>
        </WrapperButtonDiv>
      </ContactItem>
    </>
  );
};

export default ContactListItem;
