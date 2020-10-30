import React, { useEffect, useContext, useState } from "react"
import { FoodContext } from '../Search/FoodDataProvider';
import { FoodDatabaseContext } from '../FoodLog/FoodDatabaseProvider'
import { Modal, Input } from 'antd';
import './login.css'


let user = localStorage.getItem("userId")

export const UserLogin = props => {
    const { getFoodDatabase, setIsLog } = useContext(FoodContext)
    const { getFoodLog, setLogName, setCalorie, setCurrentCalories, setMealId, returnMeals, setDbFoodItem } = useContext(FoodDatabaseContext)
    const [isShowing, setIsShowing] = useState(false)
    const [userName, setUserName] = useState()
    const [isRegister, setIsRegister] = useState(false)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    let date = new Date(Date.now()).toLocaleDateString([], {year: '2-digit', month:'2-digit', day:'2-digit'})

    useEffect(() => {
        user? document.getElementById('root').style.animation = "none" : setIsShowing(true)
        user? document.getElementById('root').style.opacity = "1" : setIsShowing(true)
        user? setIsShowing(false) : setIsShowing(true)
    }, [user])
    

    const existingUserCheck = () => {
        return fetch(`http://localhost:8080/users?username=${userName}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("userId", exists.id)
                    localStorage.setItem("username", exists.username)
                    localStorage.setItem("firstName", exists.firstName)
                    document.getElementById('root').style.animation = "bgfade 1s ease-in";
                    document.getElementById('root').style.opacity = "1"

                     getFoodLog(date)
                    .then(res => {
                        let response = res.filter(res => res.date === date)
                        return response
                    })
                    .then(res => {
                        if(res.length !== 0){
                            res.map(value => {
                                setLogName(value.name)
                                setCalorie(value.calorieStart)
                                setCurrentCalories(value.currentCalories)
                                setMealId(value.id)
                                returnMeals(value.id)
                                .then(res => {
                                    setDbFoodItem(res)
                                })
                                return setIsLog(true)
                            }) }}).then(() => {
                                getFoodDatabase() 
                            })
                    
                    setIsShowing(false)
                } else {
                    setIsShowing(true)
                    isRegister? window.alert("Welcome!") : window.alert("No user found!")
                 }
            })
        }



    const handleRegister = (e) => {
        e.preventDefault()

        if(userName && firstName && lastName && email !== false){
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8080/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: userName,
                            firstName,
                            lastName,
                            emailAddress: email
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("userId", createdUser.id)
                                localStorage.setItem("username", createdUser.username)
                                localStorage.setItem("firstName", createdUser.firstName)
                            
                            }
                            document.getElementById('root').style.animation = "bgfade 1s ease-in";
                            document.getElementById('root').style.opacity = "1"
                            setIsShowing(false)
                        }).then(() => {
                            getFoodDatabase() 
                        })
                }
            })
        } else {
            window.alert("Please complete all fields")
        }
        
    }

    const register = () => {
        if(isRegister === false){
            setIsRegister(true)
        } 
    }

    const login = () => {
        if(isRegister === true){
            setIsRegister(false)
        }
    }

    const clear = () => {
      setUserName()
      setFirstName()
      setLastName()
      setEmail()
    }
    return (
        <>
        <Modal
            title={<h1>Macro Tracker</h1>}
            centered
            visible={isShowing}
            onOk={isRegister? handleRegister : handleLogin}
            okText={isRegister? 'Create' : 'Login'}
            onCancel={clear}
            cancelText={'Clear'}
            >
            {isRegister? <h2>Create Account</h2>: <h2>User Login</h2>}
            <Input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Username" />
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required/>
            {isRegister? <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required/> : null}
            {isRegister? <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/> : null}
            

            <p>Not a user? <span onClick={register} className="register">Register</span></p>
            {isRegister? <p onClick={login} className="register">Login</p> : null}

        </Modal>
        </>
    )
}