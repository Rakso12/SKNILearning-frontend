import { Link } from "@tanstack/react-location";
import { useState } from "react";
import logo from "../../Resources/Images/logoSKNILearning.png";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
        <nav className="bg-colora text-white border-b-2 border-colorf">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">  
                        <Link to="/">
                            <div className="flex-shrink-0">
                                <img className="h-10" src={logo} alt="Logo skni learning"/>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center">
                        <Link to="/">
                            <span className="p-5 hover:bg-colord"> Home </span>
                        </Link>
                        <Link to="/">
                            <span className="p-5 hover:bg-colord"> Certifications </span>
                        </Link>

                        <input type="search" className="mx-4 block pl-4 w-72 h-11 text-sm text-colorf bg-colord rounded-md focus:ring-1 focus:outline-none focus:ring-colore" placeholder="Search courses or path..."></input>
                        
                        {
                            isLogged && 
                            <div className="flex items-center p-4">
                                <Link to="/">
                                    <span className="p-10">
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.146 3.248a2 2 0 0 1 3.708 0A7.003 7.003 0 0 1 19 10v4.697l1.832 2.748A1 1 0 0 1 20 19h-4.535a3.501 3.501 0 0 1-6.93 0H4a1 1 0 0 1-.832-1.555L5 14.697V10c0-3.224 2.18-5.94 5.146-6.752zM10.586 19a1.5 1.5 0 0 0 2.829 0h-2.83zM12 5a5 5 0 0 0-5 5v5a1 1 0 0 1-.168.555L5.869 17H18.13l-.963-1.445A1 1 0 0 1 17 15v-5a5 5 0 0 0-5-5z" fill="#ffffff"/>
                                    </svg> 
                                    </span>
                                </Link>

                                <Link to="/">
                                    <img className="inline object-cover w-11 h-11 mr-2 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Avatar"/>
                                </Link>
                            </div>      
                        }
                        {
                            !isLogged &&
                            <div>
                                <Link to="/signin">
                                    <div className="bg-colord hover:bg-colore text-white font-bold py-2 px-4 border border-colorf rounded">
                                            Zaloguj     
                                    </div>
                                </Link>
                            </div>
                        }

                    </div>
                    
                </div>
            </div>
        </nav>
    </div>
  );
}

export default Navbar;
