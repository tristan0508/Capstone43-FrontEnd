import React, { useEffect, useContext } from 'react'
import { Layout, Menu, Table, InputNumber, Collapse } from 'antd';
import { FoodDatabaseContext } from './FoodDatabaseProvider'
import { DeleteOutlined, CaretRightOutlined } from '@ant-design/icons';
import './FoodLog.css'
import { FoodContext } from '../Search/FoodDataProvider';

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
    const { dbFoodItem, setPanelSwitch, setFoodItem, panelSwitch, foodSource, setDbFoodItem, setShowing, showing,
    logName, mealId, setLogName, setCalorie, setMealId, deleteFoodLog, deleteMeal, getFoodSource, updateFoodLog,
    deleteLogItem, returnMeals } = useContext(FoodDatabaseContext)
    const { isLog, setIsLog, addFood } = useContext(FoodContext)


    sessionStorage.setItem("foodLog", JSON.stringify(dbFoodItem))
    sessionStorage.setItem("foodSource", JSON.stringify(foodSource))
    sessionStorage.setItem("isLog", JSON.stringify(isLog))
    let foodLog = JSON.parse(sessionStorage.getItem("foodLog"))
    let source = JSON.parse(sessionStorage.getItem("foodSource"))
    

    useEffect(() => {
        getFoodSource()
    }, [])

