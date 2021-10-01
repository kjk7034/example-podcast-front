import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isLoggedInVar, tokenVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../const";

interface ILoginForm {
  email: string;
  password: string;
}

interface ILoginMutation {
  login: {
    error?: string;
    ok: boolean;
    token?: string;
  };
}

interface ILoginMutationVariables extends ILoginForm {}

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

export const Login: React.FC = () => {
  const { register, handleSubmit, getValues } = useForm<ILoginForm>();

  const onCompleted = (data: ILoginMutation) => {
    const { ok, token } = data.login;
    if (!ok) return;
    if (token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      tokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data, loading }] = useMutation<
    ILoginMutation,
    ILoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onValid = () => {
    if (loading) return;
    loginMutation({
      variables: {
        email: getValues().email,
        password: getValues().password,
      },
      fetchPolicy: "network-only",
    });
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">Log-in</h1>
        <form
          className="grid gap-3 mt-5 px-10"
          onSubmit={handleSubmit(onValid)}
        >
          <div>
            <div className="text-left mb-2">
              <label htmlFor="email" className="text-2xl">
                E-mail
              </label>
            </div>
            <input
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="email"
              type="email"
              name="email"
              id="email"
              required
              ref={register({ required: true })}
            />
          </div>
          <div>
            <div className="text-left mb-2">
              <label htmlFor="password" className="text-2xl">
                Password
              </label>
            </div>
            <input
              className="input rounded-3xl p-3 w-full max-w-lg bg-gray-200"
              placeholder="password"
              type="password"
              name="password"
              id="password"
              required
              ref={register({ required: true })}
            />
          </div>
          {data?.login.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.login.error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="bg-gray-900 text-white py-3 w-full hover:opacity-90 rounded-3xl"
            >
              {loading ? "loading" : "Submit"}
            </button>
          </div>
          <div className="text-right">
            <Link
              to="/create-account"
              className="text-gray-900 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
