import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './router/user.js';
import { blogRouter } from './router/blog.js';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>();

app.use('/*',cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)



export default app;