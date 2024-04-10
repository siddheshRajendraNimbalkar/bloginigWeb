import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign , verify } from 'hono/jwt';
import { createBlogInput , updateBlogInput } from '../../../common/src/index';

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	},
    Variables: {
        userId : string,
    },
}>()

blogRouter.use("/*", async(c,next) => {
    const authHeader = c.req.header("authorization") as string;
    const user =await verify(authHeader,c.env.JWT_SECRET)

    if (user){
        c.set("userId",user.id);
        await next();
    } else{
        c.status(403);
        return c.json({error : 'User not found'});
    }
})

blogRouter.post('/' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const authorId = c.get("userId")
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
      c.status(404)
      return c.json({error: "Invalid input"})
    };

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    });

    return await c.json({
        id: blog.id
    })
})


blogRouter.put('/' , async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
 

    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if(!success){
      c.status(404)
      return c.json({error: "Invalid input"})
    };

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const blog = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author:{
                select:{
                    name:true,
                }
            }
        }
      });

      return c.json({
        blog
      })
})

blogRouter.get('/:id' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  

    try {
        const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
        where: {
            id: id
        },
        select:{
            id: true,
            title: true,
            content: true,
            author:{
                select:{
                    name: true,
                }
            }
        }
    });

    return c.json({
         blog
    })
    } catch (error) {
        c.status(500)
        return c.json({ message: "Error while fetching blog", error: error})  
    }
})

