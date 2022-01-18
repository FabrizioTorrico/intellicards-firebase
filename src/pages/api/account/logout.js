import cookie from "cookie";
import backend from "../../../apis/backend";
import { NODE_ENV } from "../../../config";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    console.log("da body: ", body);

    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        secure: NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/api/",
      }),
      cookie.serialize("refresh", "", {
        httpOnly: true,
        secure: NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/api/",
      }),
    ]);
    return res.status(200).json({
      success: "Logged out Succesfully",
    });
  }
};
