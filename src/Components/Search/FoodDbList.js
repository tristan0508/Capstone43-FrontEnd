import React, { useEffect, useContext, useState, useRef } from 'react';
import { FoodContext } from './FoodDataProvider';
import { FoodSaved } from './FoodSaved'
import { Input, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const { Search } = Input;


export const FoodDbList = (props) => {
    const { foodDatabase, getFoodDatabase, searchTerms, setSearchTerms } = useContext(FoodContext)
    const [ filteredFood, setFiltered ] = useState([])

    const check = useRef()
    let user = JSON.parse(localStorage.getItem("userId"))

useEffect(() => {
   getFoodDatabase()

}, [user, getFoodDatabase])


useEffect(() => {
        if (searchTerms !== "") {
            const subset = foodDatabase.filter(food => food.name.toLowerCase().includes(searchTerms.toLowerCase().trim()))
            setFiltered(subset)
        } else {
            setFiltered(foodDatabase)
        }
}, [searchTerms, foodDatabase])

const checked = (event) => {
        if(event === false){
        check.current.className = 'foodDbCardsHidden'
        } else {
        check.current.className = 'foodDbCards'
    }
}

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
            <Switch className="switchVisible" defaultChecked onChange={checked}/>
        
             
                {
                    
                <div ref={check} className="foodDbCards">
                    {filteredFood.map(food => {
                    return <FoodSaved key={food.id} name={food.name} calories={food.calories} image={food.image}
                    id={food.id} apiId={food.apiId}/>
                    })}
                </div>

                }
        </div>
        </>
    )
}