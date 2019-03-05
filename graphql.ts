import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {withClientState} from 'apollo-link-state';
import {persistCache} from 'apollo-cache-persist';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AsyncStorage} from 'react-native';

const httpLink = createHttpLink({
  uri: 'https://graphql-pokemon.now.sh',
});

const authLink = setContext(async (_, {headers}: {headers: {}}) => {
  const token = '<insert_auth_token_here>';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache: InMemoryCache = new InMemoryCache({});

// tslint:disable-next-line:no-any
const persistCacheSettings: any = {
  cache,
  storage: AsyncStorage,
};

export function registerPersistCache() {
  return persistCache(persistCacheSettings);
}
registerPersistCache();

const clientResolvers = {};
const clientDefaults = {};
const clientTypeDefs = '';

/**
 * "withClientState" allow to access and modify apollo cache. It can replace other state managers
 * (like Redux)
 */
const stateLink = withClientState({
  cache,
  resolvers: clientResolvers,
  defaults: clientDefaults,
  typeDefs: clientTypeDefs,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    authLink,
    stateLink,
    httpLink,
  ]),
});

// HACK: resetStore remove defaults from apollo-link-state
// (https://github.com/apollographql/apollo-link-state/issues/156)
// this call write again defaults into apollo cache after reset store.
// Store is reset after sign out.
client.onResetStore(async () => stateLink.writeDefaults());

export {client};
export default client;
