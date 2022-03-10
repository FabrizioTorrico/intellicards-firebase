import cookie from "cookie";
import backend from "../../../apis/backend";
import { NODE_ENV } from "../../../config";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    console.log(body);
    try {
      await backend
        .post("/api/token/", body)
        .then((backendRes) => {
          if (backendRes.status === 200) {
            res.setHeader("Set-Cookie", [
              cookie.serialize("access", backendRes.data.access, {
                httpOnly: true,
                secure: NODE_ENV !== "development",
                maxAge: 60 * 30,
                sameSite: "strict",
                path: "/api/",
              }),
              cookie.serialize("refresh", backendRes.data.refresh, {
                httpOnly: true,
                secure: NODE_ENV !== "development",
                maxAge: 60 * 60 * 24,
                sameSite: "strict",
                path: "/api/",
              }),
            ]);

            return res.status(200).json({
              success: "Logged In Succesfully",
            });
          }
        })
        .catch((err) => {
          res
            .status(err.response.status)
            .json({ error: "Authentication failed" });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong when authenticated " });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
