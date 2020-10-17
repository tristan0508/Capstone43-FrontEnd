import React, { useContext, useEffect } from 'react'
import { FoodContext } from './FoodDataProvider'
import { Card} from 'antd'
import './Search.css'
import { SearchOutlined } from '@ant-design/icons'

export const url = "https://spoonacular.com/cdn/ingredients_100x100/"

export const FoodCard = (props) => {
    const{ setVisible, nutrition, getNutrition } = useContext(FoodContext)
    
    
useEffect(() => {
   
}, [])

    const showModal = async(event) => {
        let parsedFood = JSON.stringify(event.currentTarget.id)
        await getNutrition(parsedFood)
        if(nutrition !== []){
        setVisible(true)
    }
}


    return (
        <Card className="foodCard" title={props.name} extra={<SearchOutlined onClick={showModal} id={props.id}className="foodCardIcon"
         style={{ fontSize: '20px', color: '#4285F4' }}/>} style={{width: 180}}>

            <img className="foodImage" src={url + props.image} alt="food" />

        </Card>
    )
}