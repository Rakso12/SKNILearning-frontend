import logo from "../../Resources/Images/logo_black.png";
import { Link, useNavigate } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Signin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const schema = z.object({
    email: 
      z.string()
      .email("Wrong email."),
    password:
      z.string(),
  });

  const { setError, formState: { errors }, handleSubmit, register} = useForm({
    delayError: 2000,
    mode: "onChange",
    resolver: zodResolver(schema)
  });

  const submitForm = async({
    email,
    password,
  }) => {
    event.preventDefault();
    const response = await fetch("http://oki.com:8000/api/login", {
      method: 'POST',
      headers: { Accept: 'application/json','Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
      credentials: 'include',
      body: JSON.stringify(
        {
          email,
          password
        }
      )
    });

    const data = await response.json();

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      setError('password', {
        type: "server",
        message: data.message, //Email or password is wrong <- message from backend should be
      })
      return;
    }
    console.log('Login success = ', response);
    queryClient.setQueryData(["userInfo"], () => data.user);
    navigate({ replace: true, to: "/" });
  };


  return (
    <div>
        <div className="w-full h-screen">
            <Link to='/'>
              <img className="h-52 mx-auto pt-4 pb-6" src={logo}/>
            </Link>
            <form className="bg-gray-50 text-colorc w-30 h-auto mx-auto pt-6  shadow-pathcard" onSubmit={handleSubmit(submitForm)}>
                <div className="text-center p-14 font-medium text-4xl">
                  Log in
                </div>
                <div>
                  <div className="w-2/3 mx-auto">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Email</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" {...register("email")}></input>
                    {errors.email && <div className="text-red-700 font-medium">{errors.email.message}</div>}
                  </div>
                </div>
                <div>
                  <div className="w-2/3 mx-auto mt-4">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Password</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="password" {...register("password")}></input>
                    {errors.password && <div className="text-red-700 font-medium">{errors.password.message}</div>}
                  </div>
                </div>
                <div>
                  <div className="w-full text-center pt-8">
                    <button className="hover:bg-colord bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Continue </button>
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

