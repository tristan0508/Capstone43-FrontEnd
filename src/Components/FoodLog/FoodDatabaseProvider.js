import React, { useState, createContext } from 'react'

export const FoodDatabaseContext = createContext()

let foodLog = JSON.parse(sessionStorage.getItem("foodLog"))
let source = JSON.parse(sessionStorage.getItem("foodSource"))
let nameLog = JSON.parse(sessionStorage.getItem("logName"))
let calories = JSON.parse(sessionStorage.getItem("calories"))
let currentCal = JSON.parse(sessionStorage.getItem("calorieTotal"))
let currentMeal = JSON.parse(sessionStorage.getItem("mealId"))


export const FoodDatabaseProvider = (props) => {
    const [dbFoodItem, setDbFoodItem] = useState(foodLog? foodLog : [])
    let [foodItem, setFoodItem] = useState(sessionStorage.getItem('foodLog'))
    const [panelSwitch, setPanelSwitch] = useState('breakfast')
    let [panelType, setPanelType] = useState('')
    const [foodSource, setFoodSource] = useState(source? source : [])
    const [showing, setShowing] = useState(false)
    const [logName, setLogName] = useState(nameLog? nameLog : '')
    const [calorie, setCalorie] = useState(calories? calories : 0)
    const [currentCalories, setCurrentCalories] = useState(currentCal? currentCal : 0)
    const [mealId, setMealId] = useState(currentMeal? currentMeal : '')
    const [protein, setProtein] = useState(0)
    const [carb, setCarb] = useState(0)
    const [fat, setFat] = useState(0)
    


    const getMeals = logId => {
        return fetch(`http://localhost:8080/meals/?foodLogId=${logId}`)
        .then(res => res.json())
    }

    const newMeal = obj => {
        fetch("http://localhost:8080/meals", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }

    const getDbFoodItem = apiId => {
        return fetch(`http://localhost:8080/foodItems/?userId=${parseInt(localStorage.getItem("userId"))}&apiId=${apiId}`)
        .then(res => res.json())
        .then(res => {
            let incomingItem = [...res]
          

            if(dbFoodItem.length !== 0){
                   let type = incomingItem.map(food => ({...food, type: panelSwitch}))
                   let fooditems = [...type, ...dbFoodItem]
                    setDbFoodItem(fooditems)
                  
            } else {
                let foodItem = incomingItem.map(food => ({...food, type: panelSwitch}))
                setDbFoodItem(foodItem)
                
            }
        })
    }

    const getFoodSource = () => {
        return fetch(`http://localhost:8080/foodItems/?userId=${parseInt(localStorage.getItem("userId"))}`)
        .then(res => res.json())
        .then(res => {
            let response = res.filter(food => food.apiId? true : false)
            setFoodSource(response)
        })
    }

    const newFoodLog = obj => {
        fetch("http://localhost:8080/foodLogs", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }

    const getFoodLog = date => {
        return fetch(`http://localhost:8080/foodLogs/?userId=${parseInt(localStorage.getItem("userId"))}&date=${date}`)
        .then(res => res.json())
    }

    const deleteFoodLog = id => {
        fetch(`http://localhost:8080/foodLogs/${id}`, {
            method: 'DELETE'
        })
    }

    const deleteMeal = mealId => {
        fetch(`http://localhost:8080/meals/${mealId}`, {
            method: 'DELETE'
        })
    }

    const returnMeals = id => {
        return fetch(`http://localhost:8080/foodItems/?mealId=${id}`)
        .then(res => res.json())
    }

    const updateFoodLog = (id, obj) => {
        fetch(`http://localhost:8080/foodItems/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }

    const deleteLogItem = id => {
        fetch(`http://localhost:8080/foodItems/${id}`, {
            method: 'DELETE'
        })
    }

    return (
        <FoodDatabaseContext.Provider value={{
             getMeals, dbFoodItem, getDbFoodItem, setDbFoodItem, foodItem, setFoodItem,
             panelSwitch, setPanelSwitch, panelType, setPanelType, foodSource, newFoodLog,
             showing, setShowing, logName, setLogName, calorie, setCalorie, currentCalories,
             setCurrentCalories, newMeal, getFoodLog, mealId, setMealId, deleteFoodLog, deleteMeal,
             returnMeals, getFoodSource, updateFoodLog, deleteLogItem, protein, setProtein, carb, setCarb,
             fat, setFat
        }}>
            {props.children}
        </FoodDatabaseContext.Provider>
    )
}