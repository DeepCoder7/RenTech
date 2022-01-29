import React, { useState } from 'react';
import ModalContext from './modalContext';

const ModalState = (props) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isSignUpOpen, setIsSignUpOpen, isLoginOpen, setIsLoginOpen }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
