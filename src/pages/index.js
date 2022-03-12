import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <Layout home>
      <DisconnectedPage />
    </Layout>
  );
}
