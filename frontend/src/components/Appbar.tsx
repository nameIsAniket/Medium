import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b border-slate-300 flex justify-between px-10 py-2">
        <div className="flex justify-center flex-col">
             Medium 
        </div>
        
        <div className="flex items-center"> 
            <Link to={`/publish`} className="flex items-center">
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center">New Blog</button>
            </Link>
            <Avatar name = "Aniket" size={"big"}></Avatar>
        </div>
    </div>
}