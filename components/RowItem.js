import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
const deviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#36B1F0",
    marginBottom: 1,
    margin:25,
    borderRadius:8,
    // display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600"
  },
  container:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  }
});

export const RowItem = ({ onPress = () => {}, name, color }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
    <View style={[styles.row, { backgroundColor: color }]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  </TouchableOpacity>
);
