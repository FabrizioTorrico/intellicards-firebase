import { Button } from "@chakra-ui/react";
import { IoHeartOutline, IoHeartDislike } from "react-icons/io5";
import { addHeart, removeHeart } from "../firebase/firestore";

/**
 * @param {props} props
 * @property {myHeart} firebaseRef a reference to the realtime user Heart to check if it exists
 * @property {String} deckUid uses the deckUid for changes on firebase
 * @property {String} deckId uses the deckUid for changes on firebase
 */
export default function HeartButton({ myHeart, deckUid, deckId, heartCount }) {
  if (!myHeart) return <div>you are not signed in!</div>;
  return myHeart.exists() ? (
    <Button
      backgroundColor="white"
      color="pink.400"
      leftIcon={<IoHeartDislike size="24px" />}
      onClick={() => removeHeart(deckUid, deckId)}
    >
      Remove Heart {heartCount}
    </Button>
  ) : (
    <Button
      backgroundColor="white"
      color="pink.400"
      leftIcon={<IoHeartOutline size="24px" />}
      onClick={() => addHeart(deckUid, deckId)}
    >
      Give Heart
    </Button>
  );
}
