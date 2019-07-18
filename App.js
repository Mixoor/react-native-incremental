/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Adder from "./src/components/Adder";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type AppProps = {};
export default class App extends Component<AppProps> {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  onAdd(i) {
    this.setState({ counter: i });
  }
  render() {
    return (
      <View style={styles.container}>
        <Adder value={this.state.counter} onAdd={i => this.onAdd(i)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
