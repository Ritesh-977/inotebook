import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"", password: "", cpassword:""})
     let navigate = useNavigate();
    const handleSubmit = async (e)=>{
       // const [name, email, password] = credentials;
       const { password, cpassword } = credentials;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({Name: credentials.name, Email: credentials.email, Password: credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if(password !== cpassword){
            props.showAlert("Password do not match","danger");
          }
          else{
          if(json.success){
           // save the authtoken and redirect
           localStorage.setItem('token', json.authtoken);
           navigate("/login");
           props.showAlert("Account Created Succesfully","success");
          }
          else{
            props.showAlert("Invalid details","danger");
          }
        }
    }

    const onchange=(e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onchange}  aria-describedby="emailHelp" placeholder="Enter your full Name"/>
   </div>
    <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" onChange={onchange} name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
    
   </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" onChange={onchange} minLength={6} required name='password' placeholder="Password"/>
  </div>
    <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" onChange={onchange} minLength={6} required name='cpassword' placeholder="Confirm Password"/>
  </div>
  <button  type="submit" className="btn btn-primary my-2">Sign Up</button>
</form>
    </div>
  )
}

export default Signup
