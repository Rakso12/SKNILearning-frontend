import { Link } from "@tanstack/react-location";
import homeimage from "../../Resources/Images/woman.png";
import { useQuery } from "@tanstack/react-query";

const getSearchedCourses = () => fetch(`http://oki.com:8000/api/course/search/`+props.search).then(response => response.json());

function Courses( props ) {

    const submitForm = async() => {
        
        event.preventDefault();
        const requestOptions = {
            method: 'GET',
            headers: { Accept: 'application/json','Content-Type': 'application/json' },
            credentials: 'include'
        };
        
        const response = await fetch('http://oki.com:8000/api/course/2', requestOptions)
        const data = await response.json();
        
        if(response.ok){
            console.log("Response: OK", response);
        }
        console.log(data);
    }    

    const { data, error, isLoading } = useQuery(["course.popular"], getPopularCourses);

    if(isLoading) {console.log(); return "Loading...";}
    if(error) {
        if(error.message == "Unauthenticated."){
            //TODO UNIEWAŻNIENIE USERA.
        } 
        return "An error has occured: " + error.message;
    }

    return (
    <div>
        <div className='bg-colore w-full h-96  text-white'>
            <div className="mx-auto flex h-full w-3/5 items-center justify-center">
                <div className="w-full space-y-8 px-4 xl:w-1/2">
                    <h1 className="text-5xl text-left">SKNI Learning: Learn, experience, Grow</h1>
                    <p className="max-w-[60ch] font-thin text-left">Take part in learning paths, discover new opportunities, and take advantage of personalized courses just for YOU!</p>
                </div>
                <div className="relative hidden h-full w-1/2 px-4 xl:block">
                    <img className="absolute bottom-0 right-0 h-full object-contain object-bottom" src={homeimage} />
                </div>
            </div>
        </div>
        <div className="bg-colorc text-white w-full h-96">
            <div>
                {data.map((course) => <div key={course.id}>{course.title}</div>)}
            </div>

            <form className="bg-colore w-30 h-auto mx-auto pt-6 shadow-pathcard" onSubmit={submitForm}>
                <div className="w-full text-center pt-8">
                    <button className="bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Continue </button>
                  </div>
            </form>
        </div>
        
    </div>
    );
}

export default Courses;
