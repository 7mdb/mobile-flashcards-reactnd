import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import Colors from "../constants/Colors";

class Deck extends Component {
  state = {
    w: 100,
    h: 100
  };

  _onPress = () => {
    LayoutAnimation.spring();
    this.setState({ w: this.state.w + 15, h: this.state.h + 15 });
    this.props.navigateToSelectedDeck(this.props.deck.title);
  };

  render() {
    const { deck } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.item}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.card}>Cards: {deck.cards.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    flex: 1,
    alignSelf: "center",
    width: "90%",
    marginBottom: 5,
    padding: 30,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 5
  },
  card: {
    color: Colors.primaryText,
    fontSize: 18
  }
});

export default Deck;
