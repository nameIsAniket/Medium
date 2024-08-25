import {Hono} from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

type Bindings = {
	DATABASE_URL : string;
	JWT_SECRETE : string;
}

const userRouter = new Hono<{
    Bindings : Bindings;
}>();

userRouter.post('/signup',async (c) => {
	// creating prisma client 
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json();

	const presentUser = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	})

	if (presentUser){
		c.status(403);
		return c.json({error: `${body.email} is already present`});
	}

	try{
		const user = await prisma.user.create({
			data: {
				email : body.email,
				name: body.name,
				password : body.password,
			}
		})
	
		const token = await sign({is : user.id}, c.env.JWT_SECRETE);
	
		return c.json({
			message : `${body.email} Signup Sucessfully`,
			jwtToken : token
		})
	}
	catch(e){
		console.log("_______________________")
		console.log(e);
		c.status(411);
		return c.text('Error occured while signup');
	}
})

userRouter.post('/signin', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	const token = c.req.header("Authorization") || " ";
	
	const authCheck = await verify(token, c.env.JWT_SECRETE);
	if (!authCheck.id){
		c.status(403)
		return c.text("Unauthorised session");
	}

	const user = await prisma.user.findUnique({
		where : {
			email : body.email,
			password : body.password
		}
	})

	if(!user){
		c.status(403);
		return c.text("User not found")
	}
	const jwt = await sign({id: user.id}, c.env.JWT_SECRETE);
	return c.json({jwt});
})

export {userRouter};