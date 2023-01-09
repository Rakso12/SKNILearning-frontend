import React from "react"
import { useState } from "react"

function EditModal( {closeModal} )
{
    const [avatarFile, setAvatarFile] = useState("");

    const changeAvatar = async () => {
        event.preventDefault();

        let requData = new FormData();
        requData.append('avatar', avatarFile);
        
        const response = await fetch("http://oki.com:8000/api/user/1/avatar", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: requData,
            credentials: 'include',
        });

        const data = await response.json();
        
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          console.log(error);
          return;
        }

        closeModal(false);
    }

    return (
        <div className="w-full h-full bg-colore fixed flex justify-center items-center">
            <div className="w-1/2 rounded-md shadow-pathcard flex-col p-8 bg-white flex">
                <div className="flex justify-end text-2xl">
                    <button onClick={() => {closeModal(false)}} className="cursor-pointer">
                        X
                    </button>
                </div>

                <div className="flex justify-center text-2xl">
                    <h1>Choose your new avatar</h1>
                </div>
                
                <div className="pt-12 pl-12">
                    <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])}></input>
                </div>
                
                <div className="flex justify-center pt-16">
                    <button onClick={() => {closeModal(false)}} className="hover:bg-colore bg-colord text-white mx-auto border-2 round-sm w-1/3 rounded-md h-11 border-colorb/15">
                        Cancel
                    </button>
                    <button className="hover:bg-colord bg-colorc text-white mx-auto border-2 round-sm w-1/3 rounded-md h-11 border-colorb/15" onClick={changeAvatar}>Change avatar</button>
                </div>
            </div>
            </div>
    )
}

export default EditModal