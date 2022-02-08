import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAPIAuthenticate } from '@/hooks/api/useAPIAuthenticate';

const AuthProvder: React.FC = ({ children }) => {
  const router = useRouter();
  const { mutate: mutateAuthenticate } = useAPIAuthenticate({
    onSuccess: (userData) => {
      if (userData && userData.id) {
        if (router.pathname === '/login' || router.pathname === '/register') {
          router.push('/');
        }
      }
    },
    onError: () => {
      if (router.pathname !== '/login' && router.pathname !== '/register') {
        router.push('/login');
      }
    },
  });

  useEffect(() => {
    mutateAuthenticate();
  }, [mutateAuthenticate]);

  return children as React.ReactElement;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvder>
          <Component {...pageProps} />
        </AuthProvder>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
