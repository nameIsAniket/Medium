import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b border-slate-300 flex justify-between px-10 py-3">
        <div className="flex justify-center">
             Medium 
        </div>
        <div> <Avatar name = "Aniket" size={"big"}></Avatar> </div>
    </div>
}