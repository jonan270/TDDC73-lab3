import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useQuery } from "@apollo/client";
import { GH_QUERY } from '../gql/Query';
import RepositoryCard from './RepositoryCard';

export default function Dashboard() {
  // Only list repositories created after selected date
  const [date, setDate] = useState("2022-11-29");

  // Only list repositories from selected language
  const [language, setLanguage] = useState("Python");

  let searchParams = `created:>${date} language:${language}`;

  const { data, loading } = useQuery(GH_QUERY, {
    variables: { searchParams },
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