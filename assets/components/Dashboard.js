import { Text, View, ScrollView } from 'react-native';
import { useQuery } from "@apollo/client";
import { GH_QUERY } from '../gql/Query';
import RepositoryCard from './RepositoryCard';

export default function Dashboard() {
    const { data, loading } = useQuery(GH_QUERY); //execute query
    
    let search;
    let count = 0;

    if(!loading)
      search = data.search;

    return loading ? (<Text>Loading...</Text>) : (
      <ScrollView style={{width: '100%'}}>
        {
          search.edges.map( ({ node }) => {
          count++;
          return count % 2 == 0 ? 
          (
            <RepositoryCard name={node.name}/>
          )
          :
          (
            // Add to new view?
            <RepositoryCard name={node.name}/>
          )
        })}
      </ScrollView>
    )
}