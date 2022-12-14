import Head from "next/head";
import { useForm } from "react-hook-form";
import  axios  from "axios";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    
    await axios.post('/api/hello', data)


  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="name"
          name="name"
          {...register("name", { required: true, minLength: 2 })}
        />
        {errors.name && <p>name is invalid</p>}
        <input
          type="text"
          placeholder="cognome"
          name="surname"
          {...register("surname", {
            required: "surname required",
            minLength: {
              value: 8,
              message: "il cognome deve avere lunghezza minima di 8",
            },
            maxLength:{
              value: 12,
              message: "il cognome deve avere lunghezza massima di 12",
            }
          })}
        />
        {errors.surname && <p>{errors.surname.message}</p>}
        <button>invia</button>
      </form>
    </div>
  );
}

