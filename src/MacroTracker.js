import React from 'react'
import { FoodDataProvider } from './search/FoodDataProvider'
import { FoodModal } from './search/FoodModal'
import { FoodSearch } from './search/FoodSearch'
import { Row, Col } from 'antd'


export const MacroTracker = () => (
    <>
        <Row gutter={[16, 16]} className="row1" >
            <Col span={24}>
                <header className="header">
                    <FoodDataProvider>
                        <FoodSearch />
                        <FoodModal />
                    </FoodDataProvider>
                </header>
            </Col>
        </Row>
        <Row className="row2">
            <Col span={12}></Col>
            <Col span={12}></Col>
        </Row>
        <Row>
            <Col span={8}></Col>
            <Col span={8}></Col>
            <Col span={8}></Col>
        </Row>
        <Row>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
        </Row>
  </>

)

