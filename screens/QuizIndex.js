import React from "react";
import { ScrollView, StatusBar, Dimensions, StyleSheet } from "react-native";

import spaceQuestions from "../data/space";
import westernsQuestions from "../data/westerns";
import computerQuestions from "../data/computers";

import { RowItem } from "../components/RowItem";
const deviceHeight = Dimensions.get('window').height

export default ({ navigation }) => (
  <ScrollView stylestyle={{...styles.container, marginTop:deviceHeight/2}}>
    <StatusBar barStyle="dark-content" />
    <RowItem
      name="Omapulo"
      color="#36b1f0"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Omapulo",
          questions: spaceQuestions,
          color: "#36b1f0"
        })
      }
    />
    <RowItem
      name="Omadidiliko"
      color="#799496"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Omadidiliko",
          questions: westernsQuestions,
          color: "#799496"
        })
      }
    />
    {/* <RowItem
      name="Computers"
      color="#49475B"
      onPress={() =>
        navigation.navigate("Quiz", {
          title: "Computers",
          questions: computerQuestions,
          color: "#49475B"
        })
      }
    /> */}
    <RowItem
      name="Word search"
      color="#FF0075"
      onPress={() =>
        navigation.navigate("WordSearch", {
          title: "Word Search",
          questions: computerQuestions,
          color: "#FF0075"
        })
      }
    />
  </ScrollView>
);

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
    // flexDirection: 'row',
    // flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  }
});

