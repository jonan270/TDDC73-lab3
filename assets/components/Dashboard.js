import { Text, View, ScrollView } from 'react-native';
import { useQuery } from "@apollo/client";
import { GH_QUERY } from '../gql/Query';
import RepositoryCard from './RepositoryCard';

export default function Dashboard() {
    let searchParams = "pushed:>2022-12-06 language:Python";
    const { data, loading, error } = useQuery(GH_QUERY, {
      variables: { searchParams }, // code key
    }); //execute query

    
    let search;
    if(!loading)
      search = data.search;
      
    return loading ? (<Text>Loading...</Text>) : (
      <ScrollView style={{width: '100%', flexDirection: 'column'}}>
        {
          search.edges?.map( ({ node }) => {
          return (
          <RepositoryCard
            name={node.name}
            nameWithOwner={node.nameWithOwner}
            stars={node.stargazers.totalCount}
            description={node.description}
            forks={node.forkCount}
          />);
          })}
      </ScrollView>
    )
}