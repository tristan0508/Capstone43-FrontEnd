import React, { useContext, useEffect } from 'react'
import { Card, Space, Popover } from 'antd'
import { FoodContext } from './FoodDataProvider'
import { FoodDatabaseContext } from '../FoodLog/FoodDatabaseProvider'
import { BarsOutlined } from '@ant-design/icons';
import './Search.css'

export const FoodSaved = (props) => {
    const { deleteFoodItem, isLog } = useContext(FoodContext)
    const { dbFoodItem, getDbFoodItem, panelSwitch, getFoodLog, setMealId, getMeals,
    newMeal, logName } = useContext(FoodDatabaseContext)

    let date = new Date(Date.now()).toLocaleDateString([], {year: '2-digit', month:'2-digit', day:'2-digit'})

useEffect(() => {
    

}, [dbFoodItem, panelSwitch]) 

  const add = (event) => {
    if(isLog === true){
        getDbFoodItem(event)
    } else {
        window.alert("Create New Log")
    }
    if(logName? true : false){
    getFoodLog(date)
        .then(res => {
            let id = res.map(r => r.id)
            
            setMealId(id? id : '')
            getMeals(id)
            .then(res => {
                let foodId = res.map(res => res.foodLogId)
           
                if(id[0] !== foodId[0]){
                    newMeal(
                        {
                            userId: parseInt(localStorage.getItem("userId")),
                            foodLogId: id[0],
                            date
                        }
                    )
                }  
             })
        })
    }

    
  }



  const remove = (id) => {
      let itemId = parseInt(id)
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