import react from 'react';
import './Formbar.css';
import { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Formbar = () => {
    const [formsData, setFormsData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: ""
    })
    const changeData = (e) => {
        setFormsData({ ...formsData, [e.target.name]: e.target.value })
    };

    async function handleSubmit(e){
        e.preventDefault();
        const databaseUrl = await fetch("http://localhost:4000/api/v1/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formsData)
        });
        const data = await databaseUrl.json();
        alert(data.message);

        console.log("Submitting:", formsData);
    }

  return (
    <div className='formbar'>
      <div className="container">
        <h2>Sign Up Form</h2>

        <form onSubmit={handleSubmit}>
            <div className="label-input">
                <label>First Name</label>
                <div className="input">
                    <span><FaUser /></span>
                    <input 
                    type="text" 
                    id="firstName"
                    placeholder="type your first Name" 
                    name="firstName" 
                    value={formsData.firstName} 
                    onChange={changeData} />
                </div>
            </div>

              <div className="label-input">
                <label>Last Name</label>
                <div className="input">
                    <span><FaUser /></span>
                    <input 
                    type="text" 
                    id="lastName"
                    placeholder="type your last Name" 
                    name="lastName" 
                    value={formsData.lastName} 
                    onChange={changeData} />
                </div>
            </div>

            <div className="label-input">
                <label>Email</label>
                <div className="input">
                    <span><MdOutlineEmail /></span>
                    <input 
                    type="email" 
                    id="email" 
                    placeholder="type your email" 
                    name="email" 
                    value={formsData.email} 
                    onChange={changeData} />
                </div>
            </div>

            <div className="label-input">
                <label>Username</label>
                <div className="input">
                    <span><FaUser /></span>
                    <input 
                    type="text" 
                    placeholder="type your username" 
                    name="userName" 
                    value={formsData.userName} 
                    onChange={changeData} />
                </div>
            </div>

            <div className="label-input">
                <label>Password</label>
                <div className="input">
                    <span><FaLock /></span>
                    <input 
                    type="password" 
                    placeholder="type your password" 
                    name="password" 
                    value={formsData.password} 
                    onChange={changeData} />
                </div>
            </div>
            <p className="forget"><a href="#">Forget password?</a></p>
            
            <button className="btn" type="submit" aria-label="login">Login
            </button>
            
            <div className="socials">
                <p>Or sign in using this</p>
                <div className="icons">
                    <a href="#" title="Facebook">
                        <FaFacebookSquare />
                    </a>
                    <a href="#" title="Twitter">
                        <FaTwitter />
                    </a>
                    <a href="#" title="Google">
                        <SiGmail />
                    </a>
                </div>
            </div>
        </form>
    </div>
    </div>
    
  )
}; 

export default Formbar;