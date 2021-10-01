import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { UpdatePodcastPayload } from "../../__generated__/globalTypes";
import {
  podcastQuery,
  podcastQueryVariables,
} from "../../__generated__/podcastQuery";
import {
  updatePodcastMutation,
  updatePodcastMutationVariables,
} from "../../__generated__/updatePodcastMutation";
import { PODCAST_QUERY } from "../listener/podcast";

export const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($updatePodcastInput: UpdatePodcastInput!) {
    updatePodcast(input: $updatePodcastInput) {
      ok
      error
    }
  }
`;

export const UpdatePodcast: React.FC = () => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const dataInit = React.useRef<boolean>(false);
  const history = useHistory();
  const location = useLocation<{ id: number }>();
  const { data, loading, refetch } = useQuery<
    podcastQuery,
    podcastQueryVariables
  >(PODCAST_QUERY, {
    variables: {
      input: {
        id: +location?.state?.id,
      },
    },
  });

  const handleBack = () => {
    history.goBack();
  };

  const onCompleted = (data: updatePodcastMutation) => {
    if (data.updatePodcast.ok) {
      alert("Podcast가 수정되었습니다.");
      refetch();
      handleBack();
    }
  };
  const [updatePodcastMutation, { data: updateData, loading: updating }] =
    useMutation<updatePodcastMutation, updatePodcastMutationVariables>(
      UPDATE_PODCAST_MUTATION,
      { onCompleted }
    );

  const onValid = async () => {
    if (loading) return;
    const { file, title, category, rating, description } = getValues();
    const actualFile = file[0];
    const formBody = new FormData();
    let thumbnailUrl;
    if (actualFile) {
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch("https://nuber-eats-backend-wise7034.herokuapp.com/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      thumbnailUrl = url;
    }
    const payload: UpdatePodcastPayload = {
      title,
      category,
      rating: +rating,
      description,
    };

    if (thumbnailUrl) {
      payload.thumbnailUrl = thumbnailUrl;
    }
    updatePodcastMutation({
      variables: {
        updatePodcastInput: {
          id: +location?.state?.id,
          payload,
        },
      },
    });
  };

  useEffect(() => {
    if (!data || dataInit.current) {
      return;
    }
    dataInit.current = true;
    if (data?.getPodcast?.podcast) {
      setValue("title", data?.getPodcast?.podcast.title);
      setValue("rating", data?.getPodcast?.podcast.rating);
      setValue("category", data?.getPodcast?.podcast.category);
      setValue("description", data?.getPodcast?.podcast.description);
      setThumbnailUrl(data?.getPodcast?.podcast.thumbnailUrl);
    }
  }, [data]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">Podcast 수정</h1>
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
              ref={register()}
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
              ref={register()}
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
            {thumbnailUrl && (
              <p className="break-all">
                <a href={thumbnailUrl} target="_blank">
                  {thumbnailUrl}
                </a>
              </p>
            )}
          </div>
          {updateData?.updatePodcast.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {updateData.updatePodcast.error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="bg-gray-900 text-white py-3 w-full hover:opacity-90 rounded-3xl"
            >
              {updating ? "loading" : "Submit"}
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
