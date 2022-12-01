import { Text, View, ScrollView } from 'react-native';
import { useQuery } from "@apollo/client";
import { GH_QUERY } from '../gql/Query';
import RepositoryCard from './RepositoryCard';

export default function Dashboard() {
    const { data, loading } = useQuery(GH_QUERY); //execute query
    
    let search;
    if(!loading)
      search = data.search;

    return loading ? (<Text>Loading...</Text>) : (
      <ScrollView style={{width: '100%', flexDirection: 'column'}}>
        {
          search.edges.map( ({ node }) => {
          return (<RepositoryCard name={node.name} stars={node.stargazers.totalCount}/>);
          })}
      </ScrollView>
    )
}