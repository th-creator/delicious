import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import {AiOutlineClose} from "react-icons/ai"

export default function EditMeal({setEditModel, getMeals, edit}) {
  const [formValues, setFormValues] = useState({id:edit.id, name:edit.name, price: edit.price, type: edit.type})
  const [editErrors, setEditErrors] = useState({})
  const [image, setimage] = useState({})
  const handleImage = (file) =>
  {
    setimage({ 
      imagedata: file[0]
    })
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormValues({...formValues,[name]:value})
  }
  const modifyMeal = (e) => {
    e.preventDefault()
    const fd = new FormData();
    setEditErrors({name: "",type: "",price: ""})
    
    axios.put(`/api/Meals/${formValues.id}`,formValues,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(res => {
        out()
        setFormValues({name: "",type: "",price: ""})
      })
      .catch(err => {if(err.response.data) setEditErrors(err.response.data.errors)})
      setimage({})
      getMeals()
    
  }
  const out = () => {
    setEditModel(false)
    setFormValues({name: "",type: "",price: ""})
    setEditErrors({name: "",type: "",price: ""})
  }
  return (
    <Container className="editModel">
        <form onSubmit={modifyMeal} className="wrapper">
          <span className='out' onClick={out}><AiOutlineClose/></span>
          <h4 className='title'>Edit Meal</h4>
          <div className='inp-wrapper'>
              <label className='label' htmlFor="">Name</label>
              <input className='inp-name' value={formValues.name} onChange={onChange} type="text" name="name" id="" />
              {editErrors.name && <span className='err'>{editErrors.name}</span>}
          </div>
          <div className='inp-wrapper'>
            <label className='label' htmlFor="">Type</label>
            <input className='inp-name' value={formValues.type} onChange={onChange} type="text" name="type" id="" />
            {editErrors.type && <span className='err'>{editErrors.type}</span>}
          </div>
          <div className='inp-wrapper'>
            <label className='label' htmlFor="">Price</label>
            <input className='inp-name' value={formValues.price} onChange={onChange} type="number" name="price" id="" />
            {editErrors.price && <span className='err'>{editErrors.price}</span>}
          </div>
          <div className='inp-wrapper'>
            <button className='btn'>Edit</button>
          </div>
        </form>
      </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  box-shadow: 0 0 0 9999px #000000b0;
  position: absolute;
  border: 1px solid #E8F0FF;
  border-radius: 30px;
  width: 50%;
  height: auto;
  left: 0;
  right: 0;
  margin: auto;
  top: 400px;
  .title {
    text-align: center;
    font-size: 2rem;
    font-family: monospace;
    margin-block: 10px 45px;
  }
  .wrapper {
    width: 100%;
    height: auto;
    padding: 30px;
    border: 1px solid #E8F0FF;
    border-radius: 30px;
    background: white;
    postion: relative;
  }
  .out {
    position: absolute;
    right: 42px;
    font-size: x-large;
    cursor: pointer;
  }
  .inp-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .inp-wrapper-name {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .inp , .inp-name{
    border: 1px solid #979797;
    border-radius: 10px;
    background-color: white;
    height: 50px;
    padding-left: 12px;
    margin: 20px 5px 5px;
    font-size: 16px;
  }
  .upload {
    border: 1px solid #979797;
    border-radius: 10px;
    background-color: white;
    height: 50px;
    padding-left: 12px;
    margin: 20px 5px;
    text-align: center;
    font-size: 2rem;
    padding-top: .6%;
    font-weight: 900;
    cursor: pointer;
  }
  .txt {
    text-align: center;
    font-weight: 600;
  }
  .label {
    font-size: 20px;
    padding-left: 7px;
    font-family: Inter;
    font-weight: 600;
    margin-top: 15px;
  }
  .btn {
    margin: 15px 5px 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #313131;
    color: white;
    height: 50px;
    font-size: 21px;
    cursor: pointer;
  }
  .btn:hover {
    opacity: .9;
  }
  .img {
    border-radius: 50%;
    width: 130px;
    height: 130px;
    cursor:pointer;
  }
  .img::hover::after {
    content: "hhey";
  }
  
  .center {
    display: grid;
    place-items: center;
  }
  .Roles{
    display: flex;
    margin: 30px 0px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.Role label{
  opacity: 1;
  border: 2px solid #313131;
  border-radius: 26px;
  text-align: center;
  width: 100px;
  padding: 10px 20px;
  margin: 20px 10px; 
  cursor: pointer;
}
.mystyle {
  background-color: #313131;
  color: whitesmoke;
}
.err {
  color: red;
  padding-left: 10px;
}
`
