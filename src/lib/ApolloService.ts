import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client"

export const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache()
})

async function getData(queryString: string){

  let data: object = []


  data = await client
  .query({
    query: gql`
        ${queryString}
    `
  })
  .then((result) => {
    ({result: result.data.launches});
    data = result
    return result
  });

  ({data})

  return data
}

export default getData;