/////////////////////////////////////////////////////////////////////////////////////////////////////////
    const deleteItem = (itemName) => {
        let index = dbFoodItem.findIndex(food => food.name === itemName && food.type === panelSwitch)
        returnMeals(mealId).then(res => {
            res.map(food => {
                if(food.mealId && food.name === itemName && food.type === panelSwitch ? true : false){
                    deleteLogItem(food.id)
                }
                return null
            })
            let b = dbFoodItem.splice(index, 1)
            setFoodItem(b)
        })
    }

    const changed = (e) => {
        let panel = parseInt(e)
    
        if(e){
        let panelType;

        switch (panel) {
            case 1:
            panelType = 'breakfast';
            break;
            case 2:
            panelType = 'lunch';
            break;
            case 3:
            panelType = 'dinner';
            break;
            case 4:
            panelType = 'snack';
            break;
            default:
            panelType = 'breakfast';
            break;
        }
            setPanelSwitch(panelType)
        }
    }

    const quantity = (foodName, quantity) => {
    let foodItem = source.filter(food => food.name === foodName)
    let calories = [];
    let carbs = [];
    let cholest = [];
    let fat = [];
    let netCarb = [];
    let protein = [];
    let satFat = [];
    let sodium = [];
    let sugar = [];

    foodItem.map(food => {
        calories.push(food.calories)
        carbs.push(food.carbohydrates)
        cholest.push(food.cholesterol)
        fat.push(food.fat)
        netCarb.push(food.netCarbohydrates)
        protein.push(food.protein)
        satFat.push(food.saturatedFat)
        sodium.push(food.sodium)
        sugar.push(food.sugar)
        return null
    })

    let numberReturn = calories * quantity
    
    let newArray = foodLog.map(food => {
        if(food.name === foodName && food.type === panelSwitch){
            food.quantity = quantity
            food.calories = Math.round(numberReturn)
            food.fat = Math.floor((fat * quantity) * 100) /100
            food.saturatedFat = Math.floor((satFat * quantity) * 100) /100
            food.carbohydrates = Math.floor((carbs * quantity) * 100) /100
            food.netCarbohydrates = Math.floor((netCarb * quantity) * 100) /100
            food.sugar = Math.floor((sugar * quantity) * 100) /100
            food.cholesterol = Math.floor((cholest * quantity) * 100) /100
            food.sodium = Math.floor((sodium * quantity) * 100) /100
            food.protein = Math.floor((protein * quantity) * 100) /100
        }
        return food
    })
    setDbFoodItem(newArray)
}
///////////////////////////////////////////////////////////////////////////////////////////////////

   const showModal = () => {
    if(showing === false){

        isLog && logName? window.alert("Daily Log Already Exists!") : setShowing(true)
    } else {
        setShowing(false)
    }
   }

   const saveLog = () => {
       if(isLog === false){
        window.alert("Create New Log")
       }
       
       foodLog.map(food => {
           
           let amount = food.quantity
    
           if(food.mealId ? true : false){
               updateFoodLog(food.id, 
                {
                    quantity: food.quantity,
                    calories: food.calories,
                    fat: food.fat,
                    saturatedFat: food.saturatedFat,
                    carbohydrates: food.carbohydrates,
                    netCarbohydrates: food.netCarbohydrates,
                    sugar: food.sugar,
                    cholesterol: food.cholesterol,
                    sodium: food.sodium,
                    protein: food.protein
                })
                
           } else if(food.saved !== true){
            addFood(
                {
                    userId: 1,
                    mealId: mealId[0],
                    type: food.type,
                    quantity: food.quantity,
                    name: food.name,
                    image: food.image,
                    calories: food.calories,
                    fat: food.fat,
                    saturatedFat: food.saturatedFat,
                    carbohydrates: food.carbohydrates,
                    netCarbohydrates: food.netCarbohydrates,
                    sugar: food.sugar,
                    cholesterol: food.cholesterol,
                    sodium: food.sodium,
                    protein: food.protein
                })
           } if(food.saved === true){
            updateFoodLog(food.id, 
                {
                    quantity: food.quantity,
                    calories: food.calories,
                    fat: food.fat,
                    saturatedFat: food.saturatedFat,
                    carbohydrates: food.carbohydrates,
                    netCarbohydrates: food.netCarbohydrates,
                    sugar: food.sugar,
                    cholesterol: food.cholesterol,
                    sodium: food.sodium,
                    protein: food.protein
                })
           }
            return food.saved = true
        })
        window.alert("Saved!")
        returnMeals(mealId)
        .then(res => {
            setDbFoodItem(res)
        })
    }

   const resetLog = () => {
       setDbFoodItem([])
       setLogName('')
       setCalorie(0)
       setMealId('')
   }

   const deleteLog = () => {
       if(mealId === 0){
           window.alert("Nothing Selected")
       } else {
        deleteMeal(mealId)
        deleteFoodLog(mealId)
        setIsLog(false)
        resetLog()
        setMealId('')
       }
       
        
   }

    return (
        
    <Layout className="layout">
        <Header className="layoutHeader">
            <Menu selectable={false} className="layoutMenu"theme="dark" mode="horizontal">
                <Menu.Item  onClick={showModal} key="NewLog">New Log</Menu.Item>
                <Menu.Item  onClick={saveLog} key="Save">Save</Menu.Item>
                <Menu.Item  onClick={deleteLog} key="Delete">Delete</Menu.Item>
               
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
                <Panel id="breakfast" header="Breakfast" key="1" extra={<h5>{logName}</h5>}>
                    <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'breakfast').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img  className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber  min={1} max={15} defaultValue={1} value={food.quantity} onChange={quantity.bind(this, food.name)} />,
                                Delete: <DeleteOutlined  onClick={deleteItem.bind(this, food.name)}/>
                            }
                        })
                    } />
                </Panel>
                <Panel id="lunch"  header="Lunch"key="2" extra={<h5>{logName}</h5>}>
                <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'lunch').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img id={food.name} className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber min={1} max={15} defaultValue={1} value={food.quantity} onChange={quantity.bind(this, food.name)}/>,
                                Delete: <DeleteOutlined id={food.name} onClick={deleteItem.bind(this, food.name)}/>
                            }
                        })
                    } />
                </Panel>
                <Panel id="dinner"  header="Dinner" key="3" extra={<h5>{logName}</h5>}>
                <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'dinner').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img id={food.name} className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber min={1} max={15} defaultValue={1} value={food.quantity} onChange={quantity.bind(this, food.name)}/>,
                                Delete: <DeleteOutlined id={food.name} onClick={deleteItem.bind(this, food.name)}/>
                            }
                        })
                    } />
                </Panel>
                <Panel id="snack"  header="Snack" key="4" extra={<h5>{logName}</h5>}>
                <Table pagination={false} columns={columns}  size="small" dataSource={
                        foodLog.filter(food => food.type === 'snack').map(food => {
                            return {
                                key: food.apiId,
                                Image: <img id={food.name} className="foodImage"src={food.image} alt={food.name} />,
                                Name: food.name,
                                Calories: food.calories,
                                Quantity: <InputNumber min={1} max={15} defaultValue={1} value={food.quantity} onChange={quantity.bind(this, food.name)}/>,
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