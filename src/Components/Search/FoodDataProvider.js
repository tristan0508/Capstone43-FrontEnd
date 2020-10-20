import React, { useState, createContext } from 'react'
import { key } from '../../Settings';

const apiKey = key.apiKey

export const FoodContext = createContext();

export const FoodDataProvider = (props) => {
    const [food, setFood] = useState([])
    const [nutrition, setNutrition] = useState([])
    const [foodName, setFoodName] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [addToDb, setAddToDb] = useState([])
    

    const getFood = (input) => {
        setIsLoading(true)
        return fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&number=5&query=${input}`)
        .then(res => res.json())
        .then(setFood)
        .then(() => {setIsLoading(false)})
    }

    const getNutrition = (food) => {
        fetch(`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}&ingredientList=${food}&servings=1&includeNutrition=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(res => {
            setFoodName(res[0])
            return res
        })
        .then(res => {
            let a = res.map(b => {
                return b.nutrition.nutrients
            })
            return a
        }).then(res => res.map(b => b))
        .then(res => res[0].slice(0, 9))
        .then(setNutrition)
    }

        const addFood= foodItem => {
           return fetch("http://localhost:8088/foodItems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(foodItem)
            })
        }

        const usersFood = () => {
            return fetch(`http://localhost:8088/foodItems/?userId=1`)
            .then(res => res.json()) 
        }

    return (
        <FoodContext.Provider value={{
            FoodContext, food, getFood, isLoading, visible, setVisible, nutrition, getNutrition, foodName,
            addFood, usersFood, addToDb, setAddToDb
        }}>
            {props.children}
        </FoodContext.Provider>
    )
}