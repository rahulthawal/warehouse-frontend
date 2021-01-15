import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ProductModalForm from './Components/Modals/ProductModal'
import ProductDataTable from './Components/Tables/ProductDataTable'
import { CSVLink } from "react-csv"

function Product(props) {

  const [items, setItems] = useState([])

  const getProducts = () => {
    fetch('http://localhost:8080/api/product')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  // const getLocations = () => {
  //   fetch('http://localhost:8080/api/location')
  //     .then(response => response.json())
  //     .then(items => setItems(items))
  //     .catch(err => console.log(err))
  // }

  const addItemToState = (item) => {
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }
  // const a= {}, b={};
  useEffect(() => {
    getProducts()
  }, []);

  return (
    <Container className="Product">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Product List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductDataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"product_report.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}>
            Product Report
            </CSVLink>
          <ProductModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default Product