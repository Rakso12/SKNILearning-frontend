import { Link, useNavigate } from "@tanstack/react-location";
import logo from "../../Resources/Images/logoSKNILearning.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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
    
    const { formState: { errors }, handleSubmit, register} = useForm({
        delayError: 2000,
        mode: "onChange",
    });

    const submitForm = async ({
        search,
      }) => {
        navigate({ to: '/course/search/'+search, replace: true})
      };

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
                        

                        {
                            user && 
                            <div className="flex items-center p-4">
                                <Link to="/paths">
                                    <span className="p-5 hover:bg-colord"> Paths </span>
                                </Link>
                                
                                <form onSubmit={handleSubmit(submitForm)}>
                                    <div className="relative m-8 w-72">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search courses..." required {...register("search")}/>
                                        <button type="submit" className="text-white absolute right-2 bottom-1.5 bg-colord hover:bg-colore focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5">Search</button>
                                    </div>
                                </form>

                                <Link to="/profile">
                                    { !user.isLoading && (user.image_path == null) && <img className="inline object-cover w-14 h-14 mr-2 rounded-full" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt=""/> }
                                    { !user.isLoading && (user.image_path != null) && <img className="inline object-cover w-14 h-14 mr-2 rounded-full" src={user.image_path} alt=""/>}
                                </Link>

                                <Link to="/logout">
                                    <div onClick={() => {queryClient.removeQueries("user"); logOut();}} className="bg-colord hover:bg-colore text-white font-bold py-2 px-4 rounded">
                                            Logout
                                    </div>
                                </Link>
                            </div>      
                        }
                        {
                            !user &&
                            <div className="flex items-center p-4">
                                <Link to="/pathsGuest">
                                    <span className="p-5 hover:bg-colord"> Paths </span>
                                </Link>
                                
                                <form onSubmit={handleSubmit(submitForm)}>
                                    <div className="relative m-8 w-72">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search courses..." required {...register("search")}/>
                                        <button type="submit" className="text-white absolute right-2 bottom-1.5 bg-colord hover:bg-colore focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5">Search</button>
                                    </div>
                                </form>
                                
                                <Link to="/signin">
                                    <div className="bg-colord hover:bg-colore text-white font-bold py-2 px-4 border border-colorf rounded">
                                            Log in   
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
