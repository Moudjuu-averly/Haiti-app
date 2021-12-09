import React from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Button, ButtonContainer } from "../components/Button";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    backgroundColor: "#ff4136",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  circleCorrect: {
    backgroundColor: "#28A125"
  },
  icon: {
    width: screen.width / 3
  }
});

export const Alert = ({ correct, visible, answerCorrectData }) => {
  if (!visible) return null;
  const icon = correct
    ? require("../assets/props/check.png")
    : require("../assets/props/close.png");

  const circleStyles = [styles.circle];
  if (correct) {
    circleStyles.push(styles.circleCorrect);
  }

  return (
    <View style={{...styles.container, backgroundColor:'#202124c2'}}>
      <View style={circleStyles}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
      {
        !correct && answerCorrectData ? 
      <ButtonContainer>
          <Button
            key={123}
            text={answerCorrectData.text}
          />
      </ButtonContainer>
    : null
      }
    </View>
  );
};
