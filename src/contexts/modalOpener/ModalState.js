import React, { useState } from 'react';
import ModalContext from './modalContext';

const ModalState = (props) => {
  // For SignUp Modal
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  // For Login Modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // For Report Modal
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isSignUpOpen, setIsSignUpOpen, isLoginOpen, setIsLoginOpen, isReportOpen, setIsReportOpen }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
