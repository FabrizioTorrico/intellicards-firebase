// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import backend from "../../../apis/backend";

export default async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    console.log(body);

    try {
      await backend
        .post("/api/account/signup", body)
        .then((res) => res.status(201).json(res.data))
        .catch((err) =>
          res.status(err.response.status).json(err.response.data)
        );
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when registering for an account",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
