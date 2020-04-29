import React, { useState, useEffect } from 'react';
import './App.css';
import * as Yup from 'yup';

function App() {

  const formSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().email('must be a valid Email address.').required('must include email'),
    password: Yup.string().min(6, 'password must be at least 6 characters long.').required('must make a password'),
    agree:Yup.boolean().oneOf([true], "you must accept the terms and conditions")

  })

  

  const [errors, setErrors] =useState({
    username:'',
    email:'',
    password:'',
    agree:''
  })
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    username:'',
    email:'',
    password:'',
    agree:false

  });

  const changeHandler = event => {
    setNewUser({...newUser, [event.target.name]: event.target.value});
    console.log(newUser)
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUsers([...users, {newUser}])
    console.log('newUser', newUser);
    console.log(users)
    
    
  }

  
  
  return (
    <div className="App">
      
        <form onSubmit={event => handleSubmit(event)}>
          <label htmlFor='username'>Username:
        <input 
          id='username'
          type='text' 
          name='username' 
          value={newUser.username}
          onChange={event => changeHandler(event)}></input></label>
        <div>
        <label htmlFor='Email'>Email:
        
          <input
          id='email'
        type='text'
        name='email'
        value={newUser.email}
        onChange={event=>changeHandler(event)}></input></label>
        </div>
        
        <div>
        <label htmlFor='password'>Password:
          <input
            id='password'
            type='password'
            name='password'
            value={newUser.password}
            onChange={event=>(changeHandler(event))}></input>
        </label></div>
          
          <div>
          

          <label>Do you agree to the terms and conditions?
          <input type="checkbox" name="agree" value={true} onChange={event=>changeHandler(event)}/>
          </label>
          </div>
          <div>
          <button type='submit'>Submit</button></div>
        </form>
        
     
    </div>
  );
}

export default App;
