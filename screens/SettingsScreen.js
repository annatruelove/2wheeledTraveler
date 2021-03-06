import React from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Item, Label, Form, Input } from "native-base";
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { app } from '../config';
import GLOBAL from './global.js'


const{ width , height } = Dimensions.get('window')
const containerWidth = width *.9
const modalHeight = height *.4
const db = app.database()


export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked1: GLOBAL.check1,
            checked2: GLOBAL.check2,
            checked3: GLOBAL.check3,
            checked4: GLOBAL.check4,
            checked5: GLOBAL.check5,
            current: 0
        };
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.Text}>Speed (Select 3)</Text>
                <CheckBox
                    title='Current Speed'
                    checked={this.state.checked1}
                    onPress={() => {
                        this.state.current = 1
                        this.checkSpeed()
                    }
                    }
                />
                <CheckBox
                    title='Maximum Speed'
                    checked={this.state.checked2}
                    onPress={() => {
                        this.state.current = 2
                        this.checkSpeed()
                    }
                    }
                />
                <CheckBox
                    title='Average Speed'
                    checked={this.state.checked3}
                    onPress={() => {
                        this.state.current = 3
                        this.checkSpeed()
                    }}
                />
                <CheckBox
                    title='Distance Traveled'
                    checked={this.state.checked4}
                    onPress={() => {
                        this.state.current = 4
                        this.checkSpeed()
                    }}
                />

                <CheckBox
                    title='Current Time'
                    checked={this.state.checked5}
                    onPress={() => {
                        this.state.current = 5
                        this.checkSpeed()
                    }}
                />
                <ContactsView/>
                
                <Button style={styles.link} onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                    <Text style={styles.link}>Back to Profile</Text>
                </Button>
            </View>
        )
    }

    // check to see if 3 are already selected
    checkSpeed() {
        if (this.state.current == 1) {
            if (this.state.checked1) {
                this.setState({ checked1: false })
                GLOBAL.check1 = false;
                return
            }
        }
        if (this.state.current == 2) {
            if (this.state.checked2) {
                this.setState({ checked2: false })
                GLOBAL.check2 = false;
                return
            }
        }
        if (this.state.current == 3) {
            if (this.state.checked3) {
                this.setState({ checked3: false })
                GLOBAL.check3 = false;
                return
            }
        }
        if (this.state.current == 4) {
            if (this.state.checked4) {
                this.setState({ checked4: false })
                GLOBAL.check4 = false;
                return
            }
        }

        if (this.state.current == 5) {
            if (this.state.checked5) {
                this.setState({ checked5: false })
                GLOBAL.check5 = false;
                return
            }
        }

        // can only check if 3 or less are checked
        count = 0

        if (this.state.checked1) {
            count++
        }
        if (this.state.checked2) {
            count++
        }
        if (this.state.checked3) {
            count++
        }
        if (this.state.checked4) {
            count++
        }
        if (this.state.checked5) {
            count++
        }

        if (count == 3) {
            return
        }

        if (this.state.current == 1) {
            this.setState({ checked1: true })
            GLOBAL.check1 = true;
            return
        }
        if (this.state.current == 2) {
            this.setState({ checked2: true })
            GLOBAL.check2 = true;
            return
        }
        if (this.state.current == 3) {
            this.setState({ checked3: true })
            GLOBAL.check3 = true;
            return
        }
        if (this.state.current == 4) {
            this.setState({ checked4: true })
            GLOBAL.check4 = true;
            return
        }

        if (this.state.current == 5) {
            this.setState({ checked5: true })
            GLOBAL.check5 = true;
            return
        }

    }
}

class ItemComponent extends React.Component {
 
    static propTypes = {
        contacts: PropTypes.array.isRequired
    };
   
    render() {
      return (
        <View style={styles.itemsList}>
          {this.props.contacts.map((item, index) => {
              return (
                  <View key={index}>
                      <Text style={styles.itemtext}>{item.contactName}</Text>
                  </View>
              )
          })}
        </View>
      );
    }
  }

class ContactsView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible:false,
            contactName: "",
            contactEmail: "",
            contacts:[]
        }
    }
       
    addContact(contactName, contactEmail){
        db.ref(app.auth().currentUser.uid).push({
            contactName: contactName,
            contactEmail: contactEmail
        })
        this.setModalVisible(false)
    }
    
    setModalVisible(visable){
        this.setState({modalVisible: visable})
    }
    
    componentWillUnmount() {
       this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        db.ref(app.auth().currentUser.uid).on('value', (snapshot) => {
            if (this._isMounted && (snapshot.val() != null)) {
                let data = snapshot.val();
                let contacts = Object.values(data);
                this.setState({contacts:contacts});
              }
         });
    }

    render(){
        return(
            <View style={{marginTop: 10}}>
            <View style={contactStyles.topContainer}>
                <Text style={styles.Text}>Contacts</Text>
                <Icon name='user-plus' size={25} color='black' style={{marginLeft:200}} onPress={() => {this.setModalVisible(true)}}></Icon>
            </View>
            <ScrollView style={{maxHeight:250}}>
                {
                    this.state.contacts.length > 0
                    ? <ItemComponent contacts={this.state.contacts} />
                    : null
                }
            </ScrollView>

            <Modal  animationType="slide"
            hasBackdrop={true}
            onBackButtonPress={() => {this.setModalVisible(false)}}
            onBackdropPress={() => {this.setModalVisible(false)}}
            transparent={true}
            isVisible={this.state.modalVisible}
            avoidKeyboard={true}
            >
                <View style={contactStyles.modalStyle}>

                    <View style={{justifyContent:'center', flexDirection: 'row', marginTop: 30}} >
                        <Text style={styles.Text}>Add Contact</Text>
                    </View>

                    <Form>
                    <Item floatingLabel>
                        <Label style={styles.Label}>Contact Name</Label>
                        <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={name => this.setState({ contactName: name })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.Label}>Email</Label>
                        <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={email => this.setState({ contactEmail: email})}
                        />
                    </Item>
                    </Form>

                    <View style={{justifyContent:'center', flexDirection: 'row'}} >
                        <Button full rounded style={{width: 200, justifyContent:'center', marginTop: 50, backgroundColor: '#56ba58'}} 
                        onPress={() => {this.addContact(this.state.contactName, this.state.contactEmail)}}>
                            <Text style={{color: 'white'}}>Add Contact</Text>
                        </Button>
                    </View>

                </View>
            </Modal>
            </View>
        )
    }
}

const contactStyles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
      },
    modalStyle: {
        height:  modalHeight,
        width: containerWidth,
        borderRadius: 5,
        backgroundColor: 'rgb(245,245,245)'
    }
})

const styles = StyleSheet.create({
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    title: {
        marginBottom: 20,
        fontSize: 40,
        textAlign: 'center',
        paddingTop: 50,
        color: '#56ba58'
    },
    Button: {
        backgroundColor: '#56ba58',
        marginTop: 50,
        marginBottom: 20
    },
    link: {
        alignSelf: "center",
        backgroundColor: "transparent",
        textDecorationLine: "underline",
        color: "#56ba58",
        fontSize: 20,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 30
    },
    Label: {
        fontSize: 15
    },
    Text: {
        fontSize: 20,
        paddingBottom: 10
    }
});
