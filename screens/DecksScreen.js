import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, FlatList, View } from "react-native";
import Colors from "../constants/Colors";
import { getAllDecks } from "../actions";
import { connect } from "react-redux";
import Deck from "../components/Deck";

class DecksScreen extends Component {
  componentDidMount() {
    getAllDecks();
  }

  navigateToSelectedDeck = deck => {
    this.props.navigation.navigate("DeckInfo", { deck });
  };

  render() {
    if (Object.keys(this.props.decks).length === 0) {
      return (
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 23, color: Colors.primaryText }}>
            😓 Sorry 😓
          </Text>
          <Text style={{ fontSize: 23, color: Colors.primaryText }}>
            you have not created decks yet
          </Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.mainContainer}>
          <FlatList
            style={styles.container}
            data={Object.values(this.props.decks)}
            renderItem={({ item }) => (
              <Deck
                deck={item}
                navigateToSelectedDeck={this.navigateToSelectedDeck}
              />
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      );
    }
  }
}

DecksScreen.navigationOptions = {
  header: null
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBG,
    alignSelf: "stretch",
    paddingTop: 20,
    paddingBottom: 20
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBG,
    alignSelf: "stretch"
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBG,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps)(DecksScreen);
