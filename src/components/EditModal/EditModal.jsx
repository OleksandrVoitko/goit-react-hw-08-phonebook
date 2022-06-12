import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resetEditState } from 'redux/edit/slice';
import { editing, getIsEditing } from 'redux/edit/slice';

import cl from './EditModal.module.css';

const EditModal = ({ children }) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(getIsEditing);

  const rootClasses = [cl.editModal];
  if (isEditing) {
    rootClasses.push(cl.active);
  }

  const closeModal = () => {
    dispatch(editing(false));
    dispatch(resetEditState());
  };

  return (
    <div
      className={rootClasses.join(' ')}
      onClick={() => {
        closeModal();
      }}
    >
      <div className={cl.editModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default EditModal;
