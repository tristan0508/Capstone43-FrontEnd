import React, { useContext, useEffect } from 'react'
import { Card, Space, Popover } from 'antd'
import { FoodContext } from './FoodDataProvider'
import { FoodDatabaseContext } from '../FoodLog/FoodDatabaseProvider'
import { BarsOutlined } from '@ant-design/icons';
import './Search.css'

export const FoodSaved = (props) => {
    const { deleteFoodItem } = useContext(FoodContext)
    const { dbFoodItem, getDbFoodItem, panelSwitch } = useContext(FoodDatabaseContext)


useEffect(() => {
    

}, [dbFoodItem, panelSwitch]) 

  const add = (event) => {
      let foodId = dbFoodItem.map(food => food.apiId)
      let isFound = foodId.find(b => b === event)
         
        getDbFoodItem(event)
  }

  const remove = (id) => {
      let itemId = parseInt(id)
      console.log(itemId)
      deleteFoodItem(itemId)
  }

    return (
        <>
            <Space direction="vertical">
                <Card className="savedCard"size="small" 
                title={<img className="foodImage" src={props.image} alt="food" />} 
                extra={<Popover className="popOver" content={
                    <div className="popOverContent">
                        <p onClick={add.bind(this, props.apiId)}>Add</p>
                        <p onClick={remove.bind(this, props.id)}>Delete</p>
                    </div>
                }trigger="click">
                            <BarsOutlined className="addFoodIcon"style={{fontSize: 20, color: '#4285F4'}}/>
                       </Popover>}
                 style={{ width: 110 }}>
                    <p>{props.name}</p>
                    <p>Calories: {props.calories}</p>
                </Card>
            </Space>
        </>
    )
}