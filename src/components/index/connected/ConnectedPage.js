import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";

export default function ConnectedPage() {
  const user = useSelector((state) => state.auth.user);

  return <div>welcome {user !== null && user.username}</div>;
}
