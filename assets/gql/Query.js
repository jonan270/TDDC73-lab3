import { gql } from "@apollo/client";

// Query from https://stackoverflow.com/questions/48244950/can-i-list-githubs-public-repositories-using-graphql
export const GH_QUERY = gql`{
    search(query: "stars:>60000", type: REPOSITORY, first: 50) {
        pageInfo {
            endCursor
            startCursor
        }
        edges {
            node {
                ... on Repository {
                    name
                    stargazers {
                        totalCount
                    }
                }
            }
        }
    }
}`;