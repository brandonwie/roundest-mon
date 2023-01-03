import * as trpcNext from '@trpc/server/adapters/next';
import { AppRouter, appRouter } from '@/server/routers/_app';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
