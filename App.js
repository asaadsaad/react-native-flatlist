/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { List, ListItem } from 'react-native-elements'


type Props = {};
export default class App extends Component<Props> {
  state = {
    data: [],
    page: 0
  }
  temp = '';
  fetchData = async () => {
    try {
      const data = await fetch(`https://randomuser.me/api/?inc=name,email,picture&results=15&page=${this.state.page}`)
      const json = await data.json();
      this.temp = JSON.stringify(json)
      this.setState((oldState) => ({ data: [...oldState.data, ...json.results] }));
    } catch (e) {
      console.log(e)
    }
  }
  componentDidMount = () => {
    console.log('fetching first set of data...')
    this.fetchData()
  }

  getMoreData = () => {
    console.log('getting more data...')
    this.setState((oldState) => ({ page: oldState.page + 1 }), () => {
      this.fetchData()
    });
  }
  render() {
    return (
      <View>
        <List>
          {/* <Text>{this.temp}</Text> */}
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            // renderItem={({ item }) => <Text>{`${item.name.first} ${item.name.last}`}</Text>}>
            renderItem={({ item }) => <ListItem
              roundAvatar
              avatar={{ uri: item.picture.thumbnail }}
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
            ></ListItem>}
            onEndReached={() => this.getMoreData()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => <ActivityIndicator animating size="large"></ActivityIndicator>}
          >
          </FlatList>
        </List>
      </View>
    );
  }
}

