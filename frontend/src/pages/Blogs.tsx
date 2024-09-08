import {BlogCard} from './../components/BlogCard'
import {Appbar} from './../components/Appbar'
import {useBlogs} from './../hooks/index'

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if (loading){
        return <div className='justify justify-center flex-col'>
            ... Loading
        </div>
    }
    

    return <div>
        <div>
            <Appbar/>
        </div>
        <div className='flex justify-center '>
            <div className='max-w-6xl '>
                {blogs.map(blog => 
                    <BlogCard
                    authorName = {blog.author.name || "Anonymous"}
                    publishDate = {'10-Jan-2000'}
                    title = {blog.title}
                    content = {blog.content}
                ></BlogCard>
                )}
            </div>
        </div>
    </div>
}
