import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

type Bindings = {
	DATABASE_URL : string;
	JWT_SECRETE : string;
}

const blogRouter = new Hono<{
    Bindings : Bindings;
}>();

blogRouter.use("/*",async (c, next) => {

    next();
})

blogRouter.post('',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const blog = await prisma.post.create({
        data:{
            title : body.title,
            content : body.content,
            published : body.published,
            author : body.author
        }
    })
	return c.json({
        id : blog.id
    })
})

blogRouter.put('', async (c) => {

	const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

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
                author: true
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

//paggination
blogRouter.get('/bulk',async (c) => {
	
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const blogs = prisma.post.findMany();

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

export {blogRouter};