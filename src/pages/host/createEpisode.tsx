import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import {
  createEpisodeMutation,
  createEpisodeMutationVariables,
} from "../../__generated__/createEpisodeMutation";

export const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutation($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(input: $createEpisodeInput) {
      ok
      error
      id
    }
  }
`;

export const CreateEpisode: React.FC = () => {
  const { register, handleSubmit, getValues } = useForm();
  const history = useHistory();
  const location = useLocation<{ podcastId: number }>();

  const onCompleted = (data: createEpisodeMutation) => {
    if (data.createEpisode.ok) {
      alert("Episode가 생성되었습니다.");
      history.push(`/episodes/${location?.state?.podcastId}`);
    }
  };
  const [createEpisodeMutation, { data, loading }] = useMutation<
    createEpisodeMutation,
    createEpisodeMutationVariables
  >(CREATE_EPISODE_MUTATION, { onCompleted });

  const onValid = () => {
    if (loading) return;
    const { title, category, description } = getValues();
    createEpisodeMutation({
      variables: {
        createEpisodeInput: {
          title,
          category,
          description,
          podcastId: +location?.state?.podcastId,
        },
      },
    });
  };
  const handleBack = () => {
    history.goBack();
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">Episode 생성</h1>
        <form
          className="grid gap-3 mt-3 px-10"
          onSubmit={handleSubmit(onValid)}
        >
          <div>
            <div className="text-left mb-2">
              <label htmlFor="title" className="text-2xl">
                title
                <em className="text-red-500 ml-2" title="required">
                  *
                </em>
              </label>
            </div>
            <input
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="title"
              name="title"
              id="title"
              required
              ref={register({ required: true })}
            />
          </div>
          <div>
            <div className="text-left mb-2">
              <label htmlFor="category" className="text-2xl">
                category
                <em className="text-red-500 ml-2" title="required">
                  *
                </em>
              </label>
            </div>
            <input
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="category"
              name="category"
              id="category"
              required
              ref={register({ required: true })}
            />
          </div>
          <div>
            <div className="text-left mb-2">
              <label htmlFor="description" className="text-2xl">
                description
              </label>
            </div>
            <input
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="description"
              name="description"
              id="description"
              ref={register()}
            />
          </div>
          {data?.createEpisode.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.createEpisode.error}
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
              onClick={handleBack}
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
