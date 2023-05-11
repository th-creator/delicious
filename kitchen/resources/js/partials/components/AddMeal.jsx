import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';

export default function AddMeal() {
  const [formValues, setFormValues] = useState({})
  const [errors, setErrors] = useState({})
  const [img, setImg] = useState({})
  const [image, setimage] = useState({})
  const handleImage = (file) =>
  {
    // const fileChosen = document.getElementById('image-chosen');
    // fileChosen.textContent = file[0].name
    console.log(file)
    setimage({ 
      imagedata: file[0]
    })
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setFormValues({...formValues,[name]:value})
  }
  const storeMeal = (e) => {
    e.preventDefault()
    const fd = new FormData();
    console.log(formValues);
    fd.append('img', image.imagedata);
    fd.append('name', formValues.name);
    fd.append('type', formValues.type);
    fd.append('price', formValues.price);
    fd.append('description', formValues.description);
    
    axios.post("/api/Meals",fd,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(res => setFormValues({name: "",type: "",price: "", description: ""}))
      .catch(err => console.log(err))
    setimage({})
  }
  return (
    <Wrapper class="shade">
      <div class="blackboard">
          <form class="form" onSubmit={storeMeal}>
              <p>
                  <label>Name: </label>
                  <input value={formValues.name} type="text" onChange={onChange} name='name' />
              </p>
              <p>
                  <label>Type: </label>
                  <input value={formValues.type} type="text" onChange={onChange} name='type' />
              </p>
              <p>
                  <label>Price: </label>
                  <input value={formValues.price} type="text" onChange={onChange} name='price' />
              </p>
              <p>
                  <label htmlFor='image'>Add Picture: </label>
                  <input onChange={ (e) => handleImage(e.target.files) } type="file" id="image" hidden/>
                  <label className='txt'>{image.imagedata ? image.imagedata.name  : 'no file chosen'}</label>
              </p>
              <p>
                  <label>Description: </label>
                  <textarea value={formValues.description} onChange={onChange} name='description'></textarea>
              </p>
              <p class="wipeout">
                  <input onClick={storeMeal} type="submit" value="Add"  />
              </p>
          </form>
      </div>
  </Wrapper>
  )
}

const Wrapper = styled.div`
.shade {
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient( 150deg, rgba(0, 0, 0, 0.65), transparent);
}

.blackboard {
  position: relative;
  width: 640px;
  margin: 7% auto;
  border: tan solid 12px;
  border-top: #bda27e solid 12px;
  border-left: #b19876 solid 12px;
  border-bottom: #c9ad86 solid 12px;
  box-shadow: 0px 0px 6px 5px rgba(58, 18, 13, 0), 0px 0px 0px 2px #c2a782, 0px 0px 0px 4px #a58e6f, 3px 4px 8px 5px rgba(0, 0, 0, 0.5);
  background-image: radial-gradient( circle at left 30%, rgba(34, 34, 34, 0.3), rgba(34, 34, 34, 0.3) 80px, rgba(34, 34, 34, 0.5) 100px, rgba(51, 51, 51, 0.5) 160px, rgba(51, 51, 51, 0.5)), linear-gradient( 215deg, transparent, transparent 100px, #222 260px, #222 320px, transparent), radial-gradient( circle at right, #111, rgba(51, 51, 51, 1));
  background-color: #333;
}

.blackboard:before {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient( 175deg, transparent, transparent 40px, rgba(120, 120, 120, 0.1) 100px, rgba(120, 120, 120, 0.1) 110px, transparent 220px, transparent), linear-gradient( 200deg, transparent 80%, rgba(50, 50, 50, 0.3)), radial-gradient( ellipse at right bottom, transparent, transparent 200px, rgba(80, 80, 80, 0.1) 260px, rgba(80, 80, 80, 0.1) 320px, transparent 400px, transparent);
  border: #2c2c2c solid 2px;
  content: "Add Meal";
  font-family: 'Permanent Marker', cursive;
  font-size: 2.2em;
  color: rgba(238, 238, 238, 0.7);
  text-align: center;
  padding-top: 20px;
}

.form {
  padding: 70px 20px 20px;
}

p {
  position: relative;
  margin-bottom: 1em;
}

label {
  vertical-align: middle;
  font-family: 'Permanent Marker', cursive;
  font-size: 1.6em;
  color: rgba(238, 238, 238, 0.7);
}

p:nth-of-type(5) > label {
  vertical-align: top;
}

input,
textarea {
  vertical-align: middle;
  padding-left: 10px;
  background: none;
  border: none;
  font-family: 'Permanent Marker', cursive;
  font-size: 1.6em;
  color: rgba(238, 238, 238, 0.8);
  line-height: .6em;
  outline: none;
}

textarea {
  height: 120px;
  font-size: 1.4em;
  line-height: 1em;
  resize: none;
}

input[type="submit"] {
  cursor: pointer;
  color: rgba(238, 238, 238, 0.7);
  line-height: 1em;
  padding: 0;
}

input[type="submit"]:focus {
  background: rgba(238, 238, 238, 0.2);
  color: rgba(238, 238, 238, 0.2);
}

::-moz-selection {
  background: rgba(238, 238, 238, 0.2);
  color: rgba(238, 238, 238, 0.2);
  text-shadow: none;
}

::selection {
  background: rgba(238, 238, 238, 0.4);
  color: rgba(238, 238, 238, 0.3);
  text-shadow: none;
}
`