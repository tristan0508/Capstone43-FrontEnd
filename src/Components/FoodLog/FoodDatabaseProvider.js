import React, { useState, createContext } from 'react'

export const FoodDatabaseContext = createContext()
let foodLog = JSON.parse(sessionStorage.getItem("foodLog"))
let source = JSON.parse(sessionStorage.getItem("foodSource"))

export const FoodDatabaseProvider = (props) => {
    const [meals, setMeals] = useState([])
    const [dbFoodItem, setDbFoodItem] = useState(foodLog? foodLog : [])
    let [foodItem, setFoodItem] = useState(sessionStorage.getItem('foodLog'))
    const [panelSwitch, setPanelSwitch] = useState('breakfast')
    let [panelType, setPanelType] = useState('')
    const [foodSource, setFoodSource] = useState(source? source : [])
    


    const getMeals = () => {
        return fetch("http://localhost:8088/meals/")
        .then(res => res.json())
        .then(res => {
            return res[0]
        })
        .then(res => {
            if(res !== undefined){
                return res.food
            } else {
                return res
            }
        })
        .then(setMeals)
    }

    const getDbFoodItem = apiId => {
        return fetch(`http://localhost:8080/foodItems/?apiId=${apiId}`)
        .then(res => res.json())
        .then(res => {
            let incomingItem = [...res]
          

            if(dbFoodItem.length !== 0){
                   let type = incomingItem.map(food => ({...food, type: panelSwitch}))
                   let fooditems = [...type, ...dbFoodItem]
                    setDbFoodItem(fooditems)
                   let sourceOfFood = [...type, ...foodSource] 
                   setFoodSource(sourceOfFood)
                    
            } else {
                let foodItem = incomingItem.map(food => ({...food, type: panelSwitch}))
                setDbFoodItem(foodItem)
                setFoodSource(foodItem)
                
            }
        })
    }


    return (
        <FoodDatabaseContext.Provider value={{
             meals, getMeals, dbFoodItem, getDbFoodItem, setDbFoodItem, foodItem, setFoodItem,
             panelSwitch, setPanelSwitch, panelType, setPanelType, foodSource
        }}>
            {props.children}
        </FoodDatabaseContext.Provider>
    )
}