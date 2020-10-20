import React from 'react'
import './FoodLog.css'
import { Card, Space } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons';

export const FoodSaved = (props) => {

  const addFood = (event) => {
      console.log(event)
  }
    return (
        <>
            <Space direction="vertical">
                <Card className="savedCard"size="small" 
                title={<img className="foodImage" src={props.image} alt="food" />} 
                extra={<PlusCircleTwoTone onClick={addFood.bind(this, props.id)} className="addFoodIcon"style={{fontSize: 20, color: '#4285F4'}}/>}
                 style={{ width: 110 }}>
                    <p>{props.name}</p>
                    <p>Calories: {props.calories}</p>
                </Card>
            </Space>
        </>
    )
}