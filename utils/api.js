import { AsyncStorage } from "react-native";
import { MOBILEFLASHCARDS_DECKS_KEY, generateId } from "./helpers.js";

// Get All Decks
export const getDecks = async () => {
  const results = await AsyncStorage.getItem(MOBILEFLASHCARDS_DECKS_KEY);
  const decks = JSON.parse(results);
  return decks;
};

// saves a new Deck
export const saveDeckTitle = deckTitle => {
  const deckObject = { title: deckTitle, id: generateId(), cards: [] };
  return AsyncStorage.mergeItem(
    MOBILEFLASHCARDS_DECKS_KEY,
    JSON.stringify({ [deckTitle]: deckObject })
  );
};

// get a single deck
export async function getDeck(id) {
  const decks = await getDecks();
  return decks[id];
}

// add a Card to a deck
export async function addCardToDeck(title, card) {
  const decks = await getDecks();
  decks[title].cards.push(card);
  AsyncStorage.mergeItem(MOBILEFLASHCARDS_DECKS_KEY, JSON.stringify(decks));
}
