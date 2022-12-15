// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as yup from "yup";

export default async function handler(req, res) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });

  const body = req.body;
  console.log(body);
  try {
    await schema.validate(
      { email: body.email, password: body.password },
      { abortEarly: false }
    );
    res.status(200).json({ name: body });
  } catch (error) {
    const errorsObj = error.errors.reduce((acc, err) => {
      // extract the key from the error message
      const key = err.split(" ")[0];
      // add the key and error message to the errors object
      acc[key] = err;
      return acc;
    }, {});
    console.log(errorsObj);
    res.status(501).json({errori : errorsObj});
  }
}
