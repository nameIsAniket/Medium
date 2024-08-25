import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from '@aniket_lakade/medium-common'

const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRETE : string;
    },
    Variables : {
        userId : string;
    }
}>();

blogRouter.use("/*",async (c, next) => {
    const authHeader = c.req.header("authorization") || " ";
    const user = await verify(authHeader, c.env.JWT_SECRETE);
    try{
        if (user){
            c.set("userId", String(user.id));
            await next();
        }else{
            c.status(403)
            return c.json({
                message : "You are not logged in"
            })
        }
    }catch(e){
        c.status(403);
        return c.json({
            message : "You are not logged in"
        })
    }
})

blogRouter.post('/',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if (!success){
        c.status(411);
        return c.json({
            message : "Invalid Input"
        })
    }

    const autherId = await c.get("userId");

    const blog = await prisma.post.create({
        data:{
            title : body.title,
            content : body.content,
            published : body.published,
            authorId : autherId
        }
    })
	return c.json({
        id : blog.id
    })
})

blogRouter.put('/', async (c) => {

	const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if (!success){
        c.status(411);
        return c.json({
            message : "Invalid Input"
        })
    }


    const blog = await prisma.post.update({
        where: {
            id : body.id
        },
        data:{
            title : body.title,
            content : body.content
        }
    })
	return c.json({
        id : blog.id
    })
})

//paggination 
blogRouter.get('/bulk',async (c) => {
	
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const blogs = prisma.post.findMany({
            select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name :  true,
                    }
                }
            }
        });

        return c.json({
            blogs
        })
    }
    catch(error){
        c.status(411);
        return c.json({
            msg: "Error occured while fetching the blogs",
            error: error
        })
    }
})

blogRouter.get('/:id',async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id = await c.req.param("id");

    try {
        const blogs = await prisma.post.findFirst({
            where:{
                id : id
            },
            select: {
                id : true,
                title: true,
                content: true,
                author: {
                    select: {
                        name : true
                    }
                }
            }
        })
        return c.json({
            blogs
        })
    }
    catch (error){
        c.status(411);
        return c.json({
            message : "Error fetching the code ",
            error : error
        })
    }

   
})


export {blogRouter};