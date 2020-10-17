import React, { useEffect, useContext } from 'react';
import { FoodContext } from './FoodDataProvider';
import { Modal, Table } from 'antd'
import { columns, data } from './FoodNutritionCard'
import { url } from './FoodCard'
import './Search.css'

export const FoodModal = (props) => {
    const { visible, setVisible, nutrition, foodName } = useContext(FoodContext)
    let foodImage = <img className="modalImage"src={url + foodName.image} alt="food" />

   useEffect(() => {
  
   }, [nutrition])

   const isVisible = () => {
       if(visible === true){
           setVisible(false)
       }
   }


    return (
        <>
        <Modal
          title={foodImage}
          visible={visible}
          onOk={isVisible}
          onCancel={isVisible}
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