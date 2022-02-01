import React, { useState } from 'react';
import ModalContext from './modalContext';

const ModalState = (props) => {

  // For SignUp Modal
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  // For Login Modal
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
