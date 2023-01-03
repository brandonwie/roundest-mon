import type { AppType } from 'next/app';
import { trpc } from '@/utils/trpc';

import '@/styles/global.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRouter } from '@/server/routers/_app';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </>
  );
};

export default trpc.withTRPC(MyApp);
