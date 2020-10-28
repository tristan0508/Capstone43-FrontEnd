import React, { useContext } from 'react';
import { FoodContext } from './FoodDataProvider';
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './Search.css'
import { FoodCard } from './FoodCard';



const { Search } = Input;

export const FoodSearch = (props) => {
    const { food, getFood, isLoading } = useContext(FoodContext)



    return (
        <div  className="searchContainer">
            <h4>Food Lookup</h4>
            <Search
            className="searchInput"
            loading={isLoading}
            enterButton={<SearchOutlined />}
            placeholder="Search food here"
            onSearch={value => 
                getFood(value)
            }
            allowClear={true}    
            style={{width: 250}}
            />
            
                {
                    <div className="foodCardContainer">
                    {food.map(food => {
                        return <FoodCard key={food.name} name={food.name} image={food.image} id={food.name}/>
                    })}
                </div>
                }
            
        </div>
    )
}