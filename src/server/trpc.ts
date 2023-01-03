import { inferReactQueryProcedureOptions } from '@trpc/react-query';
import { TRPCError, inferRouterInputs, initTRPC } from '@trpc/server';
import { AppRouter } from './routers/_app';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
