import { Link } from "@tanstack/react-location";
import homeimage from "../../Resources/Images/woman.png";
import axios from "axios";

function Courses() {

    const submitForm = async() => {
        event.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { Accept: 'application/json','Content-Type': 'application/json' },
            credentials: 'include'
          };
          const response = await fetch('http://localhost:8000/api/course/2', requestOptions)
          const data = await response.json();
          if(response.ok){
            console.log("Response: OK");
          }
          console.log(data);

        }
        // const requestOptions = {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {  Accept: 'application/json','Content-Type': 'application/json' }
        // };
        // fetch('http://127.0.0.1:8000/api/courses', requestOptions)
        //     .then(async response => {
        //         const isJson = response.headers.get('content-type')?.includes('application/json');
        //         const data = isJson && await response.json();
                
        //         // check for error response
        //         if (!response.ok) {
        //             // get error message from body or default to response status
        //             const error = (data && data.message) || response.status;
        //             return Promise.reject(error);
        //         }
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.error('There was an error!', error);
        //         console.log(requestOptions);
        //     });
        


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
            JAKIŚ TEKST BO CZEMU NIE

            <form className="bg-colore w-30 h-auto mx-auto pt-6 bg-white shadow-pathcard" onSubmit={submitForm}>
                <div className="w-full text-center pt-8">
                    <button className="bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Continue </button>
                  </div>
            </form>
        </div>
        
    </div>
    );
}

export default Courses;
