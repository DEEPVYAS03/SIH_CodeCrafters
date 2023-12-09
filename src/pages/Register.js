import React from 'react'
import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(AuthContext);
    function handleClick() {
        setUser("assss");
        navigate('/dashboard');
    }


    return (
        <><div>{user}</div><button onClick={() => handleClick()}>Click</button></>
    )
}

export default Register