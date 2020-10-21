import React from 'react'
import { Card, Space, Popover } from 'antd'
import { BarsOutlined } from '@ant-design/icons';
import './Search.css'

export const FoodSaved = (props) => {

  const add = (event) => {
      console.log(event)
  }
    return (
        <>
            <Space direction="vertical">
                <Card className="savedCard"size="small" 
                title={<img className="foodImage" src={props.image} alt="food" />} 
                extra={<Popover className="popOver" content={
                    <div>
                        <p>Add</p>
                        <p>Delete</p>
                    </div>
                }trigger="click">
                            <BarsOutlined onClick={add.bind(this, props.id)} className="addFoodIcon"style={{fontSize: 20, color: '#4285F4'}}/>
                       </Popover>}
                 style={{ width: 110 }}>
                    <p>{props.name}</p>
                    <p>Calories: {props.calories}</p>
                </Card>
            </Space>
        </>
    )
}