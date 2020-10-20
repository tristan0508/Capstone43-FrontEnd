import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './FoodLog.css'

const { Header, Footer, Content } = Layout;

export const FoodMenuLog = () => {

const[menuItem, setMenuItem] = useState('breakfast')



    const a = (event) => {
        let b = event.key
        if(b === "breakfast"){
            setMenuItem(b)
        } if(b === "lunch"){
            setMenuItem(b)
        } if(b === "dinner"){
            setMenuItem(b)
        } if(b === "snack"){
            setMenuItem(b)
        }
    }


    return (
    <Layout className="layout">
        <Header className="layoutHeader">
            <Menu className="layoutMenu"theme="dark" mode="horizontal" defaultSelectedKeys={['breakfast']}>
                <Menu.Item onClick={a} key="breakfast">Breakfast</Menu.Item>
                <Menu.Item onClick={a} key="lunch">Lunch</Menu.Item>
                <Menu.Item onClick={a} key="dinner">Dinner</Menu.Item>
                <Menu.Item onClick={a} key="snack">Snack</Menu.Item>
            </Menu>
        </Header>
        <Content className="layoutContent">
            {console.log(menuItem)}
        </Content>
        <Footer className="layoutFooter"></Footer>
    </Layout>
    )
}