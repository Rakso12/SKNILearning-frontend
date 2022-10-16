import logo from "../../Resources/Images/logo_black.png";
import { Link, useNavigate } from "@tanstack/react-location";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Signin() {
  const navigate = useNavigate();
  
  const schema = z.object({
    firstName: 
      z.string()
      .regex(new RegExp("\\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"), "Wrong first name"),
    lastName: 
      z.string()
      .regex(new RegExp("\\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+"), "Wrong last name"),
    email: 
      z.string()
      .email("Wrong email."),
    password: 
      z.string()
      .min(8, "Password must have at least 8 characters")
      .max(255, "PAssword must have no more than 255 characters.")
      .regex(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"), "Must contain 1 uppercase and lowercase letter, and 1 number"),
    passwordConfirmation: 
    z.string(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });
          
  const { formState: { errors }, handleSubmit, register} = useForm({
    delayError: 2000,
    mode: "onChange",
    resolver: zodResolver(schema)
  });

  const submitForm = async ({
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
  }) => {
    event.preventDefault();
    
    const response = await fetch("http://oki.com:8000/api/register", {
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirmation: passwordConfirmation,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return;
    }

    navigate({ replace: true, to: "/" });
  };


  return (
    <div>
      <div className="w-full h-screen">
        <Link to="/">
          <img className="h-52 mx-auto pt-4 pb-6" src={logo}/>
        </Link>

        <form className="bg-gray-50 w-30 h-auto mx-auto pt-4 shadow-pathcard" onSubmit={handleSubmit(submitForm)}>
          <div className="text-center p-14 font-medium text-4xl">
            Create your account
          </div>
          <div>
            <div className="flex w-2/3 mx-auto">
              <div className="flex flex-col w-1/2 pr-2 mx-auto">
                  <label className="mb-2 text-lg font-medium">First name</label>
                  <input className="pl-4 mx-auto border-2 round-sm w-full h-11 border-colorb/15" {...register("firstName")}/>
                  {errors.firstName && <div className="text-red-700 font-medium">{errors.firstName.message}</div>}
                </div>
                <div className="flex flex-col w-1/2 pl-2 mx-auto">
                  <label className="mb-2 text-lg font-medium">Last name </label>
                  <input className="pl-4 mx-auto border-2 round-sm w-full h-11 border-colorb/15" {...register("lastName")}/>
                  {errors.lastName && <div className="text-red-700 font-medium">{errors.lastName.message}</div>}
                </div>
            </div>
          </div>
          <div>
            <div className="w-2/3 pt-2 mx-auto">
              <label className="w-2/3 mx-auto text-lg font-medium"> Email</label>
            </div>
            <div className="w-full text-center pt-2">
              <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="email" {...register("email")}/>
              {errors.email && <div className="text-red-700 font-medium">{errors.email.message}</div>}
            </div>
          </div>
          
          <div>
            <div className="w-2/3 mx-auto mt-4">
              <label className="w-2/3 mx-auto text-lg font-medium"> Password</label>
            </div>
            <div className="w-full text-center pt-2">
              <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="password" {...register("password")} />
              {errors.password && <div className="text-red-700 font-medium">{errors.password.message}</div>}
            </div>
          </div>
          
          <div>
            <div className="w-2/3 mx-auto mt-4">
              <label className="w-2/3 mx-auto text-lg font-medium"> Confirm password </label>
            </div>
            <div className="w-full text-center pt-2">
              <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" type="password" {...register("passwordConfirmation")}/>
              {errors.passwordConfirmation && <div className="text-red-700 font-medium">{errors.passwordConfirmation.message}</div>}
            </div>
          </div>
          
          <div>
            <div className="w-full text-center pt-8">
              <button className="hover:bg-colord bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Create account </button>
            </div>
          </div>
          
          <div className="w-2/3 mx-auto pt-4">
            <div className="text-colord/60">
              Already have an account? 
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

