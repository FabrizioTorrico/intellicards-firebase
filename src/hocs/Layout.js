import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/index/disconnected/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../actions/auth";

export default function Layout({ title, description, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== "null" && dispatch !== "undefined") {
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="copyright" content="© 2021 intellicards"></meta>
        <meta
          name="keywords"
          content="intellicards, learn, study, efficient, easy"
        />
        <meta name="author" content="Fabrizio Torrico" />
        <meta name="description" content={description} />
      </Head>
      <NavBar />
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
  title: "Intellicards!",
  description:
    "Intellicards will help you study better and increase your productivity by merging different educational tools and games",
};
