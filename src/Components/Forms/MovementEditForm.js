import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function MovementEditForm(props) {
  const [form, setValues] = useState({
    timestamp: '',
    fromlocation: '',
    tolocation: '',
    qty: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8080/api/movement', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp: form.timestamp,
        fromlocation: form.fromlocation,
        tolocation: form.tolocation,
        qty: form.qty
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:8080/api/movement', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movementid: form.movementid,
        timestamp: form.timestamp,
        fromlocation: form.fromlocation,
        tolocation: form.tolocation,
        qty: form.qty
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          props.updateState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (props.item) {
      const { movementid, productid, timestamp, fromlocation, tolocation, qty  } = props.item
      setValues({ movementid, productid, timestamp, fromlocation, tolocation, qty  })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="productid">Product ID</Label>
        <Input type="text" name="productid" id="productid" onChange={onChange} value={form.productid === null ? '' : form.productid} />
      </FormGroup>
      <FormGroup>
        <Label for="timestamp">Timestamp</Label>
        <Input type="text" name="timestamp" id="timestamp" onChange={onChange} value={form.timestamp === null ? '' : form.timestamp} />
      </FormGroup>
      <FormGroup>
        <Label for="fromlocation">From Location</Label>
        <Input type="fromlocation" name="fromlocation" id="fromlocation" onChange={onChange} value={form.fromlocation === null ? '' : form.fromlocation} />
      </FormGroup>
      <FormGroup>
        <Label for="tolocation">To Location</Label>
        <Input type="tolocation" name="tolocation" id="tolocation" onChange={onChange} value={form.tolocation === null ? '' : form.tolocation} />
      </FormGroup>
      <FormGroup>
        <Label for="qty">Quantity</Label>
        <Input type="qty" name="qty" id="qty" onChange={onChange} value={form.qty === null ? '' : form.qty} />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default MovementEditForm