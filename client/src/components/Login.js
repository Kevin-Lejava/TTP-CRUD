import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'


function Login() {

    const [username, setUser] = useState("")
    const [password, setPass] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleUser = (event) => {
        setUser(event.target.value)
    }

    const handlePass = (event) => {
        setPass(event.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let options = {
            username,
            password
        }

        fetch(`http://localhost:5000/loginusers`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(options)
        }).then(setRedirect(true))
            .catch((err) => console.log(err))
    }

    if (redirect) {
        return (<Navigate to="/Homepage" />)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="userName" value={username} onChange={handleUser} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePass} />
                </div>
                <button className="btn btn-secondary">Log In</button>
            </form>
            <Link to="/NewUser" className="btn btn-secondary">New User?</Link>
        </div>
    )
}

export default Login