import React, { useState } from 'react'
import CategoryContext from './categoryContext';

const CategoryState = (props) =>{
    const [category, setCategory] = useState('Computer');
    const [search, setSearch] = useState('');
    return (
        <CategoryContext.Provider value={{ category, setCategory, search, setSearch }}> 
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryState;