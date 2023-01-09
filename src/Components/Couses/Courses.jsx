import { useNavigate } from "@tanstack/react-location";
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useQuery } from "@tanstack/react-query";

const sortOptions = [
    { name: 'Best Rating', current: false },
    { name: 'Newest', current: true },
  ]

const Courses =( props ) => {

    const [sortBy, setSortType] = useState("Newest");

    var url = "http://oki.com:8000/api/course/search/" + props.title;

    const navigate = useNavigate();

    const getSearchedCourses = () => fetch(url, {
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
    
    const { data, error, isLoading, refetch } = useQuery(["searchedCourses"], getSearchedCourses);
    refetch();
    if(isLoading) {return "Loading...";}
    if(error) {
        if(error.message == "Unauthenticated."){
            //TODO UNIEWAŻNIENIE USERA.
        } 
        return "An error has occured: " + error.message;
    }

    
    const sortedCourses = [...data].sort((a, z) => { // sort jest metodą destruktywną, więc kopiujemy tablicę
        if (sortBy === "Newest") { 
            return new Date(z.created_at).getTime() - new Date(a.created_at).getTime(); }// zakładając, że właściwość `createdAt` jest typu `string` parsowalnym przez konstruktor `Date`, np. ISO 8601
        if (sortBy === "Rating") {
            return z.rating - a.rating // zakładając, że właściowść `rating` jest liczbą
        }
        return 0;
      });

    return (
    <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Available courses</h1>

                <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                Sort
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                            {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                {({ active }) => (
                                    <span onClick={() => {
                                            switch (option.name) {
                                                case 'Best Rating':
                                                    setSortType("Rating");
                                                    console.log(sortedCourses);

                                                    break;
                                                case 'Newest':
                                                    setSortType("Newest");
                                                    console.log(sortedCourses);
                                                    break;
                                                default:
                                                    break;
                                            }   
                                            
                                        }
                                        }  className="py-2 text-sm px-4 block cursor-pointer hover:bg-colore" >
                                    {option.name}
                                    </span>
                                )}
                                </Menu.Item>
                            ))}
                            </div>
                        </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>

        <div className="w-3/4 mx-auto pt-10">
            <div className="bg-white">
                <div className="overflow-x-auto border-x border-t">
                    <table className="table-auto w-full">
                        <thead className="border-b">
                            <tr className="bg-colord text-white">
                                <th className="text-left p-4 font-medium">
                                Title
                                </th>
                                <th className="text-left p-4 font-medium">
                                Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && 
                            sortedCourses.map((course) =>      
                                        
                                    <tr key={course.id} onClick={() => {
                                        navigate({ 
                                            to: `/course/${course.id}`,
                                            })
                                        }
                                    } className="cursor-pointer hover:bg-colorf">

                                        <td className="p-4">{course.title}</td>
                                        <td className="p-4">{course.description.substr(0,120).substr(0, Math.min(course.description.substr(0,120).length, course.description.substr(0,120).lastIndexOf(" ")))}...</td>
                                    </tr>
                            )}
                            { isLoading && <span> Loading...</span>}
                            { data && !data.length && <span> We couldn't find the course, try searching for something else... </span>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    );
}

export default Courses;
