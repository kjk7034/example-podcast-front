import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { EPISODE_FRAGMENT } from "../../fragments";
import {
  getEpisodeQuery,
  getEpisodeQueryVariables,
} from "../../__generated__/getEpisodeQuery";
import {
  updateEpisodeMutation,
  updateEpisodeMutationVariables,
} from "../../__generated__/updateEpisodeMutation";

export const EPISODE_QUERY = gql`
  query getEpisodeQuery($input: EpisodesSearchInput!) {
    getEpisode(input: $input) {
      error
      ok
      episode {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

export const UPDATE_EPISODE_MUTATION = gql`
  mutation updateEpisodeMutation($updateEpisodeInput: UpdateEpisodeInput!) {
    updateEpisode(input: $updateEpisodeInput) {
      ok
      error
    }
  }
`;

export const UpdateEpisode: React.FC = () => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const dataInit = React.useRef<boolean>(false);
  const history = useHistory();
  const location = useLocation<{ podcastId: number; episodeId: number }>();
  const { data, loading, refetch } = useQuery<
    getEpisodeQuery,
    getEpisodeQueryVariables
  >(EPISODE_QUERY, {
    variables: {
      input: {
        podcastId: +location?.state?.podcastId,
        episodeId: +location?.state?.episodeId,
      },
    },
  });

  const onCompleted = (data: updateEpisodeMutation) => {
    if (data.updateEpisode.ok) {
      alert("Episode가 수정되었습니다.");
      history.push(`/episodes/${location?.state?.podcastId}`);
    }
  };
  const [updateEpisodeMutation, { data: updateData, loading: updating }] =
    useMutation<updateEpisodeMutation, updateEpisodeMutationVariables>(
      UPDATE_EPISODE_MUTATION,
      { onCompleted }
    );

  const onValid = () => {
    if (loading) return;
    const { title, category, description } = getValues();
    updateEpisodeMutation({
      variables: {
        updateEpisodeInput: {
          title,
          category,
          description,
          podcastId: +location?.state?.podcastId,
          episodeId: +location?.state?.episodeId,
        },
      },
    });
  };
  const handleBack = () => {
    history.goBack();
  };
  console.log("data", data);
  React.useEffect(() => {
    if (!data || dataInit.current) {
      return;
    }
    dataInit.current = true;
    if (data?.getEpisode?.episode) {
      setValue("title", data?.getEpisode?.episode.title);
      setValue("description", data?.getEpisode?.episode.description);
      setValue("category", data?.getEpisode?.episode.category);
    }
  }, [data]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-4xl">Episode 수정</h1>
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
          {updateData?.updateEpisode.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {updateData.updateEpisode.error}
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
