import { getDecks } from "../utils/api";

export const GET_DECKS = "GET_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const getAllDecks = () => dispatch => {
  getDecks().then(decks =>
    dispatch({
      type: GET_DECKS,
      decks
    })
  );
};

export const addDeck = deck => {
  return {
    type: ADD_DECK,
    deck
  };
};

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  };
}
