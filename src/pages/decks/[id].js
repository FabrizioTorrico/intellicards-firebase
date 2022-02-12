import Layout from "../../hocs/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Deck() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  //   const deckData = useSelector((state) => state.user.decks[id]);
  //   console.log(deckData);
  return <div>The dynamic route is {id}</div>;
}
