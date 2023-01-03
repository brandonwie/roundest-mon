import { trpc } from '@/utils/trpc';

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'brandon' });
  if (hello.isLoading) return <div>loading...</div>;
  if (hello.data) return <div>{hello.data.greeting}</div>;
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-center'>Which Pokémon is Rounder?</div>
      <div className='p-2' /> {/* better approach without side effects */}
      <div className='border rounded p-8 flex justify-between max-w-2xl items-center'>
        <div className='w-16 h-16 bg-red-200'> </div>
        <div className='p-8'>VS</div>
        <div className='w-16 h-16 bg-red-200'> </div>
      </div>
    </div>
  );
}
