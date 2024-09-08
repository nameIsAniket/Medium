interface BlogcardInput {
    authorName : string,
    publishDate : string,
    title : string,
    content : string
}

export const BlogCard = ({authorName,publishDate,title,content}:BlogcardInput) => {
    return <div className="border-b-2 border-slate-200 pb-3 pt-2">
        <div className="flex pt-2" >
            <div className="flex justify-center">
                <Avatar name = {authorName}/>
            </div>
            <div className="flex justify-center font-normal pl-2 text-sm text-slate-700">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 font-normal flex justify-center text-slate-400 text-sm">
                {publishDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-3">
            {title}
        </div>
        <div className="text-md font-normal text-slate-500 ">
            {content.slice(0,100) + "..."} 
        </div>
        <div className="text-slate-400 text-sm pt-3">
            {`${Math.ceil(content.length / 100)} minutes read`} 
        </div>
    </div>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-5 h-5" : "w-8 h-8"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-normal text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}