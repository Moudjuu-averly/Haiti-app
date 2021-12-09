import React from "react";
import { View, StyleSheet, StatusBar, Text, Image, SafeAreaView, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    // marginTop: 100,
    justifyContent: "space-between"
  },
  modals: {
    margin: 50,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
   },
});

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctCount: 0,
      totalCount: this.props.navigation.getParam("questions", []).length,
      activeQuestionIndex: 0,
      answered: false,
      answerCorrect: false,
      answerCorrectData:null,
      instruction:false,
      title:null
    };
  }
  componentDidMount  = async ()=> {
    this.showInstruction()

    this.state.title = this.props.navigation.getParam("title")
    // try {
    //   await AsyncStorage.clear()
    // } catch(e) {
    //   // clear error
    // }
  }
  

  updateInstructions = async () => {
    try {
      await AsyncStorage.setItem(this.state.title , JSON.stringify(this.state.title), 
      () => {
        this.setState({
          instruction: false
        })
            })
          } catch (error) {
            console.log("err:", error)
          }
  }

   showInstruction = async () => {
    try {
      var title = this.props.navigation.getParam("title")
      await AsyncStorage.getItem(title, (err, result) => {
        if(err){
          console.log("err:", err)
        }
        let instruction = JSON.parse(result)
        if(!instruction){
          this.setState({
            instruction: true
          })
        }
        else{
          this.setState({
            instruction: false
          })
        }
        })          
    } catch(e) {  }
  }

  answer = (correct, answer) => {
    const questions = this.props.navigation.getParam("questions", [])
      const question = questions[this.state.activeQuestionIndex]
      let match = question !=null && question.answers.find((q)=>{ return q.correct === true })
    this.setState(
      state => {
        const nextState = { answered: true }

        if (correct) {
          nextState.correctCount = state.correctCount + 1
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
          nextState.answerCorrectData = match
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 3000);
      }
    );
  };

  nextQuestion = () => {
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        this.props.navigation.popToTop();
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  render() {
    const questions = this.props.navigation.getParam("questions", []);
    const question = questions[this.state.activeQuestionIndex];
    const answerCorrectData = this.state.answerCorrectData
    var msg, title = this.props.navigation.getParam("title")
    if(title==='Omapulo'){
      msg = 'Translate the given proverb into English'
    }
    else if(title==='Omadidiliko'){
      msg = 'Match the image with the correct description'
    }

    let questionType =  title === 'Omadidiliko' ?
        <View style={{justifyContent:'center'}}>
            <Image source={question?.question} style={{width:'100%',height:200, alignSelf:'center', borderRadius:20}} resizeMode="cover" />
        </View>
    : <Text style={styles.text}>{question?.question}</Text> 

     let show = this.state.instruction 
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") }
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
          <View style={{display:'flex', margin:20}}>

          <Modal
            backdropColor={'white'}
            transparent={true}
            visible={show}>
            <View style={styles.modals}>
              <Text style={{alignSelf: 'center', width: '80%', textAlign: 'center', paddingTop:20}}>
                  {msg}
              </Text>
              <Text onPress={()=>this.updateInstructions()} style={{alignSelf: 'center', width: 200, textAlign: 'center', padding:20}}>
              Close
              </Text>
            </View>
          </Modal>
           
          </View>
            
            {questionType}

            <ButtonContainer>
              {question?.answers.map((answer, id) => (
                <Button
                  key={answer.id}
                  text={answer.text}
                  onPress={() => this?.answer(answer?.correct, answer)}
                />
              ))}
            </ButtonContainer>
          </View>

          


          <Text style={styles.text}>
            {`${this.state.correctCount}/${this.state.totalCount}`}
          </Text>
        </SafeAreaView>
        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
          answerCorrectData={answerCorrectData}
        />
        
      </View>
    );
  }
}

export default Quiz;
