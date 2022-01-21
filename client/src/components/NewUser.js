import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NewUser() {

    const [username, setUser] = useState("")
    const [password, setPass] = useState("")

    const handleUser = (event) => {
        setUser(event.target.value)
    }

    const handlePass = (event) => {
        setPass(event.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await fetch("http://localhost:5000/registerusers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            alert("Sign Up Successful, Please Return To Sign In Page.")
        } catch (err) {
            console.error(err.message)
        }
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
                <button className="btn btn-secondary">Sign Up</button>
                <Link to="/" className="btn btn-secondary">Return To Login</Link>
            </form>
        </div>
    )
}

export default NewUser