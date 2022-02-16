import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/index/disconnected/Footer";
import Priv from "../components/Priv";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus, requestRefresh } from "../state/auth/authActions";
import { useSelector } from "react-redux";
export default function Layout({ title, description, children, home }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (dispatch && dispatch !== "null" && dispatch !== "undefined") {
      // dispatch(checkAuthStatus());
      dispatch(requestRefresh());
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{`${title} • Intellicards`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="copyright" content="© 2021 intellicards"></meta>
        <meta
          name="keywords"
          content="intellicards, learn, study, efficient, easy"
        />
        <meta name="author" content="Fabrizio Torrico" />
        <meta name="description" content={description} />
      </Head>
      <NavBar home={home} />
      <main
        style={{
          paddingTop: "4rem",
          minHeight: "60vh",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "",
  description:
    "Intellicards will help you study better and increase your productivity by merging different educational tools and games",
};
