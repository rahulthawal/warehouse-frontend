import React from 'react'
import { Table, Button } from 'reactstrap';
import MovementModalForm from '../Modals/MovementModal'

function MovementDataTable(props) {
  const deleteItem = movementid => {
    let confirmDelete = window.confirm('Delete Product Movement forever?')
    if (confirmDelete) {
      fetch('http://localhost:8080/api/movement', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          movementid
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(movementid)
        })
        .catch(err => console.log(err))
    }
  }
  const items = props.items.map(item => {
    return (
      <tr key={item.movementid}>
        <th scope="row">{item.movementid}</th>
        <td>{item.productid}</td>
        <td>{item.timestamp}</td>
        <td>{item.fromlocation}</td>
        <td>{item.tolocation}</td>
        <td>{item.qty}</td>
        <td>
          <div style={{ width: "110px" }}>
            <MovementModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.movementid)}>Delete</Button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Movement ID</th>
          <th>Product ID</th>
          <th>Timestamp</th>
          <th>From Location</th>
          <th>To Location</th>
          <th>Qty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default MovementDataTable