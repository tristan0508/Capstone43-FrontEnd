import React, { useEffect, useContext, useState } from 'react';
import { FoodContext } from './FoodDataProvider';
import { FoodSaved } from './FoodSaved'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const { Search } = Input;


export const FoodDbList = (props) => {
    const { foodDatabase, getFoodDatabase, searchTerms, setSearchTerms } = useContext(FoodContext)
    const [ filteredFood, setFiltered ] = useState([])
    

useEffect(() => {
    getFoodDatabase()

}, [getFoodDatabase])


useEffect(() => {
        if (searchTerms !== "") {
            const subset = foodDatabase.filter(food => food.name.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFiltered(subset)
        } else {
            setFiltered(foodDatabase)
        }
}, [searchTerms, foodDatabase])


    return (
       <> 
        <div className="dbSearchContainer">
            <h4>Search Food Saved</h4>
            <Search className="foodDbSearch" placeholder="input search text"
             onKeyUp={
                 (keyEvent) => setSearchTerms(keyEvent.target.value)
             }
            style={{ width: 250 }}
            enterButton={<SearchOutlined />}
            allowClear={true} />
        
        
                {
                    
                <div className="foodDbCards">
                    {filteredFood.map(food => {
                    return <FoodSaved key={food.id} name={food.name} calories={food.calories} image={food.image}
                    id={food.id}/>
                    })}
                </div>
                }
        </div>
        </>
    )
}