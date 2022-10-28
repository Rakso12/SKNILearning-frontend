import { Link, useNavigate } from "@tanstack/react-location";
import logo from "../../Resources/Images/logoSKNILearning.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getUser = () => fetch(`http://oki.com:8000/api/info`, {
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
    credentials: 'include'})
    .then(
        response => { 
            if(!response.ok){
                throw new Error(response.statusText)
            }
            return response.json(); 
        }
    );


function Navbar() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, refetch } = useQuery(["userInfo"], getUser);
    //Logout function
    async function logOut(){
        const requestOptions = {
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json' },
            credentials: 'include'
        };
        
        const response = await fetch('http://oki.com:8000/api/logout', requestOptions)
        const data = await response.json();
        
        if(response.ok){
            console.log("Response: OK - User Logout", response);
            // TU CHCIAŁBYM ZROBIĆ REFETCHA CHYBA
            
            // const data = queryClient.getQueryData(["course.popular"]);
            // queryClient.clear();
            // queryClient.setQueryData(["course.popular"], () => data);

            navigate({ to: '/', replace: true })
        }
        console.log(data);
    }

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
                        <Link to="/certificationsGuest">
                            <span className="p-5 hover:bg-colord"> Certifications </span>
                        </Link>

                        <input type="search" className="mx-4 block pl-4 w-72 h-11 text-sm text-colorf bg-colord rounded-md focus:ring-1 focus:outline-none focus:ring-colore" placeholder="Search courses or path..."></input>
                        
                        {
                            user && 
                            <div className="flex items-center p-4">
                                <Link to="/profile">
                                <img className="inline object-cover w-14 h-14 mr-2 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>

                                </Link>

                                <Link to="/logout">
                                    <div onClick={() => {queryClient.removeQueries("user"); logOut();}} className="bg-colord hover:bg-colore text-white font-bold py-2 px-4 border border-colorf rounded">
                                            Wyloguj
                                    </div>
                                </Link>
                            </div>      
                        }
                        {
                            !user &&
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
