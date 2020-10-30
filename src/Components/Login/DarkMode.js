import React, {useState} from 'react'
import image   from'../../images/My_Post_2_iceb2d.png';

export const DarkMode = () => {
   const [isDark, setIsDark] = useState(false)
   

    const darkMode = () => {
        if(isDark === false){
            document.body.style.backgroundImage = 'none'
            document.body.style.backgroundColor = 'black'
            document.documentElement.style.setProperty('--dark-one', 'black')
            document.documentElement.style.setProperty('--dark-two', 'white')
            document.documentElement.style.setProperty('--dark-three', 'black')
            setIsDark(true)
        } else {
            document.body.style.backgroundImage = `url(${image})`
            document.documentElement.style.setProperty('--dark-one', 'white')
            document.documentElement.style.setProperty('--dark-two', 'black')
            document.documentElement.style.setProperty('--dark-three', 'rgba(15,157,88, 0.5)')
            
            setIsDark(false)
        }

    }
    
    return (
        <>
            <button onClick={darkMode} className="darkMode">Dark Mode</button>
        </>
    )
}