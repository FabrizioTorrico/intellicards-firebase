import { Button } from "@chakra-ui/react";
import { IoHeartOutline, IoHeartDislike } from "react-icons/io5";
import { addHeart, removeHeart } from "../firebase/firestore";
export default function HeartButton({ myHeart, deckUid, deckId }) {
  return myHeart?.exists() ? (
    <Button
      backgroundColor="white"
      color="pink.400"
      leftIcon={<IoHeartDislike size="24px" />}
      onClick={() => removeHeart(deckUid, deckId)}
    >
      Remove Heart
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
