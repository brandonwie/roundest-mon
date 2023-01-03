import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { PokemonClient } from 'pokenode-ts';

export const appRouter = router({
  // Define a procedure
  getPokemonById: publicProcedure
    .input(z.object({ id: z.number() }).required())
    .query(({ input }) => {
      const api = new PokemonClient();

      const pokemon = api.getPokemonById(input.id);

      return pokemon;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
