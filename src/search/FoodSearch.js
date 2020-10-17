import React, { useEffect, useContext } from 'react';
import { FoodContext } from './FoodDataProvider';
import { Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import './Search.css'
import { FoodCard } from './FoodCard';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Search } = Input;

export const FoodSearch = (props) => {
    const { food, getFood, isLoading } = useContext(FoodContext)

    useEffect(() => {
    
    }, [])

    return (
        <div className="searchContainer">
            
            <Search
            placeholder="Search food here"
            onSearch={value => 
                getFood(value)}
            allowClear={true}    
            style={{width: 200}}
            />
            <Spin indicator={antIcon} spinning={isLoading}/>
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