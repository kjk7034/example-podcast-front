import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const CreateAccount: React.FC = () => {
  const { register, handleSubmit, watch, getValues } = useForm();
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    if (data.createAccount.ok) {
      alert("회원가입이 완료되었습니다.");
      history.push("/");
    }
  };
  const [createAccountMutation, { data, loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onValid = () => {
    if (loading) return;
    const { email, password, role } = getValues();
    createAccountMutation({
      variables: {
        createAccountInput: { email, password, role },
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">회원가입</h1>
        <form
          className="grid gap-3 mt-3 px-10"
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
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="password"
              type="password"
              name="password"
              id="password"
              required
              ref={register({ required: true })}
            />
          </div>
          <hr />
          <div className="flex items-center justify-center">
            <div className="flex-1 flex items-center justify-center">
              <input
                ref={register({ required: true })}
                type="radio"
                id="listener"
                name="role"
                required
                value={UserRole.Listener}
              />
              <label htmlFor="listener" className="ml-2">
                LISTENER
              </label>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <input
                ref={register({ required: true })}
                type="radio"
                id="host"
                name="role"
                required
                value={UserRole.Host}
              />
              <label htmlFor="host" className="ml-2">
                HOST
              </label>
            </div>
          </div>
          {data?.createAccount.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.createAccount.error}
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
          <div className="text-gray-900 text-right">
            <Link to="/" className="hover:underline">
              Log-in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
