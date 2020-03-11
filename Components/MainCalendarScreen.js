import * as React from 'react';
import { Text, View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './CaroselView';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      let response = await fetch(
        'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
      );
      let parseObject = await response.json();
      let eventArray = this.assignIDs(parseObject);
      this.setState({
        events: eventArray,
      });
    };
    fetchData();
  }

  //Method that filters Events Pending
  eventsPending(events) {
    return events.filter(event => {
      return event.accepted === undefined ? true : false;
    });
  }

  //AssignIDs  this function will be remove in the future as id will be added to the invitations

  assignIDs(events) {
    return events.map((event, index) => {
      event.id = index;
      event.date = moment(event.date, 'DD-MM-YYYY hh:mm:ss');

      return event;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topNavigationView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer()}}>
          <Image
          style={{margin: 10}}
            source={require('../assets/sidemenuBtn.png')}
          />
          </TouchableOpacity>
          <Text style={styles.topNavigationViewText}> DinDin </Text>
          <Image
             style={{margin: 10}}
            source={require('../assets/searchbtn.png')}
          />
        </View>

        <View style={{ height: 40, width: '100%' }} />
        <LinearGradient colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
          <CaroselView eventsData={this.eventsPending(this.state.events)} />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  topNavigationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 90,
  },
  topNavigationViewText: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    color: '#353535',
  },
});
