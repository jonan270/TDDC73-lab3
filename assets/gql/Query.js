import { gql, useSubscription } from "@apollo/client";

// Query from https://stackoverflow.com/questions/48244950/can-i-list-githubs-public-repositories-using-graphql
export const GH_QUERY = gql`query GH_QUERY($searchParams:String!) {
    search(query: $searchParams, type: REPOSITORY, first: 50) {
        pageInfo {
            endCursor
            startCursor
        }
        edges {
            node {
                ... on Repository {
                    name
                    refs(refPrefix: "refs/heads/") {
                        totalCount
                    }
                    stargazers {
                        totalCount
                    }
                    licenseInfo {
                        name
                    }
                    object(expression:"master") {
                        ... on Commit {
                          history {
                            totalCount
                          }
                        }
                    }
                    nameWithOwner
                    description
                    forkCount
                }
            }
        }
    }
}`;