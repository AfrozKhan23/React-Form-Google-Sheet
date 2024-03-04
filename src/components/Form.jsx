import { useForm } from "react-hook-form";

export function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const submit = (values) => {
  //     alert(JSON.stringify(values));
  //   };

  return (
    <div className="">
      <h2>Register</h2>
      <form onSubmit={handleSubmit()}>
        <dl>
          <dt>User Name</dt>
          <dd>
            <input
              type="text"
              {...register("UserName", {
                required: true,
                minLength: 4,
                pattern: /[A-Z]{4,15}/,
              })}
              name="UserName"
            />
          </dd>
          <dd className="">
            {errors.UserName?.type === "required" ? (
              <span>User Name Required</span>
            ) : <span></span> && errors.UserName?.type === "minLength" ? (
              <span>Name too short..</span>
            ) : <span></span> && errors.UserName?.type === "pattern" ? (
              <span>Name in Block Letters</span>
            ) : (
              <span></span>
            )}
          </dd>
        </dl>
        <button className="">Register</button>
      </form>
    </div>
  );
}
