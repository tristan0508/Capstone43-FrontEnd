import React, { useContext, useEffect } from 'react'
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { Progress } from 'antd';

export const FoodDisplay = () => {
    const { dbFoodItem, protein, setProtein, carb, setCarb, fat, setFat } = useContext(FoodDatabaseContext)

    useEffect(() => {
        let proteins = [0]
        let carbs = [0]
        let fats = [0]

        dbFoodItem.map(food => {
            proteins.push(food.protein)
            carbs.push(food.carbohydrates)
            fats.push(food.fat)
            return null
        })

        let protein = proteins.reduce((a, b) => {
            return a + b
        })
        let carb = carbs.reduce((a, b) => {
            return a + b
        })
        let fat = fats.reduce((a, b) => {
            return a + b
        })
        setProtein(Math.round(protein))
        setCarb(Math.round(carb))
        setFat(Math.round(fat))
    }, [dbFoodItem, setCarb, setFat, setProtein])


    return (
        <div className="macros">
            
            <h3>Protein</h3>
            <Progress 
            type="circle"
            percent={100}
            format={() => `${protein}g`}
            width={100} />

            <h3>Carbs</h3>
            <Progress 
            type="circle"
            percent={100}
            format={() => `${carb}g`}
            width={100} />

            <h3>Fat</h3>
            <Progress 
            type="circle"
            percent={100}
            format={() => `${fat}g`}
            width={100} />
            
        </div>
    )
}