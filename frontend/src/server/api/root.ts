import { createTRPCRouter } from "@/server/api/trpc"
import { diagramRouter } from "@/server/api/routers/diagram"
import { userRouter } from "@/server/api/routers/user"
import { threadRouter } from "@/server/api/routers/thread"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  diagram: diagramRouter,
  thread: threadRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
