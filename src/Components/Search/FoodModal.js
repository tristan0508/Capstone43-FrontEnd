import React, { useEffect, useContext } from 'react';
import { FoodContext } from './FoodDataProvider';
import { Modal, Table } from 'antd'
import { url } from './FoodCard'

import './Search.css'


 const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      responsive: ['sm'],
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
      responsive: ['sm'],   
    },
    { 
      title: 'Unit',
      dataIndex: 'Unit',
      key: 'Unit',
      responsive: ['sm'],
    },
    {
      title: 'DailyValue',
      dataIndex: 'DailyValue',
      key: 'DailyValue',
      responsive: ['sm'],
    },
];

export const FoodModal = (props) => {
    const { visible, setVisible, nutrition, foodName, addFood, doesItemExist } = useContext(FoodContext)
    let image = <img className="modalImage"src={url + foodName.image} alt="food" />

   useEffect(() => {
   
   }, [nutrition])

   const isVisible = () => {
       if(visible === true){
           setVisible(false)
       }
   }

   const addFoodItem = async() => {
    let amount = nutrition.map(b => {
        return b.amount
    })
    let foodExist = doesItemExist.filter(food => food.name === foodName.name)
    if(foodExist.length === 0){
      addFood({
                apiId: foodName.id,
                userId: parseInt(localStorage.getItem("userId")),
                name: foodName.name,
                image:  `https://spoonacular.com/cdn/ingredients_100x100/${foodName.image}`,
                calories: amount[0],
                fat: amount[1],
                saturatedFat: amount[2],
                carbohydrates: amount[3],
                netCarbohydrates: amount[4],
                sugar: amount[5],
                cholesterol: amount[6],
                sodium: amount[7],
                protein: amount[8],
                quantity: 1
            })
          } else {
            window.alert("Item Already Exists")
          }
            setVisible(false)   
    }
       

    return (
        <>
        <Modal
          title={image}
          visible={visible}
          onOk={addFoodItem}
          onCancel={isVisible}
          okText="Add"
          cancelText="Return"
        >
        <Table className="nutritionTable" columns={columns}
        pagination={false} 
        dataSource={nutrition.map(a => {
            return {
                key: a.title,
                Title: a.title,
                Amount: a.amount,
                Unit: a.unit,
                DailyValue: a.percentOfDailyNeeds + '%',
              }
        })}/>
        </Modal>

        </>
    )
}