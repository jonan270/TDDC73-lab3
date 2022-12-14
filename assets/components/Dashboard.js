import { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native';
import { useQuery } from "@apollo/client";
import { GH_QUERY } from '../gql/Query';
import RepositoryCard from './RepositoryCard';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dashboard() {
  DropDownPicker.setTheme("DARK");

  // -- STATES HANDLING FOR CALENDAR --
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = (currentDate) => {
    return moment(currentDate).format('YYYY-MM-DD');
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
    setDateFormatted(formattedDate(currentDate));
  };
  // ---------------------------------

  // -- STATES FOR DROPDOWN LANGUAGE PICKER --
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'JavaScript', value: 'JavaScript'},
    {label: 'TypeScript', value: 'TypeScript'},
    {label: 'Go', value: 'Go'},
    {label: 'Rust', value: 'Rust'},
    {label: 'Swift', value: 'Swift'},
    {label: 'Python', value: 'Python'},
    {label: 'Java', value: 'Java'},
    {label: 'C', value: 'C'},
    {label: 'C++', value: 'C++'},
    {label: 'C#', value: 'C#'},
  ]);
  // -----------------------------------------

  // Only list repositories created after selected date
  const [dateFormatted, setDateFormatted] = useState(formattedDate(date));

  let searchParams = `created:>${dateFormatted} language:${value}`;

  const { data, loading } = useQuery(GH_QUERY, {
    variables: { searchParams },
  }); //execute query

  let search;
  if(!loading)
    search = data.search;

  return loading ? (<Text>Loading...</Text>) : (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <Text style={styles.toolbarText}>Creation after:</Text>
          <Button onPress={() => setShowDatePicker(true)} title={date.toDateString()} style={styles.buttonStyle} color='#2e3440'/>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode='date'
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <Text style={styles.toolbarText}>Language:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <ScrollView style={{width: '50%', flexDirection: 'column'}}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c566a',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarText: {
    color: '#d8dee9',
    fontSize: 18,
    paddingVertical: 20,
  },
  buttonStyle: {
    padding: 15,
    width: '100%'
  },
});