import { Text, View } from 'react-native';

export default function RepositoryCard(props) {
    return(
        <View style={{backgroundColor: '#2e3440', width: '40%', alignSelf: 'center'}}>
            <Text style={{color: '#ffff'}}>{props.name}</Text>
        </View>
    )
}