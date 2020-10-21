import React, { useState, createContext } from 'react'

export const FoodDatabaseContext = createContext()

export const FoodDatabaseProvider = (props) => {

    const[meals, setMeals] = useState([])



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
    return (
        <FoodDatabaseContext.Provider value={{
             meals, getMeals
        }}>
            {props.children}
        </FoodDatabaseContext.Provider>
    )
}