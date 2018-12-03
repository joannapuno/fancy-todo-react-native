import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
// createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);

import Note from './Note';
import { italic } from 'ansi-colors';
export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        };
    }
    render() {
        let notes = this.state.noteArray.map((val, key)=>{
            return <Note key={key} keyval={key} val={val}
                    deleteMethod={()=>this.deleteNote(key)}/>
        });
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>A Fancy Todo App</Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Add a task...'
                        onChangeText={(noteText)=> this.setState({noteText})}
                        value={this.state.noteText}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date':d.getFullYear()+
                "/"+(d.getMonth()+1) +
                "/"+ d.getDate(),
                'note': this.state.noteText
            });
            this.setState({ noteArray: this.state.noteArray });
            this.setState({noteText:''});
        }
    }
    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#6E009F',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        padding:20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        padding: 20,
        marginTop: 20,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 30,
        backgroundColor: '#252525',
        height:100,
        borderTopColor: '#ededed'
    },

    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#176ED3',
        width: 70,
        height: 70,
        // borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 30
    }
});