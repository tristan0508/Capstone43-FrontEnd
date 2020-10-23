import React, { useState, createContext } from 'react'

export const FoodDatabaseContext = createContext()
let foodLog = JSON.parse(sessionStorage.getItem("foodLog"))

export const FoodDatabaseProvider = (props) => {
    const [meals, setMeals] = useState([])
    const [dbFoodItem, setDbFoodItem] = useState(foodLog? foodLog : [])
    let [foodItem, setFoodItem] = useState(sessionStorage.getItem('foodLog'))
    const [panelSwitch, setPanelSwitch] = useState('1')
    


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
            let panel = parseInt(panelSwitch)

            let panelType;
            switch (panel) {
                case 1:
                panelType = 'breakfast';
                break;
                case 2:
                panelType = 'lunch';
                break;
                case 3:
                panelType = 'dinner';
                break;
                case 4:
                panelType = 'snack';
                break;
                default:
                panelType = 'breakfast';
                break;
            }
            if(dbFoodItem.length !== 0){
                   let type = incomingItem.map(food => ({...food, type: panelType}))
                   let fooditems = [...type, ...dbFoodItem]
                    setDbFoodItem(fooditems)
                   
                
         
            } else {
                let foodItem = incomingItem.map(food => ({...food, type: panelType}))
                setDbFoodItem(foodItem)
            }
        })
    }


    return (
        <FoodDatabaseContext.Provider value={{
             meals, getMeals, dbFoodItem, getDbFoodItem, setDbFoodItem, foodItem, setFoodItem,
             panelSwitch, setPanelSwitch
        }}>
            {props.children}
        </FoodDatabaseContext.Provider>
    )
}