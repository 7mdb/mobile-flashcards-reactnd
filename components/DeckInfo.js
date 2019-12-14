import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";

class DeckInfo extends Component {
  //To manage the navigation
  moveTo = screen => {
    this.props.navigation.navigate(screen, { deck: this.props.deck.title });
  };
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.cardNumber}>Cards: {deck.cards.length}</Text>
        </View>
        <CustomButton onPress={() => this.moveTo("Quiz")}>
          Take a Quiz
        </CustomButton>
        <CustomButton onPress={() => this.moveTo("AddCard")}>
          Add Cards
        </CustomButton>
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
  card: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  deckTitle: {
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center"
  },
  cardNumber: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primaryText
  }
});

const mapStateToProps = (state, ownProps) => {
  return { deck: state[ownProps.navigation.state.params.deck] };
};

export default connect(mapStateToProps)(DeckInfo);
