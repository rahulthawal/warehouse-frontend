import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import LocationModalForm from './Components/Modals/LocationModal'
import LocationDataTable from './Components/Tables/LocationDataTable'
import { CSVLink } from "react-csv"

function Location(props) {

  const [items, setItems] = useState([])

  const getLocations = () => {
    fetch('http://localhost:8080/api/location')
      .then(response => response.json())
      .then(items => setItems(items))
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
    getLocations()
  }, []);

  return (
    <Container className="Location">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Location List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <LocationDataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"location_report.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={items}>
            Location Report
            </CSVLink>
          <LocationModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

export default Location