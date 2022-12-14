// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as yup from "yup";

export default async function handler(req, res) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  const body = req.body

  try {
    await schema.validate({ email: body.email, password: body.password });
    res.status(200).json({ name: body })
  } catch (err) {
    res.status(404).json({ pippo: 'error' })
  }
}
