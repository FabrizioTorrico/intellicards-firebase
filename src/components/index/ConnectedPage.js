import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";

export default function ConnectedPage() {
  const user = useSelector((state) => state.user);

  return <div>welcome {user?.username}</div>;
}
