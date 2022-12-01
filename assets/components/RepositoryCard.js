import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const yellowAccent = '#ebcb8b';
const blueAccent = '#88c0d0';

export default function RepositoryCard(props) {
    return(
        <View style={styles.cardView} key={props.name}>
            <Text style={styles.repoTitleText}>{props.name}</Text>
            <Text style={styles.ownerText}>{props.nameWithOwner}</Text>
            <View style={{marginTop: 5, height: '50%'}}>
                <Text style={styles.descriptionText}>
                    {props.description}
                </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.iconTextView}>
                            <AntDesign name="star" size={18} color={yellowAccent} />
                            <Text style={[styles.iconText, {color: yellowAccent}]}>{props.stars}</Text>
                        </View>
                        <View style={styles.iconTextView}>
                            <AntDesign name="fork" size={18} color={blueAccent} />
                            <Text style={[styles.iconText, {color: blueAccent}]}>{props.forks}</Text>
                        </View>
                    </View>
                </View>
            </View>
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
        fontSize: 18,
    },
    ownerText: {
        color: '#4c566a',
        fontFamily: 'monospace',
        fontSize: 10,
    },
    descriptionText: {
        color: '#d8dee9',
        fontFamily: 'monospace',
        fontSize: 10,
    },
    iconText: {
        marginLeft: 5,
        fontFamily: 'monospace',
        alignSelf: 'center',
        fontSize: 14,
    },
    iconTextView: {
        flexDirection: 'row',
        marginRight: 25,
        width: 75,
    },
  });