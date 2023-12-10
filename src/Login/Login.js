import './login.css'
import {BsFacebook, BsTwitter} from 'react-icons/bs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const handleLogin = async () => {
  // Kiểm tra thông tin đăng nhập
  if (username === 'user' && password === '123') {
  
    await localStorage.setItem('isLogined', true);
    await navigate('/home');
  }else if(username === 'admin' && password === '123' ){
    await localStorage.setItem('isLogined', true);
    await navigate('/admin');
  }
  else{
    setError("Sai mật khậu hoặc tên đăng nhập")
  }
};

const handleNameChange = (e) =>{
  setUsername(e.target.value);
}
const handlePassChange = (e) =>{
  setPassword(e.target.value);
}
  return (
    <div className='main'>
        <div className="wrapper">
          <div className="heading">
            <h1>Login</h1>
          </div>
          <div className="social">
            <a href="" className="social-links"><BsFacebook className='icon-fb-tw' /></a>
            <a href="" className="social-links"><BsTwitter className='icon-fb-tw' /></a>
          </div>
          <form  className="form-group">
            <p className="account-heading">or use your account</p>
            <input value={username} onChange={handleNameChange} type="text" placeholder="email" className="email" />
            <input value={password} onChange={handlePassChange} type="password" placeholder="password" className="passwd" />
            <a href="" className="btn btn-forget">Forget your password?</a>
            <a   onClick={handleLogin} type="submit" className="btn btn-primary">log in</a>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
  )
}

export default Login