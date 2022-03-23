import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";

export default function Home() {
  return (
    <Layout home>
      <DisconnectedPage />
    </Layout>
  );
}
