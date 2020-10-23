import React, { useEffect, useState, useContext, useRef } from 'react'
import { Layout, Menu, Table, InputNumber, Collapse } from 'antd';
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { DeleteOutlined, CaretRightOutlined } from '@ant-design/icons';
import './FoodLog.css'

const { Panel } = Collapse
const { Header, Content } = Layout;
const columns = [
    {
      title: 'Image',
      dataIndex: 'Image',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
    },
    {
      title: 'Calories',
      dataIndex: 'Calories',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
    },
    {
        title: 'Delete',
        dataIndex: 'Delete'
    }
  ];


export const FoodMenuLog = () => {
    const { dbFoodItem, setPanelSwitch, setFoodItem } = useContext(FoodDatabaseContext)
    const [menuItem, setMenuItem] = useState('breakfast')


    sessionStorage.setItem("foodLog", JSON.stringify(dbFoodItem))
    let foodLog = JSON.parse(sessionStorage.getItem("foodLog"))



    useEffect(() => { 
        
    }, [foodLog])


    const deleteItem = (itemName) => {
        let index = dbFoodItem.findIndex(food => food.name === itemName)
        let b = dbFoodItem.splice(index, 1)
            setFoodItem(b)
    }



    const changed = (e) => {
        let a = parseInt(e)
        if(e){
            setPanelSwitch(a)
        }
    }

    const quantity = (e) => {
        
        console.log(e)
    }

    return (
        
    <Layout className="layout">
        <Header className="layoutHeader">
            <Menu selectable={false} className="layoutMenu"theme="dark" mode="horizontal">
                <Menu.Item  key="NewLog">New Log</Menu.Item>
                <Menu.Item  key="Save">Save</Menu.Item>
                <Menu.Item  key="Delete">Delete</Menu.Item>
                <Menu.Item  key="Edit">Edit</Menu.Item>
                <Menu.Item  key="SavedLogs">Saved Logs</Menu.Item>
            </Menu>
        </Header>
        <Content className="layoutContent">
      
      <Collapse
      accordion={true}
      onChange={changed}
      bordered={true}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className="">
                <Panel id="breakfast" header="Breakfast" key="1">
                    <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'breakfast').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img  className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber  min={1} max={15} defaultValue={1} onChange={quantity}/>,
                                Delete: <DeleteOutlined  onClick={deleteItem.bind(this, food.index)}/>
                            }
                        })
                    } />
                </Panel>
                <Panel id="lunch"  header="Lunch"key="2">
                <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'lunch').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img id={food.name} className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber min={1} max={15} defaultValue={1} onChange/>,
                                Delete: <DeleteOutlined id={food.name} onClick={deleteItem.bind(this, food.name)}/>
                            }
                        })
                    } />
                </Panel>
                <Panel id="dinner"  header="Dinner" key="3">
                <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'dinner').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img id={food.name} className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber min={1} max={15} defaultValue={1} onChange/>,
                                Delete: <DeleteOutlined id={food.name} onClick={deleteItem.bind(this, food.name)}/>
                            }
                        })
                    } />
                </Panel>
                <Panel id="snack"  header="Snack" key="4">
                <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'snack').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img id={food.name} className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber min={1} max={15} defaultValue={1} onChange/>,
                                Delete: <DeleteOutlined id={food.name} onClick={deleteItem.bind(this, food.name)}/>
                            }
                        })
                    } />
                </Panel>
         </Collapse>

        </Content>
    
    </Layout>
    )
}