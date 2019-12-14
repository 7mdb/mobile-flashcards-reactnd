import { AsyncStorage } from "react-native";

export const MOBILEFLASHCARDS_DECKS_KEY = "MobileFlashCards:Decks";
export const NOTIFICATIONS_KEY = "MobileFlashCards:Notifications";

export const generateId = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};
