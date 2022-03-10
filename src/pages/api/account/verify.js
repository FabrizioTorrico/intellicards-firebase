import backend from "../../../apis/backend";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(403).json({ error: `No access token ` });
    }

    const body = JSON.stringify({
      token: access,
    });

    try {
      await backend
        .post("/api/token/verify/", body)
        .then((apiRes) => {
          console.log(apiRes.status);
          if (apiRes.status === 200)
            return res
              .status(200)
              .json({ success: "Authenticated succesfully" });
        })
        .catch((err) =>
          res
            .status(err.response.status)
            .json({ error: "Failed to authenticate" })
        );
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong when trying to authenticate" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
