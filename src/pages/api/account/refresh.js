import backend from "../../../apis/backend";
import cookie from "cookie";
import { NODE_ENV } from "../../../config";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh ?? false;

    if (refresh === false) {
      return res.status(403).json({ error: `No refresh token ` });
    }

    const body = JSON.stringify({
      refresh,
    });

    try {
      await backend
        .post("/api/token/refresh/", body)
        .then((apiRes) => {
          console.log("correct");
          if (apiRes.status === 200) {
            res.setHeader("Set-Cookie", [
              cookie.serialize("access", apiRes.data.access, {
                httpOnly: true,
                secure: NODE_ENV !== "development",
                maxAge: 60 * 30,
                sameSite: "strict",
                path: "/api/",
              }),
              cookie.serialize("refresh", apiRes.data.refresh, {
                httpOnly: true,
                secure: NODE_ENV !== "development",
                maxAge: 60 * 60 * 24,
                sameSite: "strict",
                path: "/api/",
              }),
            ]);

            return res.status(200).json({
              success: "Refresh request Succesfully",
            });
          }
        })
        .catch((err) =>
          res
            .status(err.response.status)
            .json({ error: "Failed to fullfill refresh request" })
        );
    } catch (err) {
      return res
        .status(500)
        .json({
          error: "Something went wrong when trying to fullfill refresh request",
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
