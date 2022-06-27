import React from 'react';

import cl from './EditModal.module.css';

const EditModal = ({ isEditing, reset, children }) => {
  const rootClasses = [cl.editModal];
  if (isEditing) {
    rootClasses.push(cl.active);
  }

  const closeModal = () => {
    reset();
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
