/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '../utils/getRandomPokemon';

import Image from 'next/image';

export default function Home() {
  const [ids, updateIds] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    updateIds(getOptionsForVote());
  }, []);

  const [firstPokemon, secondPokemon] = trpc.useQueries((t) => [
    t.getPokemonById({ id: ids[0] }),
    t.getPokemonById({ id: ids[1] }),
  ]);

  if (firstPokemon.status === 'loading' || secondPokemon.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (firstPokemon.data && secondPokemon.data) {
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <div className='text-2xl'>Which Pokémon is Rounder?</div>
        <div className='p-2' /> {/* better approach without side effects */}
        <div className='border rounded p-8 flex justify-between max-w-2xl items-center'>
          <div className='w-64 h-64'>
            <img
              className={'w-full'}
              src={firstPokemon.data.sprites.front_default ?? ''}
              alt={firstPokemon.data.name}
            />
            <div className='text-xl text-center capitalize mt-[-2rem]'>
              {firstPokemon.data?.name}
            </div>
          </div>
          <div className='p-8'>VS</div>
          <div className='w-64 h-64'>
            <img
              className={'w-full'}
              src={secondPokemon.data?.sprites.front_default ?? ''}
              alt={secondPokemon.data?.name}
            />
            <div className='text-xl text-center capitalize mt-[-2rem]'>
              {secondPokemon.data?.name}
            </div>
          </div>
          <div className='p-2' />
        </div>
      </div>
    );
  }
}
