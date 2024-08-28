interface BlogcardInput {
    authorName : string,
    publishDate : string,
    title : string,
    content : string
}

export const BlogCard = ({authorName,publishDate,title,content}:BlogcardInput) => {
    return <div>
        <div className="flex">
            <div className="flex justify-center ">
                <Avatar name = {authorName}/>
            </div>
            <div className="font-light pl-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500">
                {publishDate}
            </div>
        </div>
        <div>
            {title}
        </div>
        <div>
            {content.slice(0,100) + "..."} 
        </div>
        <div>
            {`${Math.ceil(content.length / 100)} minutes`}
        </div>
        <div className="bg-slate-400 h-1 w-full" />
    </div>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}