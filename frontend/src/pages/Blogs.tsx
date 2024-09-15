import {BlogCard} from './../components/BlogCard'
import {Appbar} from './../components/Appbar'
import {useBlogs} from './../hooks/index'
import {BlogSkeleton} from './../components/BlogSkeleton'

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if (loading){
        return <div>
            <div>
                <Appbar/>
            </div>
            <div>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
        </div>
    }

    return <div>
        <div>
            <Appbar/>
        </div>
        <div className='flex justify-center'>
            <div>
            {blogs.map(blog => 
            <BlogCard
                authorName = {blog.author.name || "Anonymous"}
                publishDate = {'10-Jan-2000'}
                title = {blog.title}
                content = {blog.content}
                id = {blog.id}
            ></BlogCard>
            )}
            </div>
        </div>
    </div>
}
