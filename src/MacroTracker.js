import React from 'react'
import { FoodDataProvider } from './search/FoodDataProvider'
import { FoodModal } from './search/FoodModal'
import { FoodSearch } from './search/FoodSearch'


export const MacroTracker = () => (
    <>
        <FoodDataProvider>
            <FoodSearch />
            <FoodModal />
        </FoodDataProvider>
    </>
)

