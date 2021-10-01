import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";
import { CreatePodcastInput } from "../../__generated__/globalTypes";

export const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($createPodcastInput: CreatePodcastInput!) {
    createPodcast(input: $createPodcastInput) {
      ok
      error
      id
    }
  }
`;

export const CreatePodcast: React.FC = () => {
  const { register, handleSubmit, getValues } = useForm();
  const history = useHistory();
  const onCompleted = (data: createPodcastMutation) => {
    if (data.createPodcast.ok) {
      alert("Podcast가 생성되었습니다.");
      history.push(`/`);
    }
  };
  const [createPodcastMutation, { data, loading }] = useMutation<
    createPodcastMutation,
    createPodcastMutationVariables
  >(CREATE_PODCAST_MUTATION, { onCompleted });

  const onValid = async () => {
    if (loading) return;
    const { file, title, category, rating, description } = getValues();
    const actualFile = file[0];
    const formBody = new FormData();
    let thumbnailUrl;
    if (actualFile) {
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      thumbnailUrl = url;
    }
    const createPodcastInput: CreatePodcastInput = {
      title,
      category,
      rating: +rating,
      description,
    };

    if (thumbnailUrl) {
      createPodcastInput.thumbnailUrl = thumbnailUrl;
    }
    createPodcastMutation({
      variables: {
        createPodcastInput,
      },
    });
  };
  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">Podcast 생성</h1>
        <form
          className="grid gap-3 mt-3 px-10"
          onSubmit={handleSubmit(onValid)}
        >
          <div>
            <div className="text-left mb-2">
              <label htmlFor="title" className="text-2xl">
                title
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
              <label htmlFor="rating" className="text-2xl">
                rating
              </label>
            </div>
            <input
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="rating"
              type="number"
              name="rating"
              id="rating"
              min={0}
              max={10}
              ref={register()}
            />
          </div>
          <div>
            <div className="text-left mb-2">
              <label htmlFor="description" className="text-2xl">
                description
              </label>
            </div>
            <textarea
              className="input rounded-3xl p-3 w-full max-w-lg h-40 resize-none"
              placeholder="description"
              name="description"
              id="description"
              ref={register()}
            />
          </div>
          <div>
            <div className="text-left mb-2">
              <label htmlFor="file" className="text-2xl">
                thumbnail
              </label>
            </div>
            <input
              type="file"
              className="input rounded-3xl p-3 w-full max-w-lg"
              placeholder="file"
              name="file"
              id="file"
              ref={register()}
            />
          </div>

          {data?.createPodcast.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.createPodcast.error}
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
