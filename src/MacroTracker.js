import React from 'react'
import { FoodDataProvider } from './Components/Search/FoodDataProvider'
import { FoodModal } from './Components/Search/FoodModal'
import { FoodSearch } from './Components/Search/FoodSearch'
import { FoodDatabaseProvider } from './Components/FoodLog/FoodDatabaseProvider'
import './GridLayout.css'
import { FoodMenuLog } from './Components/FoodLog/FoodMenuLog'
import { FoodDbList } from './Components/Search/FoodDbList'
import { NewLogModal } from './Components/FoodLog/NewLogModal'


export const MacroTracker = () => (
    <div className="gridContainer">
    <FoodDatabaseProvider>
        <FoodDataProvider>
            <FoodDatabaseProvider>
            <header className="gridHeader"></header>
                <aside className="gridAside">
                    <div className="gridAside1">
                        <FoodSearch />
                       
                    </div>
                    <div className="gridAside2 foodSavedContainer">
                        <FoodDbList />
                        <FoodModal />
                    </div>
                </aside>
            <main className="gridMain">
                <div className="gridMain1">
                            
                            <FoodMenuLog />
                            <NewLogModal />
                </div>
                <div className="gridMain2"></div>
                <div className="gridMain3"></div>

            </main>
            <footer className="gridFooter"></footer>
                </FoodDatabaseProvider>
        </FoodDataProvider>
    </FoodDatabaseProvider>
    </div>

)





