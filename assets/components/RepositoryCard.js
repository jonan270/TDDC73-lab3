import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from 'react';

const yellowAccent = '#ebcb8b';
const blueAccent = '#88c0d0';

export default function RepositoryCard(props) {
    const [expanded, setExpanded] = useState(false);
    const changeDetailLevel = () => {
        setExpanded(!expanded);
    }

    // Display detailed information if the card has been clicked
    return expanded ? 
    (
        <TouchableOpacity style={[styles.cardTouchable, {height: 400}]} onPress={changeDetailLevel}>
        <View style={[styles.cardView, {height: 400}]} key={props.name}>
            <Text style={styles.repoTitleText}>{props.name}</Text>
            <Text style={styles.ownerText}>{props.nameWithOwner}</Text>
            <View style={{marginTop: 5, height: '50%'}}>
                <Text style={styles.descriptionText}>
                    {props.description}
                </Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={[styles.descriptionText, {color: blueAccent}]}>License: {props.license?.name ? props.license?.name : "None"}</Text>
                <Text style={[styles.descriptionText, {color: blueAccent}]}>Commits: {props.object?.history?.totalCount ? props.object?.history?.totalCount : "No branch named \"master\""}</Text>
                <Text style={[styles.descriptionText, {color: blueAccent}]}>Branches: {props.nBranches}</Text>
            </View>
        </View>
        </TouchableOpacity>
    ) 
    : // Else display overview card
    (
        <TouchableOpacity style={styles.cardTouchable} onPress={changeDetailLevel}>
            <View style={styles.cardView} key={props.name}>
                <Text style={styles.repoTitleText} numberOfLines={1}>{props.name}</Text>
                <Text style={styles.ownerText} numberOfLines={1}>{props.nameWithOwner}</Text>
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardTouchable: {
        backgroundColor: {blueAccent},
        width: 300,
        height: 150,
        margin: '3%',
        borderRadius: 15,
    },
    cardView: {
        backgroundColor: '#2e3440',
        width: 300,
        height: 150,
        borderRadius: 15,
        padding: 15,
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