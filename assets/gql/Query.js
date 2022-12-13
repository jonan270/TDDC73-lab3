import { gql, useSubscription } from "@apollo/client";


let date = "2022-12-06";
let language = "Java";

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
                    stargazers {
                        totalCount
                    }
                    nameWithOwner
                    description
                    forkCount
                }
            }
        }
    }
}`;

// export const GH_QUERY = gql`query GH_QUERY($amount:Int!) {
//     search(query: "is:public", type: REPOSITORY, first: $amount) {
//         repositoryCount
//         pageInfo {
//         endCursor
//         startCursor
//         }
//         edges {
//         node {
//             ... on Repository {
//             name
//             stargazers(orderBy: {field: STARRED_AT, direction: ASC}, after: "yesterday") {
//                 totalCount
//             }
//             }
//         }
//         }
//     }
// }`;