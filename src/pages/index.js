import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
import { useAuth } from "../firebase/auth.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { currentUserData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (currentUserData) router.push(`/${currentUserData.username}`);
  }, [currentUserData]);
  return (
    <Layout home>
      <DisconnectedPage />
    </Layout>
  );
}
