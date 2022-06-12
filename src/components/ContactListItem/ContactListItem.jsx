import React from 'react';

import {
  ContactItem,
  WrapperButtonDiv,
  ContactButton,
} from './ContactListItem.styled';

const ContactListItem = ({
  id,
  name,
  number,
  onClickEditingContact,
  onClickDeleteContact,
}) => {
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
            color="red"
            type="submit"
            onClick={onClickDeleteContact}
          >
            Delete
          </ContactButton>
        </WrapperButtonDiv>
      </ContactItem>
    </>
  );
};

export default ContactListItem;
