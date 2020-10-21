import React from 'react'
import { FoodDataProvider } from './Components/Search/FoodDataProvider'
import { FoodModal } from './Components/Search/FoodModal'
import { FoodSearch } from './Components/Search/FoodSearch'
import { FoodDatabaseProvider } from './Components/FoodLog/FoodDatabaseProvider'
import './GridLayout.css'
import { FoodMenuLog } from './Components/FoodLog/FoodMenuLog'
import { FoodDbList } from './Components/Search/FoodDbList'


export const MacroTracker = () => (
    <div className="gridContainer">
        <FoodDataProvider>
            <header className="gridHeader"></header>
                <aside className="gridAside">
                    <div className="gridAside1">
                        <FoodSearch />
                        <FoodModal />
                    </div>
                    <div className="gridAside2 foodSavedContainer">
                        <FoodDbList />
                        <FoodModal />
                    </div>
                </aside>
            <main className="gridMain">
                <div className="gridMain1">
                    
                        <FoodDatabaseProvider>
                            <FoodMenuLog />
                        </FoodDatabaseProvider>
                
                </div>
                <div className="gridMain2"></div>
                <div className="gridMain3"></div>

            </main>
            <footer className="gridFooter"></footer>
        </FoodDataProvider>
    </div>

)





