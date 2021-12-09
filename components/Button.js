import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
    padding:8,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%'
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center"
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: "column",
    // alignItems: 'stretch',
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto',
    width:'100%'

  }
});

export const Button = ({ text, onPress = () => {} }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export const ButtonContainer = ({ children }) => (
  <View style={{ ...styles.buttonContainer, margin:20, }}>{children}</View>
);
