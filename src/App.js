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
import UserState from './contexts/userCred/UserState';
import RequestForProduct from './components/RequestForProduct';
import MyBookMarks from './components/MyBookMarks';
import Analysis from './components/Analysis';
import ProductAnalysis from './components/Analysis/ProductAnalysis';
import MyProductAnalysis from './components/Analysis/MyProductAnalysis';

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
      <UserState>
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
                    <Route path='/requestForProduct' element={<RequestForProduct />} />
                    <Route path='/myBookMark' element={<MyBookMarks />} />
                    <Route path='/analysis' element={<Analysis />}>
                      <Route path='productAnalysis' element={<ProductAnalysis />} />
                      <Route path='myAnalysis' element={<MyProductAnalysis />} />
                    </Route>
                  </Routes>
                </Layout>
              </Router>
            </ProductState>
          </ModalState>
        </CategoryState>
      </UserState>
    </>
  );
};

export default App;
