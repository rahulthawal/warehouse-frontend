import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function ProductEditForm(props) {
  const [form, setValues] = useState({
    productid: 0,
    productname: '',
    productimage: '',
    productcategory: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8080/api/product', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productname: form.productname,
        productimage: form.productimage,
        productcategory: form.productcategory
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
    fetch('http://localhost:8080/api/product', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productid: form.productid,
        productname: form.productname,
        productimage: form.productimage,
        productcategory: form.productcategory
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
      const { productid, productname, productimage, productcategory } = props.item
      setValues({ productid, productname, productimage, productcategory })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="productname">Product Name</Label>
        <Input type="text" name="productname" id="productname" onChange={onChange} value={form.productname === null ? '' : form.productname} />
      </FormGroup>
      <FormGroup>
        <Label for="productimage">Product Image</Label>
        <Input type="text" name="productimage" id="productimage" onChange={onChange} value={form.productimage === null ? '' : form.productimage} />
      </FormGroup>
      <FormGroup>
        <Label for="productcategory">Product Category</Label>
        <Input type="productcategory" name="productcategory" id="productcategory" onChange={onChange} value={form.productcategory === null ? '' : form.productcategory} />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default ProductEditForm