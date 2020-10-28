import React, { useEffect, useContext, useState } from 'react'
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { Progress } from 'antd';

export const FoodDailyValue = () => {
    const { dbFoodItem, protein, carb, fat } = useContext(FoodDatabaseContext)
    const [satFat, setSatFat] = useState(0)
    const [cholest, setCholest] = useState(0)
    const [sodium, setSodium] = useState(0)
    const [sugar, setSugar] = useState(0)


    useEffect(() => {
        let satFats = [0]
        let cholests = [0]
        let sodiums = [0]
        let sugars = [0]
        dbFoodItem.map(food => {
            satFats.push(food.saturatedFat)
            cholests.push(food.cholesterol)
            sodiums.push(food.sodium)
            sugars.push(food.sugar)
            return null
        })

        let satFat = satFats.reduce((a, b) => {
            return a + b
        })
        let cholest = cholests.reduce((a, b) => {
            return a + b
        })
        let sodium = sodiums.reduce((a, b) => {
            return a + b
        })
        let sugar = sugars.reduce((a, b) => {
            return a + b
        })
        setSatFat(satFat.toFixed(2))
        setCholest(cholest.toFixed(2))
        setSodium(sodium.toFixed(2))
        setSugar(sugar.toFixed(2))

    }, [dbFoodItem, protein])

    let proteinPer = Math.round((protein / 50) * 100)
    let carbPer = Math.round((carb / 275) * 100)
    let fatPer = Math.round((fat / 78) * 100)
    let satFatPer = Math.round((satFat / 20) * 100)
    let cholestPer = Math.round((cholest / 300) * 100)
    let sodiumPer = Math.round((sodium / 2300) * 100)
    let sugarPer = Math.round((sugar / 50) * 100)

    return (
        <div className="dailyValue">
            <div className="h2Container">
                <h2>Daily Values</h2> 
            </div>
            
           
            <Progress percent={fatPer} 
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}/>
            <p>Fat: {fat}g</p>

            <Progress percent={satFatPer}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }} />
            <p>Saturated Fat: {satFat}g</p>

            <Progress percent={cholestPer}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }} />
            <p>Cholesterol: {cholest}mg</p>

            <Progress percent={carbPer}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }} />
            <p>Carbohydrates: {carb}g</p>

            <Progress percent={sodiumPer}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }} />
            <p>Sodium: {sodium}mg</p>

            <Progress percent={sugarPer}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }} />
            <p>Sugar: {sugar}g</p>

            <Progress percent={proteinPer}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}/>
            <p>Protein: {protein}g</p>
           

        </div>
    )
}