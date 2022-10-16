import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-location";

const getCoursesCount = () => fetch(`http://oki.com:8000/api/course`, {
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


function Profile(){

    const { data, isLoading } = useQuery(["coursesCount"], getCoursesCount);
    // TODO - pobranie danych na temat kursów zakończonych,
    // TODO - pobranie danych na temat kursów in progress,
    // TODO - pobranie danych na temat ???

    return (
        <div>
            <div className="hidden lg:flex items-center">
                <Link to="/">
                    <span className="p-5 hover:bg-colord"> Home </span>
                </Link>
                <Link to="/certificationsGuest">
                    <span className="p-5 hover:bg-colord"> Certifications </span>
                </Link>

                <input type="search" className="mx-4 block pl-4 w-72 h-11 text-sm text-colorf bg-colord rounded-md focus:ring-1 focus:outline-none focus:ring-colore" placeholder="Search courses or path..."></input>
                
                { 
                    <div className="text-black">
                        {isLoading && "Loading..."}
                        {data && data.length} -- Courses in progress
                    </div>      
                }
            </div>
        </div>
    );

}

export default Profile;