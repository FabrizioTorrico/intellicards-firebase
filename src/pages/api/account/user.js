import cookie from "cookie";
import backend from "../../../apis/backend";

export default async (req, res) => {
  if (req.method === "GET") {
    console.log("in");
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res
        .status(401)
        .json({ error: "User unauthorized to make this request" });
    }

    try {
      const backendRes = await backend.get("/api/account/user", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      console.log(backendRes.data);

      if (backendRes.status === 200) {
        return res.status(200).json(backendRes.data);
      } else {
        return res.status(backendRes.status).json({ user: data.error });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ user: "Something went wrong when retrieving user" });
    }

    return res.status(200).json({ success: "Success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
