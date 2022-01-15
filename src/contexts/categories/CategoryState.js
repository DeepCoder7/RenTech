import React, { useState } from 'react'
import CategoryContext from './categoryContext';

const CategoryState = (props) =>{
    const [category, setCategory] = useState('Computer');
    return (
        <CategoryContext.Provider value={{ category, setCategory }}> 
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryState;