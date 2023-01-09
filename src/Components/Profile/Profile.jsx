import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-location";
import { data } from "autoprefixer";
import EditModal from "./EditModal";
import { useState } from "react";

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
});

const getMyAuthorCourses = () => fetch(`http://oki.com:8000/api/course/author`, {
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

const getMyAttendedCourses = () => fetch(`http://oki.com:8000/api/course/myCourses`, {
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


function Profile(){

    const navigate = useNavigate();
    
    const [openModal, setOpenModal] = useState(false);

    const user = useQuery(["userInfo"], getUser);
    
    const refetchUser = () => {
        user.refetch();
    }

    if(!openModal){
        refetchUser();
    }

    const myAuthorCourses = useQuery(["myAuthorCourses"], getMyAuthorCourses);

    const myAttendedCourses = useQuery(["myAttendedCourses"], getMyAttendedCourses);

    const onClickAddCourse = () => {
        
        navigate({ to: '/add_course', replace: true})
        
        // TODO: Dodać tutaj przejście do dodania kursu
    }

    return (

        <div className="h-full">
            {openModal && <EditModal closeModal={setOpenModal}></EditModal>}
            <div className="container h-full mx-auto p-5">
                <div className="md:flex no-wrap md:-mx-2">
                    <div className="w-full md:w-3/12 md:mx-2 border-2 border-colore">
                        <div className="bg-white p-3 border-t-4 border-colore">
                            <div className="image overflow-hidden">
                                { !user.isLoading && (user.data.image_path == null) && <img className="h-96 w-auto mx-auto cursor-pointer" onClick={() => {setOpenModal(true)}} src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt=""/> }
                                { !user.isLoading && (user.data.image_path != null) && <img className="h-auto w-full mx-auto cursor-pointer" onClick={() => {setOpenModal(true)}} src={user.data.image_path} alt=""/>}
                            </div>
                            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="py-5">
                                    <span className="font-bold text-lg"> ABOUT</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        { user.isLoading && <span className="bg-green-500 py-1 px-2 rounded text-white text-sm"> Loading... </span> }
                                        { !user.isLoading && user.email_verified_at && <span className="bg-green-500 py-1 px-2 rounded text-white text-sm"> {user.data.email_verified_at} </span>}
                                        { !user.isLoading && !user.email_verified_at && <span className="bg-red-500 py-1 px-2 rounded text-white text-sm"> Not activated yet </span>}
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>First name</span>
                                    <span className="ml-auto font-semibold">{ !user.isLoading && user.data.first_name}{ user.isLoading && "Loading..."}</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Last name</span>
                                    <span className="ml-auto font-semibold">{ !user.isLoading && user.data.last_name}{ user.isLoading && "Loading..."}</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Email</span>
                                    <span className="ml-auto font-semibold">{ !user.isLoading && user.data.email}{ user.isLoading && "Loading..."}</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto font-semibold">{ !user.isLoading && user.data.created_at}{ user.isLoading && "Loading..."}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm border-2 border-colore">
                            <div className="grid grid-cols-2 space-x-8">
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span className="">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">My courses - author</span>
                                        <div className="w-1/2">
                                            <svg onClick={onClickAddCourse} className="h-8 float-right text-green-700" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="none">
                                                <path d="m0 0h32v32h-32z"/>
                                                <path d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm0 2c-7.7319865 0-14 6.2680135-14 14s6.2680135 14 14 14 14-6.2680135 14-14-6.2680135-14-14-14zm0 8c.5522847 0 1 .4477153 1 1v4h4c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-4v4c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-4h-4c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h4v-4c0-.5522847.4477153-1 1-1z" fill="#00A900"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <table className="table-auto w-full">
                                        <thead className="border-b">
                                            <tr className="bg-colord text-white">
                                                <th className="text-left p-4 font-medium">
                                                Title
                                                </th>
                                                <th className="text-left p-4 font-medium">
                                                Description
                                                </th>
                                                <th className="text-left p-4 font-medium">
                                                Rating
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { myAuthorCourses.isLoading &&  
                                                <tr className="cursor-pointer hover:bg-colorf">
                                                    <td className="p-4">Loading...</td>
                                                    <td className="p-4">Loading...</td>
                                                    <td className="p-4">Loading...</td>
                                                </tr> 
                                            }
                                            {
                                                !myAuthorCourses.isLoading && myAuthorCourses.data.map((myAuthorCourses) =>                   
                                                <tr key={myAuthorCourses.id} onClick={() => {
                                                    navigate({ 
                                                        to: '/course/' + myAuthorCourses.id,
                                                        })
                                                    }} className="cursor-pointer hover:bg-colorf">
                                                    <td className="p-4">{myAuthorCourses.title}</td>
                                                    <td className="p-4">{myAuthorCourses.description.substr(0,100).substr(0, Math.min(myAuthorCourses.description.substr(0,100).length, myAuthorCourses.description.substr(0,100).lastIndexOf(" ")))}</td>
                                                    <td className="p-4">{myAuthorCourses.rating}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span className="">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">My courses - attender</span>
                                    </div>
                                    <table className="table-auto w-full">
                                        <thead className="border-b">
                                            <tr className="bg-colord text-white">
                                                <th className="text-left p-4 font-medium">
                                                Title
                                                </th>
                                                <th className="text-left p-4 font-medium">
                                                Description
                                                </th>
                                                <th className="text-left p-4 font-medium">
                                                Rating
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { myAttendedCourses.isLoading &&  
                                                <tr className="cursor-pointer hover:bg-colorf">
                                                    <td className="p-4">Loading...</td>
                                                    <td className="p-4">Loading...</td>
                                                    <td className="p-4">Loading...</td>
                                                </tr> }
                                            {
                                                !myAttendedCourses.isLoading && myAttendedCourses.data.map((myAttendedCourses) =>                   
                                                <tr key={myAttendedCourses.id} className="cursor-pointer hover:bg-colorf" onClick={() => {
                                                    navigate({ 
                                                        to: '/course/' + myAttendedCourses.id,
                                                        })
                                                    }} >
                                                    <td className="p-4">{myAttendedCourses.title}</td>
                                                    <td className="p-4">{myAttendedCourses.description.substr(0,100).substr(0, Math.min(myAttendedCourses.description.substr(0,100).length, myAttendedCourses.description.substr(0,100).lastIndexOf(" ")))}</td>
                                                    <td className="p-4">{myAttendedCourses.rating}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Profile;