import React, { useContext } from 'react';
import { Modal, Input } from 'antd'
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { FoodContext } from '../Search/FoodDataProvider';


export const NewLogModal = () => {
    const { showing, setShowing, newFoodLog, logName, setLogName, calorie, setCalorie,
    currentCalories, setCurrentCalories, getFoodLog, setMealId,
    mealId, returnMeals, setDbFoodItem} = useContext(FoodDatabaseContext)
    const { setIsLog } = useContext(FoodContext)

    let date = new Date(Date.now()).toLocaleDateString([], {year: '2-digit', month:'2-digit', day:'2-digit'})

    sessionStorage.setItem("logName", JSON.stringify(logName))
    sessionStorage.setItem("calories", JSON.stringify(calorie))
    sessionStorage.setItem("mealId", JSON.stringify(mealId))
 

    const showModal = () => {
        if(showing === false){
            setShowing(true)
        } else {
            setShowing(false)
        }
       }

 
    const create = () => {
        getFoodLog(date)
        .then(res => {
            let response = res.filter(res => res.date === date)
            return response
        })
        .then(res => {
            if(res.length !== 0){
                window.alert("Daily Log Already Exists!")
                setShowing(false)
                res.map(value => {
                    setLogName(value.name)
                    setCalorie(value.calorieStart)
                    setCurrentCalories(value.currentCalories)
                    setMealId(value.id)
                    returnMeals(value.id)
                    .then(res => {
                        setDbFoodItem(res)
                    })
                    setIsLog(true)

                    return null
                })
            } else {
                newFoodLog(
                    {
                        userId: 1,
                        name: logName,
                        calorieStart: parseInt(calorie),
                        currentCalories: currentCalories,
                        date
                    }
                )
                setIsLog(true)
                setShowing(false)
            }
        })
    
}

    return (
            <>
            <Modal
            onOk={create}
            title="New Food Log"
            okText="Create"
            visible={showing}
            onCancel={showModal}
            
            >
            <h4>Title</h4>
            <Input placeholder="name of log..." onChange={e => setLogName(e.target.value)} value={logName}/>
            <h4>Calories</h4>
            <Input placeholder="target amount..." onChange={e => setCalorie(e.target.value)} value={calorie}/>
         
            </Modal>
        </>
    )
}
