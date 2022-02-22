import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAPIAuthenticate } from '@/hooks/api/useAPIAuthenticate';
import {
  AuthenticateProvider,
  useAuthenticate,
} from 'src/contexts/auth/useAuthenticate';

const AuthProvder: React.FC = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, authenticate } = useAuthenticate();
  const { mutate: mutateAuthenticate, isLoading } = useAPIAuthenticate({
    onSuccess: (userData) => {
      if (userData && userData.id) {
        authenticate();
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

  if (isLoading || (!isAuthenticated && router.pathname !== '/login')) {
    return <Spinner />;
  }

  return children as React.ReactElement;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthenticateProvider>
          <AuthProvder>
            <Component {...pageProps} />
          </AuthProvder>
        </AuthenticateProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
