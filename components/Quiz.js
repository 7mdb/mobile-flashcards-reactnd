import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";
import { NavigationActions } from "react-navigation";
import {
  setLocalNotification,
  clearLocalNotification
} from "../utils/notifications";

// source: https://www.npmjs.com/package/react-native-card-flip
import CardFlip from "react-native-card-flip";

// called when no cards has been created and the start quiz button is clicked
const ZeroCard = () => (
  <View style={styles.container}>
    <Text style={styles.zeroCard}>
      Sorry you cannot take the quiz, because you have no cards on this Deck,
      Please go back and add cards then take a quiz.
    </Text>
  </View>
);

// called when there are no cards left, to show the summary report
const Result = props => (
  <View style={styles.card}>
    <Text style={styles.resultText}>Great 👍🏻😃</Text>
    <Text style={styles.resultText}>You have complated the Quiz</Text>
    <Text style={styles.resultText}>
      Total Number of Cards: {props.totalCards}
    </Text>
    <Text style={styles.resultText}>Correct Answers: {props.correct}</Text>
    <Text style={styles.resultText}>
      Percentage: {Math.round((props.correct / props.totalCards) * 100)}%
    </Text>
  </View>
);

class Quiz extends Component {
  state = {
    currentCard: 0,
    correctAnsweres: 0,
    complete: false,
    side: false
  };

  // called when the correct button is pressed
  correct = () => {
    const { correctAnsweres, currentCard, complete } = this.state;
    // checks if the card is on the answer side, and
    // will flip the card before going to the next question
    if (this.card.state.side === 1) {
      this.card.flip();
      this.setState({
        side: false
      });
    }
    if (currentCard === this.props.cards.length - 1) {
      this.setState({
        complete: true
      });
    }
    // will wait until the card is fliped to the question side
    setTimeout(() => {
      this.setState({
        correctAnsweres: correctAnsweres + 1,
        currentCard: currentCard + 1
      });
    }, 500);
  };

  // called when the incorrect button is pressed
  incorrect = () => {
    const { currentCard, complete } = this.state;
    // checks if the card is on the answer side, and
    // will flip the card before going to the next question
    if (this.card.state.side === 1) {
      this.card.flip();
      this.setState({
        side: false
      });
    }
    if (currentCard === this.props.cards.length - 1) {
      this.setState({
        complete: true
      });
    }
    // will wait until the card is fliped to the question side
    setTimeout(() => {
      this.setState({
        currentCard: currentCard + 1
      });
    }, 500);
  };

  restartQuiz = () => {
    this.setState({
      currentCard: 0,
      correctAnsweres: 0,
      complete: false
    });

    //will clear and set the notification to the next day
    clearLocalNotification().then(setLocalNotification);
  };

  navigateBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());

    //will clear and set the notification to the next day
    clearLocalNotification().then(setLocalNotification);
  };

  render() {
    const { cards } = this.props;
    const { complete, currentCard, correctAnsweres, side } = this.state;
    if (cards.length === 0) {
      return <ZeroCard />;
    }
    return (
      <View style={styles.container}>
        {complete === false ? (
          <View>
            <Text style={styles.totalCards}>
              {currentCard + 1} out of {cards.length}
            </Text>
            <CardFlip style={styles.flipCard} ref={card => (this.card = card)}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => {
                  this.card.flip();
                  this.setState({ side: true });
                }}
              >
                <Text style={styles.cardText}>{cards[currentCard].front}</Text>

                <Text style={styles.cardLabel}> Show Answer </Text>
              </TouchableOpacity>
              {/* you cannot go back to view the question  */}
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => {
                  this.card.jiggle();
                }}
              >
                <Text style={styles.cardText}>{cards[currentCard].back}</Text>
              </TouchableOpacity>
            </CardFlip>
            {side === false ? (
              <View style={styles.buttons}>
                <CustomButton disabled={true} onPress={this.correct}>
                  Correct
                </CustomButton>
                <CustomButton disabled={true} onPress={this.incorrect}>
                  Incorrect
                </CustomButton>
              </View>
            ) : (
              <View style={styles.buttons}>
                <CustomButton onPress={this.correct}> Correct </CustomButton>
                <CustomButton onPress={this.incorrect}>Incorrect</CustomButton>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Result totalCards={cards.length} correct={correctAnsweres} />
            <CustomButton onPress={this.restartQuiz}>Restart Quiz</CustomButton>
            <CustomButton onPress={this.navigateBack}>
              Back to Deck View
            </CustomButton>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBG,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  zeroCard: {
    padding: 10,
    color: Colors.primaryText,
    fontWeight: "bold",
    fontSize: 18,
    flexDirection: "row"
  },
  totalCards: {
    color: Colors.primaryText,
    fontWeight: "bold",
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10
  },
  card: {
    backgroundColor: Colors.white,
    height: "50%",
    alignSelf: "center",
    width: "90%",
    minWidth: "90%",
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  cardText: {
    fontSize: 20,
    color: Colors.primaryText,
    marginTop: 50,
    marginBottom: 5
  },
  cardLabel: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.3)",
    marginBottom: 5
  },
  cardContainer: {
    height: "60%",
    marginHorizontal: 5
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10
  },
  flipCard: {
    backgroundColor: Colors.white,
    height: "50%",
    alignSelf: "center",
    width: "90%",
    minWidth: "90%",
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  button: {
    backgroundColor: Colors.ButtonBG,
    color: Colors.textButton,
    fontWeight: "bold",
    width: "60%",
    alignSelf: "center",
    fontSize: 14,
    marginTop: 20,
    borderRadius: 10,
    padding: 20
  },
  resultText: {
    fontSize: 16,
    paddingTop: 5,
    color: Colors.primaryText
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: "100%"
  }
});
const mapStateToProps = (state, ownProps) => {
  return { cards: state[ownProps.navigation.state.params.deck].cards };
};

export default connect(mapStateToProps)(Quiz);
