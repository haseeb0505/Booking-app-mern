import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = React.useState({
        username: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext)


    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate("/")
        } catch (error) {

            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }
    }

    return (
        <div className='Login'>
            <div className="lContainer">
                <input type="text" placeholder='Username' id='username' className="lInput" onChange={handleChange} />
                <input type="password" placeholder='Password' id='password' className="lInput" onChange={handleChange} />
                <button disabled={loading} className="lButton" onClick={handleClick}>Login</button>
                {error && <span>{error.Message}</span>}
            </div>
        </div>
    )
}

export default Login