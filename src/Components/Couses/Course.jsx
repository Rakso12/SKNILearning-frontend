import { useNavigate } from "@tanstack/react-location";
import { useQuery } from "@tanstack/react-query";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import style from "./markdown.module.css";

const Course = ( props ) => {

    var url = "http://oki.com:8000/api/course/" + props.course_id;
    console.log(url);
    const navigate = useNavigate();

    const getCourse = () => fetch(url, {
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
    });
    
    const onClickCourseFinished = async () => {
        console.log("finished?")
        const response = await fetch("http://oki.com:8000/api/course/" + props.course_id, {
            body: JSON.stringify({
                
            state: "is_finished"
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        });
    }

    const addToMyCourses = async () => {
        const response = await fetch("http://oki.com:8000/api/course/" + props.course_id + "/join", {
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json' },
            credentials: 'include',
        });
    }

    const { data, error, isLoading, refetch } = useQuery(["course"], getCourse);
    refetch();
    let isFinished = false;
    console.log(data);

    if(isLoading) {console.log(); return "Loading...";}
    if(error) {
        if(error.message == "Unauthenticated."){
            //TODO UNIEWAŻNIENIE USERA.
        } 
        return "An error has occured: " + error.message;
    }

    return (
    <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex border-b border-gray-200 pt-24 pb-6">
                <figure className="flex bg-gray-100 h-56">
                    {
                        isFinished &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto w-1/2 h-1/2" viewBox="0 0 93.56 122.88"><g fill="#7CE25D"><path className="cls-1" d="M90.12,112.94l-11.7-2.1-5.81,10.39c-4.21,5.22-6.88-3.36-8.06-6.35L53.26,93.58c2.6-.9,5.74-3.51,9-6.43,6.43.13,12.42-1,16.83-6.6l13,25.08,1.13,2.4c.88,3.13.42,5.2-3,4.91Zm-86.68,0,11.7-2.1L21,121.23c4.21,5.22,6.88-3.36,8.06-6.35L40.3,93.58c-2.6-.9-5.74-3.51-9-6.43-6.43.13-12.42-1-16.83-6.6l-13,25.08L.39,108c-.89,3.13-.42,5.2,3.05,4.91ZM70.5,8a6,6,0,0,1,2,1.26l5.72,5.28h0a6.59,6.59,0,0,1,1.4,1.89,5.7,5.7,0,0,1,.56,2.33,6.18,6.18,0,0,1-.39,2.37,5.51,5.51,0,0,1-1.3,2l-.76.83a34.66,34.66,0,0,1,3,7l.55,0a5.88,5.88,0,0,1,2.37.38,6,6,0,0,1,2,1.27l0,0a5.8,5.8,0,0,1,1.37,1.91,6.16,6.16,0,0,1,.55,2.29l.29,7.87A5.87,5.87,0,0,1,86.3,49a6,6,0,0,1-1.94,1.41,6.2,6.2,0,0,1-2.33.52l-1.14,0a35.18,35.18,0,0,1-2.83,7l.41.36.11.11a5.9,5.9,0,0,1,1.33,1.94,6,6,0,0,1,.52,2.29,6.16,6.16,0,0,1-.35,2.3,6.29,6.29,0,0,1-1.19,2l-.07.07L73.5,72.71a6.1,6.1,0,0,1-1.9,1.44,5.9,5.9,0,0,1-2.37.56,6.5,6.5,0,0,1-2.4-.39,5.59,5.59,0,0,1-2-1.3L64,72.2a34.45,34.45,0,0,1-6.89,2.92l0,.57a5.49,5.49,0,0,1-.39,2.36,5.64,5.64,0,0,1-1.26,2l0,0a5.66,5.66,0,0,1-1.91,1.37,6.12,6.12,0,0,1-2.28.56l-7.87.28A5.88,5.88,0,0,1,39,80.69a6.15,6.15,0,0,1-1.41-1.94A6.4,6.4,0,0,1,37,76.42l0-1.15A34.85,34.85,0,0,1,30,72.44l-.38.41-.1.11a5.75,5.75,0,0,1-1.94,1.33,6.26,6.26,0,0,1-4.58.17,6.52,6.52,0,0,1-2-1.19l-.07-.07L15.2,67.81a6.68,6.68,0,0,1-1.4-1.91,6,6,0,0,1-.56-2.33,6.61,6.61,0,0,1,.39-2.36,6.46,6.46,0,0,1,1.3-2l.81-.87a35.39,35.39,0,0,1-2.92-6.9l-.56,0a5.49,5.49,0,0,1-2.36-.39,5.82,5.82,0,0,1-2-1.26l0,0a5.91,5.91,0,0,1-1.37-1.91,6.41,6.41,0,0,1-.55-2.29l-.29-7.87A6.47,6.47,0,0,1,6,35.36a6.41,6.41,0,0,1,1.26-2A6.15,6.15,0,0,1,9.2,31.92a6.4,6.4,0,0,1,2.33-.52l1.14,0a35.32,35.32,0,0,1,2.84-7L15.14,24a5.6,5.6,0,0,1-1.41-1.94,5.86,5.86,0,0,1-.56-2.33,5.75,5.75,0,0,1,.39-2.36,6.07,6.07,0,0,1,1.26-2L20.1,9.62v0A6.49,6.49,0,0,1,22,8.18a5.85,5.85,0,0,1,2.33-.55A6.36,6.36,0,0,1,26.69,8a5.51,5.51,0,0,1,2,1.3l.89.82a35.12,35.12,0,0,1,6.87-2.92l0-.6a5.64,5.64,0,0,1,.39-2.36,6,6,0,0,1,1.26-2l0,0A5.73,5.73,0,0,1,40,.85,6.17,6.17,0,0,1,42.28.29L50.14,0a6.53,6.53,0,0,1,2.37.35,5.53,5.53,0,0,1,2,1.27A5.86,5.86,0,0,1,56,3.55a6.4,6.4,0,0,1,.52,2.33l0,1.14a35.37,35.37,0,0,1,7,2.83l.35-.37a5.57,5.57,0,0,1,1.94-1.4,5.78,5.78,0,0,1,2.33-.56,5.91,5.91,0,0,1,2.36.38V8ZM37.83,35l5.69,5.36L54.94,28.7c1.13-1.15,1.84-2.06,3.23-.63L62.7,32.7c1.49,1.47,1.41,2.33,0,3.7L46.09,52.71c-3,2.9-2.44,3.08-5.43.11L30.2,42.42a1.32,1.32,0,0,1,.13-2l5.25-5.44c.8-.82,1.43-.77,2.25,0ZM41.73,16A25.64,25.64,0,1,1,21.65,46.21,25.65,25.65,0,0,1,41.73,16Z"/></g></svg>
                    }
                    {
                        !isFinished &&
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto flex px-12" viewBox="0 0 93.56 122.88"><g fill="#B8B8B8"><path className="cls-1" d="M90.12,112.94l-11.7-2.1-5.81,10.39c-4.21,5.22-6.88-3.36-8.06-6.35L53.26,93.58c2.6-.9,5.74-3.51,9-6.43,6.43.13,12.42-1,16.83-6.6l13,25.08,1.13,2.4c.88,3.13.42,5.2-3,4.91Zm-86.68,0,11.7-2.1L21,121.23c4.21,5.22,6.88-3.36,8.06-6.35L40.3,93.58c-2.6-.9-5.74-3.51-9-6.43-6.43.13-12.42-1-16.83-6.6l-13,25.08L.39,108c-.89,3.13-.42,5.2,3.05,4.91ZM70.5,8a6,6,0,0,1,2,1.26l5.72,5.28h0a6.59,6.59,0,0,1,1.4,1.89,5.7,5.7,0,0,1,.56,2.33,6.18,6.18,0,0,1-.39,2.37,5.51,5.51,0,0,1-1.3,2l-.76.83a34.66,34.66,0,0,1,3,7l.55,0a5.88,5.88,0,0,1,2.37.38,6,6,0,0,1,2,1.27l0,0a5.8,5.8,0,0,1,1.37,1.91,6.16,6.16,0,0,1,.55,2.29l.29,7.87A5.87,5.87,0,0,1,86.3,49a6,6,0,0,1-1.94,1.41,6.2,6.2,0,0,1-2.33.52l-1.14,0a35.18,35.18,0,0,1-2.83,7l.41.36.11.11a5.9,5.9,0,0,1,1.33,1.94,6,6,0,0,1,.52,2.29,6.16,6.16,0,0,1-.35,2.3,6.29,6.29,0,0,1-1.19,2l-.07.07L73.5,72.71a6.1,6.1,0,0,1-1.9,1.44,5.9,5.9,0,0,1-2.37.56,6.5,6.5,0,0,1-2.4-.39,5.59,5.59,0,0,1-2-1.3L64,72.2a34.45,34.45,0,0,1-6.89,2.92l0,.57a5.49,5.49,0,0,1-.39,2.36,5.64,5.64,0,0,1-1.26,2l0,0a5.66,5.66,0,0,1-1.91,1.37,6.12,6.12,0,0,1-2.28.56l-7.87.28A5.88,5.88,0,0,1,39,80.69a6.15,6.15,0,0,1-1.41-1.94A6.4,6.4,0,0,1,37,76.42l0-1.15A34.85,34.85,0,0,1,30,72.44l-.38.41-.1.11a5.75,5.75,0,0,1-1.94,1.33,6.26,6.26,0,0,1-4.58.17,6.52,6.52,0,0,1-2-1.19l-.07-.07L15.2,67.81a6.68,6.68,0,0,1-1.4-1.91,6,6,0,0,1-.56-2.33,6.61,6.61,0,0,1,.39-2.36,6.46,6.46,0,0,1,1.3-2l.81-.87a35.39,35.39,0,0,1-2.92-6.9l-.56,0a5.49,5.49,0,0,1-2.36-.39,5.82,5.82,0,0,1-2-1.26l0,0a5.91,5.91,0,0,1-1.37-1.91,6.41,6.41,0,0,1-.55-2.29l-.29-7.87A6.47,6.47,0,0,1,6,35.36a6.41,6.41,0,0,1,1.26-2A6.15,6.15,0,0,1,9.2,31.92a6.4,6.4,0,0,1,2.33-.52l1.14,0a35.32,35.32,0,0,1,2.84-7L15.14,24a5.6,5.6,0,0,1-1.41-1.94,5.86,5.86,0,0,1-.56-2.33,5.75,5.75,0,0,1,.39-2.36,6.07,6.07,0,0,1,1.26-2L20.1,9.62v0A6.49,6.49,0,0,1,22,8.18a5.85,5.85,0,0,1,2.33-.55A6.36,6.36,0,0,1,26.69,8a5.51,5.51,0,0,1,2,1.3l.89.82a35.12,35.12,0,0,1,6.87-2.92l0-.6a5.64,5.64,0,0,1,.39-2.36,6,6,0,0,1,1.26-2l0,0A5.73,5.73,0,0,1,40,.85,6.17,6.17,0,0,1,42.28.29L50.14,0a6.53,6.53,0,0,1,2.37.35,5.53,5.53,0,0,1,2,1.27A5.86,5.86,0,0,1,56,3.55a6.4,6.4,0,0,1,.52,2.33l0,1.14a35.37,35.37,0,0,1,7,2.83l.35-.37a5.57,5.57,0,0,1,1.94-1.4,5.78,5.78,0,0,1,2.33-.56,5.91,5.91,0,0,1,2.36.38V8ZM37.83,35l5.69,5.36L54.94,28.7c1.13-1.15,1.84-2.06,3.23-.63L62.7,32.7c1.49,1.47,1.41,2.33,0,3.7L46.09,52.71c-3,2.9-2.44,3.08-5.43.11L30.2,42.42a1.32,1.32,0,0,1,.13-2l5.25-5.44c.8-.82,1.43-.77,2.25,0ZM41.73,16A25.64,25.64,0,1,1,21.65,46.21,25.65,25.65,0,0,1,41.73,16Z"/></g></svg>    
                    }
                    <div className="p-2 text-center md:text-left">
                        <blockquote>
                            <p className="p-4 text-3xl">
                                <span className="">{!isLoading && data.title}</span>
                                <button className="float-right bg-green-800 rounded-md px-3 py-2 text-base text-white hover:bg-green-600" onClick={ addToMyCourses }> Add to my courses</button>
                            </p>
                            <p className="p-4 text-lg">
                                {!isLoading && data.description}
                            </p>
                        </blockquote>
                    </div>
                </figure>
            </div>
        </div>

        <div className="w-3/4 mx-auto">
            <div className="bg-white">
                <div className="mx-auto w-3/4 pb-2 mt-12">
                    {!isLoading && 
                        
                        <ReactMarkdown className={style.ReactMarkdown} children={data.content} remarkPlugins={[remarkGfm]} />
                    }
                    {
                    <div className="bg-colord w-40 text-center mx-auto mt-12 hover:bg-colore text-white font-bold py-2 px-4 border border-colorf rounded" onClick={ onClickCourseFinished }>
                            Complete the course!
                    </div>
                    }
                </div>
            </div>
        </div>
        

    </div>
    );
}

export default Course;
