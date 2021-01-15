import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function LocationEditForm(props) {
  const [form, setValues] = useState({
    locationid: 0,
    locationname: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8080/api/location', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationname: form.locationname
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
    fetch('http://localhost:8080/api/location', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationid: form.locationid,
        locationname: form.locationname
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          // console.log(item[0])
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
      const { locationid, locationname } = props.item
      setValues({ locationid, locationname })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="locationname">Location Name</Label>
        <Input type="text" name="locationname" id="locationname" onChange={onChange} value={form.locationname === null ? '' : form.locationname} />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default LocationEditForm