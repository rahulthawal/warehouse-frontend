import React from 'react'
import { Table, Button } from 'reactstrap';
import ProductModalForm from '../Modals/ProductModal'

function ProductDataTable(props) {
  const deleteItem = productid => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      fetch('http://localhost:8080/api/product', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productid
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(productid)
        })
        .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.productid}>
        <th scope="row">{item.productid}</th>
        <td>{item.productname}</td>
        <td>{item.productimage}</td>
        <td>{item.productcategory}</td>
        <td>
          <div style={{ width: "110px" }}>
            <ProductModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.productid)}>Delete</Button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Image</th>
          <th>Product Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default ProductDataTable