import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password: ""})
     let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({Email: credentials.email, Password: credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
           // save the authtoken and redirect
             localStorage.setItem('token', json.authtoken);
             navigate("/");
             props.showAlert("Loggedin Succesfully","success");
          }
          else{
            props.showAlert("Incorrect credentials","danger");
          }
    }

    const onchange=(e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input  type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email"/>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
