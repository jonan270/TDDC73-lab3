import { Text, StyleSheet, View } from 'react-native';

export default function RepositoryCard(props) {
    return(
        <View style={styles.cardView}>
            <Text style={styles.repoTitleText}>{props.name}</Text>
            <Text style={styles.starText}>{'*: ' +  props.stars}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: '#2e3440',
        width: 300,
        height: 150,
        borderRadius: 15,
        padding: 15,
        margin: '3%',
        alignSelf: 'center',
    },
    repoTitleText: {
        color: '#d8dee9',
        fontSize: 20,
    },
    starText: {
        color: '#ebcb8b',
        fontSize: 12,
    },
  });