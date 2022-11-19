import { useNavigate } from "@tanstack/react-location";
import homeimage from "../../Resources/Images/woman.png";
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useQuery } from "@tanstack/react-query";

const getGuestCertifications = () => fetch(`http://oki.com:8000/api/certificate`).then(response => response.json());

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
  ]

function Certificate() {

    const { data, error, isLoading } = useQuery(["certificate"], getGuestCertifications);

    const navigate = useNavigate();
    
    const onClickHref = ( post ) => {
        
    }

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
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">CERRTIFICATEEEE</h1>

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
                                    <a href={option.href} className="py-2 text-sm px-4 block" >
                                    {option.name}
                                    </a>
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
                        Author
                        </th>
                        <th className="text-left p-4 font-medium">
                        Lesson Count
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && 
                    data.map((certificate) =>                   
                            <tr key={certificate.id} onClick={() => {
                                console.log("DUPA" + certificate.title); 
                                let temp = '?cert='+ certificate.title; // ?cert=Certyfikat Podstawy programowania w języku python
                                console.log(temp);
                                navigate({ 
                                    to: '/certifications/'+certificate.id, 
                                    replace: true, 
                                    })
                                }
                                } className="cursor-pointer hover:bg-colorf">

                                <td className="p-4">{certificate.title}</td>
                                <td className="p-4">{certificate.author}</td>
                                <td className="p-4">{certificate.lesson_count}</td>
                            </tr>
                    )}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Certificate;
