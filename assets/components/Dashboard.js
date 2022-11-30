import { Text, FlatList, Pressable, View } from 'react-native'
import { useQuery } from "@apollo/client";
import { GH_QUERY } from '../gql/Query';

export default function Dashboard() {
    const { data, loading } = useQuery(GH_QUERY); //execute query
    
    let titles;
    if(!loading) {
      const { search } = data;
      titles = search.edges.map( ({ node }) => node.name);
      console.log(titles);
    }
    else titles = null;

    return loading ? (<Text>Loading...</Text>) : (
      <View>
        <Text>{titles}</Text>
      </View>
    )
}