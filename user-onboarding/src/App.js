import React, { useState, useEffect } from 'react';
import './App.css';
import * as Yup from 'yup';
import axios from 'axios';

function App() {

  const [post, setPost] = useState();

  const formSchema = Yup.object().shape({
    username: Yup.string().min(6, 'must be at least 6 chararacters').required('need a username'),
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

  const validateChange = e =>{
    Yup.reach(formSchema, e.target.name).validate(e.target.value).then(valid => {
      setErrors({...errors, [e.target.name]: ''})
    }).catch(err => setErrors({...errors, [e.target.name]: err.errors[0] }))
  }



  const [buttonState, setButtonState] =useState(true)
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    username:'',
    email:'',
    password:'',
    agree:false

  });

  const changeHandler = event => {
    event.persist()

    validateChange(event);
    setNewUser({...newUser, [event.target.name]: event.target.value});
    console.log(newUser)
  };

  const handleSubmit = event => {

    event.preventDefault();

    axios.post('https://reqres.in/api/users', newUser).then(response =>{
      const responseData =response.data
      setUsers([...users, {responseData}])
      setNewUser({
        username:'',
        email:'',
        password:'',
        agree:false
      })

    }).catch(err => console.log(err))

    setUsers([...users, {newUser}])
    console.log('newUser', newUser);
    console.log(users)

    
    
  }

    // new state to set our post request too. So we can console.log and see it.
   

    useEffect(() => {
      formSchema.isValid(newUser).then(valid => {
      console.log('valid?', valid);
      setButtonState(!valid)
        
      });
    }, [newUser]);
  
  
  return (
    <div className="App">
      
        <form onSubmit={event => handleSubmit(event)}>
          <label htmlFor='username'>Username:
        <input 
          id='username'
          type='text' 
          name='username' 
          value={newUser.username}
          onChange={event => changeHandler(event)}></input>

          {errors.username.length > 0 ? < p className='error' >{errors.username}</p>:null}

          </label>
        <div>
        <label htmlFor='email'>Email:
        
          <input
          id='email'
        type='text'
        name='email'
        value={newUser.email}
        onChange={event=>changeHandler(event)}></input>
         {errors.email.length > 0 ? < p className='error' >{errors.email}</p>:null}
        </label>
        </div>
        
        <div>
        <label htmlFor='password'>Password:
          <input
            id='password'
            type='password'
            name='password'
            value={newUser.password}
            onChange={event=>(changeHandler(event))}></input>
             {errors.password.length > 0 ? < p className='error' >{errors.password}</p>:null}
        </label></div>
          
          <div>
          

          <label>Do you agree to the terms and conditions?
          <input type="checkbox" name="agree" value={true} onChange={event=>changeHandler(event)}/>

          {errors.agree.length > 0 ? < p className='error' >{errors.agree}</p>:null}
          </label>
          </div>
          <div>
          <button disabled={buttonState} type='submit'>Submit</button></div>

          <pre>{JSON.stringify(users, null, 2)}</pre>
        </form>
        
     
    </div>
  );
}

export default App;
