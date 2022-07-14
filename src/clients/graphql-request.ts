import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';
const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT; 

const graphQLClient = new GraphQLClient(graphqlAPI);

// export const sdk = getSdk(graphQLClient)
export const sdkClient = getSdk(graphQLClient);
