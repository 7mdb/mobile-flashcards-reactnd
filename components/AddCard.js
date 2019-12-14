import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import CustomButton from "./CustomButton";

class AddCard extends Component {
  state = {
    front: "",
    back: "",
    frontValid: true,
    backValid: true
  };

  submit = () => {
    const { front, back } = this.state;

    if (front.length > 0 && back.length > 0) {
      const cardObject = {
        front,
        back
      };

      const deckTitle = this.props.navigation.state.params.deck;
      addCardToDeck(deckTitle, cardObject);
      this.props.addCard(deckTitle, cardObject);
      this.setState(() => ({
        front: "",
        back: ""
      }));
      this.props.navigation.navigate("DeckInfo", { deck: deckTitle });
    } else {
      if (front.length <= 0) {
        this.setState({ frontValid: false });
      }
      if (back.length <= 0) {
        this.setState({ backValid: false });
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 22,
              color: Colors.primaryText,
              fontWeight: "bold",
              margin: 5
            }}
          >
            Enter Card Details
          </Text>
        </View>
        {!this.state.frontValid && (
          <Text style={styles.error}>
            The Front Card has to be valid! (minimum 1 charactor)
          </Text>
        )}
        <View style={styles.input}>
          <TextInput
            value={this.state.front}
            onChangeText={front => this.setState({ front })}
            onFocus={() => this.setState({ front: "", frontValid: true })}
            placeholder="Front"
          />
        </View>
        {!this.state.backValid && (
          <Text style={styles.error}>
            The Back Card has to be valid! (minimum 1 charactor)
          </Text>
        )}
        <View style={styles.input}>
          <TextInput
            value={this.state.back}
            onChangeText={back => this.setState({ back })}
            onFocus={() => this.setState({ back: "", backValid: true })}
            placeholder="Back"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomButton onPress={this.submit}> Add Card </CustomButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBG,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    paddingBottom: 30
  },
  input: {
    height: 50,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: Colors.white,
    fontSize: 18,
    width: "90%",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  error: {
    color: Colors.errorText,
    backgroundColor: Colors.errorBackground,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
    padding: 5,
    margin: 2
  }
});

const mapDispatchToProps = dispatch => ({
  addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
});

export default connect(null, mapDispatchToProps)(AddCard);
