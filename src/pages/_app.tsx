import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { client } from '@/lib/ApolloService'
import { ApolloProvider } from '@apollo/client'

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
}
