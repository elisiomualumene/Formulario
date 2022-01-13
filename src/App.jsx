import "./App.css"
import { useState, useEffect } from 'react'

const App = () => {

  const initialValues = {username:"", email:"", password:""}; //here i initialize the State
  const [formValues, setFormValues] = useState(initialValues); // here I create a State and Initialize
  const [formErrors, setFormErrors] = useState({}); // here a create a State for Errors
  const [isSubmit, setIsSubmit] = useState(false) // A State when Submit button is clicked

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value })
    console.log(formValues)
  }

  // ^
  // | That arrow function "handleChange"  gets all inputs values and print in the console, when button submit is clicked

 const handleSubmit = (e) => {
    e.preventDefault()
   setFormErrors(Validate(formValues))
   setIsSubmit(true)
 }

// ^
// | this function stop the load of the form, set fucntion Validate to 'setFormErrors' to display errors and change button submit false to true 

 useEffect(() =>{
   console.log(formErrors)
  if(Object.keys(formErrors).length === 0 && isSubmit){
    console.log(formValues)
  }
 }, [formErrors, formValues, isSubmit])



 const Validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if(!values.username){
      errors.username = "Username is Required!";
    }

    if(!values.email){
      errors.email = "Email is Required!";
    } else if (!regex.test(values.email)){
        errors.email = 'This is not a valid email format'
    }

    
    if(!values.password){
      errors.password = "Password is Required!";
    } else if(values.password.length < 4){
      errors.password = "password must be more than 4 characters"
    }

    return errors;
 };


// ^
// | this is the validation function 

  return(
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="message"></div>):
      (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)
      }

      {/* 
          ^
          | here I display a message when this state above be true 
      */}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">

          <div className="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" value={formValues.username}
            onChange={handleChange}/>
          </div>
          <p>{formErrors.username}</p>
          
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" value={formValues.email}
            onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" value={formValues.password}
            onChange={handleChange}/>
          </div>
          <p>{formErrors.password}</p>

          <button className="fluid ui button blue" type="Submit">Submit</button>
        </div>
      </form>
      
      {/* ENDS HERE */}
    </div>
  );
}

export default App