import logo from "../../Resources/Images/logo_black.png";
import { Link, useNavigate } from "@tanstack/react-location";
import { useState } from "react";

function Signin() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [validationError, setValidationError] = useState();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  }


  const submitForm = () => {
    event.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({first_name:firstName,last_name:lastName,email:email,password:password,password_confirmation:passwordConfirmation})
    };
    fetch('http://127.0.0.1:8000/api/register', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data);
            navigate({ to: '../', replace: true })
        })
        .catch(error => {
            console.error('There was an error!', error);
            setValidationError("");
        });
  }


  return (
    <div>
        <div className="w-full h-screen">
        <Link to="/">
          <img className="h-52 mx-auto pt-4 pb-6" src={logo}/>
        </Link>
            
            <form className="bg-colore w-30 h-auto mx-auto pt-4 bg-white shadow-pathcard" onSubmit={submitForm}>
                <div className="text-center p-14 font-medium text-4xl">
                  Make your account
                </div>

                <div>
                  <div className="flex w-2/3 mx-auto">
                    <div className="flex flex-col w-1/2 pr-2 mx-auto">
                        <label className="mb-2 text-lg font-medium">First name</label>
                        <input className="pl-4 mx-auto border-2 round-sm w-full h-11 border-colorb/15"  placeholder="Adam" onChange={handleFirstNameChange}/>
                      </div>
                      <div className="flex flex-col w-1/2 pl-2 mx-auto">
                        <label className="mb-2 text-lg font-medium">Last name </label>
                        <input className="pl-4 mx-auto border-2 round-sm w-full h-11 border-colorb/15" placeholder="Nowak" onChange={handleLastNameChange}/>
                      </div>
                  </div>
                </div>
                <div>
                  <div className="w-2/3 pt-2 mx-auto">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Email</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" placeholder="User Email" onChange={handleEmailChange}/>
                  </div>
                </div>
                <div>
                  <div className="w-2/3 mx-auto mt-4">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Password</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="password" placeholder="****************" onChange={handlePasswordChange}/>
                  </div>
                </div>
                <div>
                  <div className="w-2/3 mx-auto mt-4">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Password confirmation </label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="password" placeholder="****************" onChange={handlePasswordConfirmationChange}/>
                  </div>
                </div>
                <div>
                  <div className="w-full text-center pt-8">
                    <button className="bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Create account </button>
                  </div>
                </div>
                <div className="w-2/3 mx-auto pt-4">
                  <div className="text-colord/60">
                    Do you have some account? 
                    <Link to="/signin">
                      <span className="text-colord hover:text-colora hover:font-bold font-medium"> Sign in</span>
                    </Link>
                  </div>
                </div>
                <div className="h-10">
                </div>
            </form>
        </div>
    </div>
  );
}

export default Signin;

