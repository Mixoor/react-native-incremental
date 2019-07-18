import React, { Component } from "react";
import {
  Text,
  View,
  PanResponder,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import { off } from "rsvp";

const COMPONENT_WIDTH = 150;
const CURSOR_WIDTH = 60;
const CURSOR = (COMPONENT_WIDTH - CURSOR_WIDTH) / 2;

export default class Adder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0)
    };
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gState) => true,
      onPanResponderMove: (evt, gesture) => {
        if (gesture.dx >= -CURSOR - 30 && gesture.dx <= CURSOR + 30)
          this.state.offset.setValue(gesture.dx);
      },
      onPanResponderRelease: (e, g) => {
        this.changeCounter();
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderTerminate: (evt, gesture) => {
        this.changeCounter();
      }
    });
  }

  changeCounter() {
    let change = this.state.offset._value > 0 ? 1 : -1;
    let counter = this.props.value + change;
    counter = counter < 0 ? 0 : counter;
    this.props.onAdd(counter);
    // return the buttun
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 700,
      easing: Easing.elastic(1.8)
    }).start();
  }

  render() {
    const { offset } = this.state;
    const counterStyle = {
      ...styles.counter,
      marginLeft: Animated.add(new Animated.Value(CURSOR), offset)
    };

    return (
      <View style={styles.container}>
        <View
          style={styles.sliderContainer}
          {...this._panResponder.panHandlers}
        >
          <View style={styles.sides}>
            <Text style={styles.minus}> - </Text>
            <Text style={styles.plus}> + </Text>
          </View>
          <Animated.Text style={counterStyle}>{this.props.value}</Animated.Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6D72FE"
  },
  sliderContainer: {
    width: COMPONENT_WIDTH,
    borderRadius: 28,
    height: 60,
    backgroundColor: "#d890fe",
    overflow: "hidden"
  },
  sides: {
    position: "absolute",
    zIndex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  minus: {
    width: 40,
    height: 60,
    lineHeight: 57,
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    alignSelf: "flex-start"
  },
  plus: {
    width: 40,
    height: 60,
    lineHeight: 57,
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    alignSelf: "flex-end"
  },
  counter: {
    position: "absolute",
    zIndex: 0,
    backgroundColor: "#fff",
    borderRadius: 30,
    overflow: "hidden",
    width: CURSOR_WIDTH,
    height: CURSOR_WIDTH,
    lineHeight: 60,
    color: "#6D72FE",
    fontFamily: "Menlo",
    fontSize: 30,
    textAlign: "center"
  }
});
