import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useState } from "react";

const schema = yup.object().shape({
    // .email() tolto per vedere se funzionava la validazione lato server
  email: yup.string().required(),
  password: yup.string().max(32).required(),
});

const Pippo = () => {

    const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
        setError(null)
        await axios.post('/api/hello', data)
    reset();
    } catch (err) {
        setError(err.response.data.error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <div>{error && <p>{error}</p>}</div>
      <br />

      <input {...register("email")} placeholder="email" type="email" required />
      <p>{errors.email?.message}</p>
      <br />

      <input
        {...register("password")}
        placeholder="password"
        type="password"
        required
      />
      <p>{errors.password?.message}</p>
      <br />

      <button type="submit">Sign in</button>
    </form>
  );
};

export default Pippo;