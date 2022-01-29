import React, { useState } from 'react';
import HeadBar from './components/HeadBar';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductState from './contexts/products/ProductState';
import CategoryState from './contexts/categories/CategoryState';
import Home from './components/Home';
import MyProduct from './components/MyProduct';
import PostProduct from './components/PostProduct';
import ModalState from './contexts/modalOpener/ModalState';

const App = () => {
  const [open, setOpen] = useState(false);
  const ToggleBar = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <CategoryState>
        <ModalState>
          <ProductState>
            <Router>
              <HeadBar ToggleBar={ToggleBar} />
              <Layout open={open}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/myProduct' element={<MyProduct />} />
                  <Route path='/postProduct' element={<PostProduct />} />
                </Routes>
              </Layout>
            </Router>
          </ProductState>
        </ModalState>
      </CategoryState>
    </>
  );
};

export default App;
