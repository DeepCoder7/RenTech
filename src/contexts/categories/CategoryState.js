import React, { useState } from 'react'
import CategoryContext from './categoryContext';

const CategoryState = (props) => {
    const [category, setCategory] = useState('Computer');
    const [search, setSearch] = useState('');
    const [filterValue, setFilterValue] = useState({ location: '', maxPrice: 10000000, count: 1, status: false })
    return (
        <CategoryContext.Provider value={{ category, setCategory, search, setSearch, filterValue, setFilterValue }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryState;