import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"

export function TaskFormPage(){
    const {register, handleSubmit, formState:{errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        async function loadTask(){
            if(params.id){
                const {data} = await getTask(params.id);
                setValue('title', data.title);
                setValue('description', data.description);
            }
        }
        loadTask();
    }, []);

    const onSubmit = handleSubmit(async (data) =>  {
        if (params.id){
            await updateTask(params.id, data);
            toast.success("The task was successfully updated.")
        }else{
            await createTask(data);
            toast.success("The task was successfully saved.")
        }
        navigate('/tasks');
    })

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="title" 
                    {...register("title", {required: true})}
                    className="bg-zinc-700 p-3 rounded-lg block w-full"
                    autoComplete="off"
                />
                    <br />
                    {errors.title && <span>This field is requerid</span>}
                    <br />
                <textarea 
                    placeholder="Description" id="" cols="30" rows="10"
                    {...register("description", {required: true})}
                    className="bg-zinc-700 p-3 rounded-lg block w-full"
                >    
                </textarea>
                <br />
                {errors.description && <span>This field is requerid</span>}
                <br />
                <button
                    className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
                >Save</button>
            </form>
            {params.id && (
            <button
                onClick={async ()=>{
                    const accepted = window.confirm("are you sure?");
                    if(accepted){
                        await deleteTask(params.id);
                        toast.success("The task was successfully deleted.")
                        navigate('/tasks')
                    }
                }}
                className="bg-red-500 p-3 rounded-lg block w-48 mt-3"
            >Delete</button>)}
        </div>
    )
}