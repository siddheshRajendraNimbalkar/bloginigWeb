import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign , verify } from 'hono/jwt';
import { signupInput , signinInput} from '../../../common/src/index'

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>()


userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body =await c.req.json();

    const { success }  = signupInput.safeParse(body);
    if(!success){
      c.status(404)
      return c.json({error: "Invalid input"})
    };

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }
    });
    const jwtToken =  await sign({id: user.id},c.env.JWT_SECRET)
    return  c.json({jwtToken})
  })
  
  userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body =await c.req.json();

    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(404)
      return c.json({error: "Invalid input"})
    };
    const user = await prisma.user.findUnique({
          where: {
              email: body.email,
              password: body.password
          }
      });
  
    if(!user){
      c.status(404);
      return c.json({error : 'User not found'});
    }
  
    const jwtToken =  await sign({id:user.id},c.env.JWT_SECRET)
      return c.json({token: jwtToken});
  })