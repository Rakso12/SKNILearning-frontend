import logo from "../../Resources/Images/logo_black.png";
import { Link, useNavigate } from "@tanstack/react-location";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function Signin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const submitForm = async() => {
    event.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json','Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
      credentials: 'include',
      body: JSON.stringify(
        {
          email,
          password
        }
      )
    };
    const response = await fetch('http://oki.com:8000/api/login', requestOptions)
    const data = await response.json();

    if(response.ok){
      console.log('Login success = ', response);
      queryClient.setQueryData(["user"], () => data.user);
      console.log('Data = ', data.user);
      navigate({ to: '/courses', replace: true })
    }

    console.log('response -- ', response);
  }

  return (
    <div>
        <div className="w-full h-screen">
            <Link to='/'>
              <img className="h-52 mx-auto pt-4 pb-6" src={logo}/>
            </Link>
            <form className="bg-colore w-30 h-auto mx-auto pt-6 bg-white shadow-pathcard" onSubmit={submitForm}>
                <div className="text-center p-14 font-medium text-4xl">
                  Log in
                </div>
                <div>
                  <div className="w-2/3 mx-auto">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Email</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" placeholder="User Email" onChange={handleEmailChange}></input>
                  </div>
                </div>
                <div>
                  <div className="w-2/3 mx-auto mt-4">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Password</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="password" placeholder="****************" onChange={handlePasswordChange}></input>
                  </div>
                </div>
                <div>
                  <div className="w-full text-center pt-8">
                    <button className="bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Continue </button>
                  </div>
                </div>
                <div className="w-2/3 mx-auto pt-4">
                  <div className="text-colord/60 hover:text-colorb">
                    <Link to="/">
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="text-colord/60 pt-2">
                    New in SKNI Learning? 
                    <Link to="/signup">
                      <span className="text-colord hover:text-colora hover:font-bold font-medium"> Sign up</span>
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

