import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { ScreenWidth, ScreenHeight, FontScale } from '../constant/Constant';
import { RouterAction } from 'react-native-stack';
import { database } from '../src/config/config';

const dates = [
    {
        year: 2015
    },
    {
        year: 2016
    },
    {
        year: 2017
    },
    {
        year: 2018
    },
    {
        year: 2019
    },
    {
        year: 2020
    }
]

function YearButton({item}) {
    
    return (
        <View style={styles.yearButtonContainer}>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                style={styles.smallCircle}
            />
            <Text style={styles.smallYear}>{item.year}</Text>
        </View>
    );
}

/**
 * Core component
 */
export default class ProfPatientViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: []
        }
    }

    componentDidMount() {
        const { key } = this.props.route.params;
        database.ref('professionals/M001/patients/' + key + '/info').once('value', (snapshot) => {
            this.setState({patient: snapshot.val()});
        });
    }

    render() {
        const patient = this.state.patient;

        return (
            <>
                <View style={styles.fullscreen}>
                    <View style={[styles.container, {backgroundColor: 'white'}]}>
                        <Text style={[styles.text, {fontSize: 30, color: '#000000'}]}>{patient.name}</Text>
                        <Text style={styles.text}>年齡: {patient.age}</Text>
                        <Text style={styles.text}>職業: {patient.job}</Text>
                        <Text style={styles.text}>家庭病史: {patient.history}</Text>
                        <Text style={styles.text}>已知眼疾: {patient.disease}</Text>
                    </View>
                    <View style={[styles.container, 
                            {flex: 2, 
                            justifyContent: 'center',
                            paddingHorizontal: 30}]}>
                        <View style={{height: 60}}/>
                        <View style={[styles.boxes, {flex: 6}]}>
                            <View style={{marginTop:25, alignItems:'center'}}>
                                <Image source={Placeholder2}/>
                                <Image source={Placeholder}/>
                            </View>

                        </View>

                        <View style={{height:10}}/>
                        
                        <View style={ 
                                {backgroundColor: 'transparent', 
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1}}>
                            <TouchableOpacity
                                style={styles.boxes}
                                onPress={() => {}}
                            >
                                <Text style={styles.buttonText}>輸入數據</Text>
                            </TouchableOpacity>
                            <View style={{width: 10}}/>
                            <TouchableOpacity
                                style={styles.boxes}
                                onPress={() => {}}
                            >
                                <Text style={styles.buttonText}>眼鏡度數</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 30}}/>
                    </View>
                </View>
                <View style={styles.fullscreen}>
                    <View style={{flex: 3}}></View>
                    <View style={{flex: 2}}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={dates}
                            horizontal={true}
                            renderItem={({item}) => (<YearButton item={item}/>)}
                        />
                    </View>
                    <View style={{flex: 7}}></View>
                </View>
            </>
        );
    }
}

/**
 * The Styling part, you may edit the existing style
 */
const styles = StyleSheet.create({
    fullscreen: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#56CCF2',
        justifyContent: 'center'
    }, 
    text: {
        textAlign: 'left',
        fontSize: 18,
        paddingHorizontal: 40,
        color: '#474747'
    },
    centretext: {
        textAlign: 'center'
    },
    boxes: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
    },
    yearButtonContainer: {
        width: Dimensions.get('screen').width * 0.25,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallYear: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    smallCircle: {
        width: ScreenWidth * 0.075,
        height: ScreenWidth * 0.075,
        borderRadius: ScreenWidth * 0.0375,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderColor: 'rgba(86, 204, 242, 0.6)'
    },
    bigCircle: {
        width: ScreenWidth * 0.1,
        height: ScreenWidth * 0.1,
        borderRadius: ScreenWidth * 0.05,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#56CCF2'
    }
});