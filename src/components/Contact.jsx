import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Contact = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name cannot be Empty..."),
    email: yup
      .string()
      .email("Please provide valid email address...")
      .required("Please provide your email..."),
    phone: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .positive()
      .integer()
      .min(6, "At least 6 digit phone Number required...")
      .required("Phone Number is Required..."),

    msg: yup
      .string()
      .min(5, "message should be at least 5 words...")
      .max(50)
      .required("Sens us your Query..."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      fetch(
        "https://api.sheety.co/d8b5979529459f5bbc4646434fdaff10/contact/sheet1",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            values: [data],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
    reset();
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <div className=" border border-slate-950 h-[550px] w-[400px] bg-gradient-to-r from-slate-300 to-slate-500  rounded-md">
        <form action="" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-extrabold text-center mb-4 text-4xl text-zinc-700 ">
            Contact Us
          </h1>
          <label
            className="ml-4 mr-4 font-bold text-xl text-zinc-700"
            htmlFor="name"
            id="name"
          >
            Name *:
          </label>

          <input
            className=" p-2 m-2 ml-4 w-[250px] outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-gray-500 focus:border-gray-700"
            type="text"
            placeholder="Enter Your Name..."
            autoFocus
            {...register("name")}
          />
          <br />
          <p className="text-center text-slate-800 text-sm ml-3">
            {errors.name?.message}
          </p>

          <label
            className="ml-4 mr-4 font-bold text-xl text-zinc-700"
            htmlFor="email"
            id="email"
          >
            Email *:
          </label>

          <input
            className="p-2 m-2 ml-5 w-[250px] outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-gray-500 focus:border-gray-700"
            type="email"
            placeholder="Enter Your Email..."
            {...register("email")}
          />
          <br />
          <p className="text-center text-slate-800 text-sm ml-6">
            {errors.email?.message}
          </p>

          <label
            className="ml-4 mr-5 font-bold text-xl text-zinc-700"
            htmlFor="name"
            id="phone"
          >
            Phone *:
          </label>

          <input
            className="p-2 m-2 ml- w-[250px] outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-gray-500 focus:border-gray-700"
            type="number"
            placeholder="Enter Your Phone number..."
            {...register("phone")}
          />
          <br />
          <p className="text-center text-slate-800 text-sm ml-8">
            {errors.phone?.message}
          </p>

          <label
            className="ml-4 mr-1 text-center flex-col align-top mt-5 font-bold text-xl text-zinc-700"
            htmlFor="message"
            id="message"
          >
            Message *:
          </label>

          <textarea
            className="p-2 m-2 ml-1 w-[250px] outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-gray-500 focus:border-gray-700"
            name="msg"
            id="msg"
            cols="15"
            rows="3"
            placeholder="Enter Message..."
            {...register("msg")}
          ></textarea>
          <br />
          <p className="ml-16 text-center text-slate-800 text-sm">
            {errors.msg?.message}
          </p>

          <button
            type="submit"
            className="p-2 ml-32 mt-12 w-40 rounded-xl bg-cyan-900 text-xl font-bold text-white hover:bg-gray-500 hover:text-black "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
