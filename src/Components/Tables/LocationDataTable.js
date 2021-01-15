import React from 'react'
import { Table, Button } from 'reactstrap';
import LocationModalForm from '../Modals/LocationModal'

function LocationDataTable(props) {
  const deleteItem = locationid => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      fetch('http://localhost:8080/api/location', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationid
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(locationid)
        })
        .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.locationid}>
        <th scope="row">{item.locationid}</th>
        <td>{item.locationname}</td>
        <td>
          <div style={{ width: "110px" }}>
            <LocationModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.locationid)}>Delete</Button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Location ID</th>
          <th>Location Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default LocationDataTable