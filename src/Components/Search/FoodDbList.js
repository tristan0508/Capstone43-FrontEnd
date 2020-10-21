import React, { useEffect, useContext, useState, createContext } from 'react';
import { FoodContext } from './FoodDataProvider';
import { FoodSaved } from './FoodSaved'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const { Search } = Input;


export const FoodDbList = (props) => {
    const { foodDatabase, getFoodDatabase, item, getItem, addFood } = useContext(FoodContext)
    const onSearch = value => console.log(value);

useEffect(() => {
    getFoodDatabase()

}, [getFoodDatabase])





    return (
       <> 
        <div className="dbSearchContainer">
            <h4>Search Food Saved</h4>
            <Search className="foodDbSearch" placeholder="input search text"
             onSearch={onSearch}
            style={{ width: 250 }}
            enterButton={<SearchOutlined />}
            allowClear={true} />
        
        
                {
                    
                <div className="foodDbCards">
                    {foodDatabase.map(food => {
                    return <FoodSaved key={food.id} name={food.name} calories={food.calories} image={food.image}
                    id={food.id}/>
                    })}
                </div>
                }
        </div>
        </>
    )
}