import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editing } from 'redux/edit/slice';
import { resetEditState } from 'redux/edit/slice';

import { editContact } from 'redux/items/slice';
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
  editingName = '',
  editingNumber = '',
}) {
  const eID = useSelector(state => state.edit.editingID);
  const dispatch = useDispatch();
  
  const [name, setName] = useState(editingName);
  const [number, setNumber] = useState(editingNumber);

  const editingContact = {
    id: eID,
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

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (textButton === 'Save') {
      dispatch(editing(false));
      dispatch(editContact(editingContact));
      reset();
      dispatch(resetEditState());
    } else {
      onSubmit(name, number);
      reset();
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
      <Button type="submit">{textButton}</Button>
    </FormWrapper>
  );
}
