import { Link, useNavigate } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function AddCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const schema = z.object({
    title: 
      z.string(),
    description:
      z.string(),
    content:
    z.string(),
  });

  const { setError, formState: { errors }, handleSubmit, register} = useForm({
    delayError: 2000,
    mode: "onChange",
    resolver: zodResolver(schema)
  });

  const submitForm = async({
    title,
    description,
    content,
  }) => {
    event.preventDefault();
    const response = await fetch("http://oki.com:8000/api/course", {
      method: 'POST',
      headers: { Accept: 'application/json','Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
      credentials: 'include',
      body: JSON.stringify(
        {
          title,
          description,
          content,
        }
      )
    });

    const data = await response.json();

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      setError('password', {
        type: "server",
        message: data.message, //Email or password is wrong <- message from backend should be
      })
      return;
    }
    await queryClient.refetchQueries();
    navigate({ replace: true, to: "/profile" });
  };


  return (
    <div>
        <div className="w-full h-screen mt-12">
            <form className="bg-gray-50 text-colorc w-30 h-auto mx-auto pt-6  shadow-pathcard" onSubmit={handleSubmit(submitForm)}>
                <div className="text-center p-14 font-medium text-4xl">
                  Add course
                </div>
                <div>
                  <div className="w-2/3 mx-auto">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Title</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" {...register("title")}></input>
                    {errors.title && <div className="text-red-700 font-medium">{errors.title.message}</div>}
                  </div>
                </div>
                <div>
                  <div className="w-2/3 mx-auto mt-4">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Description</label>
                  </div>
                  <div className="w-full text-center pt-2">
                    <input className="pl-4 mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15" {...register("description")}></input>
                    {errors.description && <div className="text-red-700 font-medium">{errors.description.message}</div>}
                  </div>
                </div>
                <div>
                  <div className="w-2/3 mx-auto mt-4">
                    <label className="w-2/3 mx-auto text-lg font-medium"> Content </label>
                  </div>
                  <div className="w-full text-center pt-2">
                  <textarea id="message" rows="4" class="w-2/3 mx-auto border-2 round-sm border-colorb/15" placeholder="..." {...register("content")}></textarea>
                    {errors.password && <div className="text-red-700 font-medium">{errors.password.message}</div>}
                  </div>
                </div>
                <div>
                  <div className="w-full text-center pt-8">
                    <button className="hover:bg-colord bg-colorb text-white mx-auto border-2 round-sm w-2/3 h-11 border-colorb/15"> Done </button>
                  </div>
                </div>
                <div className="h-10">
                </div>
            </form>
        </div>
    </div>
  );
}

export default AddCourse;

