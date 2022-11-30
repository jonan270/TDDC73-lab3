import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import Dashboard from './assets/components/Dashboard'

// Please not that you need to provide your own github access
// token for the app to build. It should be places in a file
// named .env and contain GITHUB_ACCESS_TOKEN="*YOUR TOKEN*"
import { GITHUB_ACCESS_TOKEN } from '@env'

import {
  ApolloClient, InMemoryCache,
  ApolloProvider, createHttpLink 
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

export default function App() {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Dashboard/>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
