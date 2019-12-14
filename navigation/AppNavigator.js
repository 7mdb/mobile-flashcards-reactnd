import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import DecksScreen from "../screens/DecksScreen";
import DeckInfo from "../components/DeckInfo";
import AddCard from "../components/AddCard";
import Quiz from "../components/Quiz";

export default createAppContainer(
  createStackNavigator({
    Main: {
      screen: MainTabNavigator
    },
    DecksScreen: {
      screen: DecksScreen
    },
    DeckInfo: {
      screen: DeckInfo
    },
    AddCard: {
      screen: AddCard
    },
    Quiz: {
      screen: Quiz
    }
  })
);
