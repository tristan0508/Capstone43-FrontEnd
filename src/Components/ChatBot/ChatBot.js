import React, { useEffect, useState, useRef } from 'react'
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons'
import image from '../../images/Chatbot.jpg'
import { key } from '../../Settings';
import './chatbot.css'

const apiKey = key.apiKey

const { Search } = Input;

export const ChatBot = () => {
    const [botChat, setBotChat] = useState([])
    const [userChat, setUserChat] = useState([])

    const input = useRef()

    useEffect(() => {
        
    }, [botChat])

    const chatBot = (text) => {
        return fetch(`https://api.spoonacular.com/food/converse?apiKey=${apiKey}&text=${text}`)
        .then(res => res.json())
        .then(setBotChat)
    }
    

    return (
        <>  
            <img className="chatBotImg" src={image} alt ="Chatbot"/>
            <div className="chatArea">
            
                {
                    
                    [botChat].map(chat => {  
                    return <p className="chatBotText">{chat.answerText}</p>
                    })
                    
                }
                {
                    userChat.map(chat => {
                    return  <p className="userText">{chat}</p>
                    })
                }   
                 
                
           
                
            </div>
            <Search 
            style={{width: 400}}
            ref={input}
            placeholder="Ask me something..."
            enterButton={<SendOutlined />}
       
            onPressEnter={e => {
              setUserChat([e.currentTarget.value])
              chatBot(e.currentTarget.value)
              input.current.state.value = ''
            }} 
            />
        </>
        
    )
}