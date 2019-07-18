import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Easing,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.ValueXY({ x: 0, y: 50 })
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderMove: (evt, gesture) => {
        if (
          gesture.moveX <= width - 50 &&
          gesture.moveX >= 0 &&
          gesture.moveY <= height - 75 &&
          gesture.moveY >= 0
        )
          this.state.position.setValue({
            x: gesture.moveX,
            y: gesture.moveY
          });
      },
      onPanResponderRelease: (evt, gesture) => {
        let w =
          this.state.position.x._value >= (width - 50) / 2 ? width - 50 : 0;
        console.log(this.state.position.x._value);
        Animated.spring(this.state.position.x, {
          toValue: w,
          friction: 20
        }).start();
      }
    });
  }

  render() {
    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          {
            backgroundColor: "red",
            width: 50,
            height: 50,
            borderRadius: 40
          },
          {
            position: "absolute",

            left: this.state.position.x,

            top: this.state.position.y
          }
        ]}
      />
    );
  }
}
