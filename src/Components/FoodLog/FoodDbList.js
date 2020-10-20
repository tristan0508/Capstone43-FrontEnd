import React, { useEffect, useContext, useState } from 'react';
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { FoodSaved } from './FoodSaved'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export const FoodDbList = (props) => {
    const { foodDatabase, getFoodDatabase } = useContext(FoodDatabaseContext)
    const onSearch = value => console.log(value);

    useEffect(() => {
        getFoodDatabase()
    
    }, [])

    useEffect(() => {
        
    
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