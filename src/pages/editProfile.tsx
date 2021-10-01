import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../__generated__/editProfileMutation";
import { useMe } from "../hooks/useMe";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`;

export const EditProfile: React.FC = () => {
  const { data: meData } = useMe();

  const { register, handleSubmit, getValues, setValue } = useForm();
  const history = useHistory();
  const onCompleted = (data: editProfileMutation) => {
    if (data.editProfile.ok) {
      alert("프로필이 수정되었습니다.");
      history.goBack();
    }
  };
  const [createAccountMutation, { data, loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onValid = () => {
    if (loading) return;
    const { email, password } = getValues();
    createAccountMutation({
      variables: {
        editProfileInput: { email, password },
      },
    });
  };

  const handleClick = () => {
    history.goBack();
  };

  useEffect(() => {
    setValue("email", meData?.me?.email);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">프로필 수정</h1>
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
          {data?.editProfile.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.editProfile.error}
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
            <button
              type="button"
              onClick={handleClick}
              className="hover:underline"
            >
              go Back~!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
