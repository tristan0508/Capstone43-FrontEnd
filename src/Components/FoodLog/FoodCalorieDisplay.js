import React, {useContext, useEffect, useState} from 'react'
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { Progress } from 'antd';

export const FoodCalorieDisplay = () => {
    const { calorie, currentCalories} = useContext(FoodDatabaseContext)
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        let percentage = currentCalories/calorie
        let percentValue = Math.round(percentage * 100)
        setPercent(percentValue)
        
    }, [currentCalories, calorie])

    return (
        <div className="calorieContainer">
            
            <h3>Daily Goal</h3>
            <Progress
            className="dailyGoal" 
            width={132}
            type="dashboard"
            percent={percent} 
            format={() => `${Math.round(currentCalories)}/${calorie} Cal`} />
            
            <Progress 
            className="percent"
            width={120}
            type="circle"
            percent={percent} 
            />
            <h3>Percent</h3>
    </div>
    )
}