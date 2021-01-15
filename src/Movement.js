import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import MovementModalForm from './Components/Modals/MovementModal'
import MovementDataTable from './Components/Tables/MovementDataTable'
import { CSVLink } from "react-csv"

function Movement(props) {

  const [items, setItems] = useState([])

  const getMovements = () => {
    fetch('http://localhost:8080/api/movement')
      .then(response => response.json())
      .then(items => setItems(items.data))
      .catch(err => console.log(err))
  }

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

  useEffect(() => {
    getMovements()
  }, []);

  return (
    <Container className="Movement">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Movement List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <MovementDataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"movement_report.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}>
            Movement Report
            </CSVLink>
          <MovementModalForm buttonLabel="Add Product Movement" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default Movement