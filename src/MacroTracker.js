import React from 'react'
import { FoodDataProvider } from './Components/Search/FoodDataProvider'
import { FoodModal } from './Components/Search/FoodModal'
import { FoodSearch } from './Components/Search/FoodSearch'
import { FoodDatabaseProvider } from './Components/FoodLog/FoodDatabaseProvider'
import './GridLayout.css'
import { FoodMenuLog } from './Components/FoodLog/FoodMenuLog'
import { FoodDbList } from './Components/FoodLog/FoodDbList'


export const MacroTracker = () => (
    <div className="gridContainer">

        <header className="gridHeader"></header>
        <aside className="gridAside">
            <div className="gridAside1">
                <FoodDataProvider>
                    <FoodDatabaseProvider>
                        <FoodSearch />
                        <FoodModal />
                    </FoodDatabaseProvider>
                </FoodDataProvider>
            </div>
            <div className="gridAside2 foodSavedContainer">
            <FoodDataProvider>
                    <FoodDatabaseProvider>
                        <FoodModal />
                        <FoodDbList />
                    </FoodDatabaseProvider>
                </FoodDataProvider>
            </div>
        </aside>
        <main className="gridMain">
            <div className="gridMain1">
                <FoodDataProvider>
                <FoodDatabaseProvider>
                    <FoodMenuLog />
                </FoodDatabaseProvider>
                </FoodDataProvider>
            </div>
            <div className="gridMain2"></div>
            <div className="gridMain3"></div>
            
        </main>
        <footer className="gridFooter"></footer>
   
  </div>

)





