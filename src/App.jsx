import "./App.css"
import { useState, useEffect } from 'react'

const App = () => {

  const initialValues = {username:"", email:"", password:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value })
    console.log(formValues)
  }

 const handleSubmit = (e) => {
    e.preventDefault()
   setFormErrors(Validate(formValues))
   setIsSubmit(true)
 }

 useEffect(() =>{
   console.log(formErrors)
  if(Object.keys(formErrors).length === 0 && isSubmit){
    console.log(formValues)
  }
 }, [formErrors])

 const Validate = (values) => {
    const errors = {};
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if(!values.username){
      errors.username = "UserName is Required!";
    }

    
    if(!values.email){
      errors.email = "Email is Required!";
    }

    
    if(!values.password){
      errors.password = "Password is Required!";
    }

    return errors;
 };

  return(
    <div className="container">
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" value={formValues.username}
            onChange={handleChange}/>
          </div>

          
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" value={formValues.email}
            onChange={handleChange}
            />
          </div>

          
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" value={formValues.password}
            onChange={handleChange}/>
          </div>
          <button className="fluid ui button blue" type="Submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App