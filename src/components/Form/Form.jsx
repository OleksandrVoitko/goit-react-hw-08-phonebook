import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

import { useUpdateContactMutation } from 'redux/contacts/contacts';

import {
  FormWrapper,
  Label,
  InputName,
  InputNumber,
  Button,
} from './Form.styled';

export default function Form({
  onSubmit,
  textButton,
  isLoadingNow,
  resetEditingState = '',
  editId = '',
  editingName = '',
  editingNumber = '',
}) {
  const [updateContact] = useUpdateContactMutation();

  const [name, setName] = useState(editingName);
  const [number, setNumber] = useState(editingNumber);

  const editingContact = {
    id: editId,
    name,
    number,
  };

  useEffect(() => {
    setName(editingName);
    setNumber(editingNumber);
  }, [editingName, editingNumber]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const resetState = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (textButton === 'Save') {
      try {
        await updateContact(editingContact);
        toast.success(`Contact: ${name} - edited!`);
        resetEditingState();
      } catch (error) {
        toast.error(error);
      }
    } else {
      onSubmit(name, number);
      resetState();
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label>
        Name
        <InputName
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <InputNumber
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </Label>
      <Button type="submit" disabled={isLoadingNow}>
        {isLoadingNow ? textButton + '...' : textButton}
      </Button>
    </FormWrapper>
  );
}
