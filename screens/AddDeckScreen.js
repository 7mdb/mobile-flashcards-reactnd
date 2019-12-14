import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  View,
  Text
} from "react-native";
import { addDeck } from "../actions";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/api";
import { generateId } from "../utils/helpers";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

class AddDeckScreen extends Component {
  state = {
    deckTitle: "",
    valid: true
  };

  submit = () => {
    const { deckTitle } = this.state;

    if (deckTitle.length >= 1) {
      saveDeckTitle(deckTitle);
      const deckObject = {
        [deckTitle]: {
          id: generateId(),
          title: deckTitle,
          cards: []
        }
      };
      this.props.addDeck(deckObject);
      this.props.navigation.navigate("DeckInfo", { deck: deckTitle });
      this.setState(() => ({
        deckTitle: ""
      }));
    } else {
      this.setState({ valid: false });
    }
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.label}>
          <Text style={{ fontSize: 22, color: Colors.primaryText, margin: 5 }}>
            Enter a Title of Your New Deck
          </Text>
        </View>
        {!this.state.valid && (
          <Text style={styles.error}>
            The deck name is not valid! (minimum 1 charactor)
          </Text>
        )}
        <View style={styles.input}>
          <TextInput
            value={this.state.deckTitle}
            onChangeText={deckTitle => this.setState({ deckTitle })}
            onFocus={() => this.setState({ deckTitle: "", valid: true })}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomButton onPress={this.submit}> Create </CustomButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AddDeckScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBG,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 50,
    padding: 15,
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
    padding: 2,
    margin: 5
  }
});

const mapDispatchToProps = dispatch => ({
  addDeck: deck => dispatch(addDeck(deck))
});

export default connect(null, mapDispatchToProps)(AddDeckScreen);
