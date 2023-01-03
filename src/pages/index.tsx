/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '../utils/getRandomPokemon';

import Image from 'next/image';
import { ReactQueryOptions } from '../server/trpc';
import { RouterOutput } from './api/trpc/[trpc]';

const btn =
  'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

export default function Home() {
  const [ids, updateIds] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    updateIds(getOptionsForVote());
  }, []);

  const [firstPokemon, secondPokemon] = trpc.useQueries((t) => [
    t.getPokemonById({ id: ids[0] }),
    t.getPokemonById({ id: ids[1] }),
  ]);

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote());
  };

  if (firstPokemon.data && secondPokemon.data) {
    return (
      <>
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
          <div className='text-2xl'>Which Pokémon is Rounder?</div>
          <div className='p-2' /> {/* better approach without side effects */}
          <div className='border rounded p-8 flex justify-between max-w-2xl items-center'>
            {!firstPokemon.isLoading &&
              firstPokemon.data &&
              !secondPokemon.isLoading &&
              secondPokemon.data && (
                <>
                  <PokemonListing
                    pokemon={firstPokemon.data}
                    vote={() => voteForRoundest(ids[0])}
                  />
                  <div className='p-8'>VS</div>
                  <PokemonListing
                    pokemon={secondPokemon.data}
                    vote={() => voteForRoundest(ids[1])}
                  />
                </>
              )}
            <div className='p-8' />
          </div>
        </div>
      </>
    );
  }
}

type PokemonFromServer = RouterOutput['getPokemonById'];
const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className='w-64 h-64 flex flex-col items-center'>
      <img
        className={'w-64 aspect-square'}
        src={props.pokemon.sprites.front_default ?? ''}
        alt={props.pokemon.name}
      />
      <div className='text-xl text-center capitalize mt-[-2rem]'>
        {props.pokemon.name}
      </div>
      <button onClick={() => props.vote()} className={btn}>
        Vote
      </button>
    </div>
  );
};
