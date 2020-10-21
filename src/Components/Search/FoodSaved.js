import React, { useContext } from 'react'
import { Card, Space, Popover } from 'antd'
import { FoodContext } from './FoodDataProvider'
import { BarsOutlined } from '@ant-design/icons';
import './Search.css'

export const FoodSaved = (props) => {
    const { deleteFoodItem } = useContext(FoodContext)

  const add = (event) => {
      console.log(event)
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
                        <p onClick={add.bind(this, props.id)}>Add</p>
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