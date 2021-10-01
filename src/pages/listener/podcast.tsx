import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
// import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  PODCAST_FRAGMENT,
  EPISODE_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  createReviewMutation,
  createReviewMutationVariables,
} from "../../__generated__/createReviewMutation";
import {
  podcastQuery,
  podcastQueryVariables,
} from "../../__generated__/podcastQuery";
import {
  toggleSubscribeMutation,
  toggleSubscribeMutationVariables,
} from "../../__generated__/toggleSubscribeMutation";

export const CREATE_REVIEW_MUTATION = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
      id
    }
  }
`;

export const TOGGLE_SUBSCRIBE_MUTATION = gql`
  mutation toggleSubscribeMutation($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      error
    }
  }
`;

export const PODCAST_QUERY = gql`
  query podcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
        creator {
          email
        }
        episodes {
          ...EpisodeParts
        }
        reviews {
          ...ReviewParts
        }
      }
    }
  }
  ${PODCAST_FRAGMENT}
  ${EPISODE_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

type ITabName = "episodes" | "reviews";

export const Podcast = () => {
  const { register, handleSubmit, getValues } = useForm();
  const history = useHistory();
  const { data: meData, refetch: refetchMe } = useMe();
  const [tab, setTab] = useState<ITabName>("episodes");
  const params = useParams<IRestaurantParams>();
  const { data, loading, refetch } = useQuery<
    podcastQuery,
    podcastQueryVariables
  >(PODCAST_QUERY, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  const onCompletedToggle = (data: toggleSubscribeMutation) => {
    if (data.toggleSubscribe.ok) {
      refetchMe();
    }
  };
  const [toggleSubscribeMutation] = useMutation<
    toggleSubscribeMutation,
    toggleSubscribeMutationVariables
  >(TOGGLE_SUBSCRIBE_MUTATION, { onCompleted: onCompletedToggle });

  const onCompletedReview = (data: createReviewMutation) => {
    if (data.createReview.ok) {
      alert("리뷰작성이 완료되었습니다.");
      refetch();
    }
  };

  const [createReviewMutation] = useMutation<
    createReviewMutation,
    createReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, { onCompleted: onCompletedReview });

  const tabClass = (tabName: ITabName) =>
    tabName === tab
      ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold"
      : "bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold";

  const handleTab = (tabName: ITabName) => () => {
    setTab(tabName);
  };
  const isSubsription =
    meData?.me?.subsriptions?.findIndex(({ id }) => id === +params.id) ?? -1;
  const handleSubsription = (bool: boolean) => () => {
    toggleSubscribeMutation({
      variables: {
        input: {
          podcastId: +params.id,
        },
      },
    });
  };
  const onValid = () => {
    if (loading) return;
    const { title, text } = getValues();
    createReviewMutation({
      variables: {
        input: {
          podcastId: +params.id,
          title,
          text,
        },
      },
    });
  };
  const handleBack = () => {
    history.goBack();
  };
  return (
    <div>
      <Helmet>
        <title>Home | {data?.getPodcast.podcast?.title ?? ""}</title>
      </Helmet>

      {!loading && (
        <article>
          <div className="p-8">
            <h1 className="text-4xl mb-3">{data?.getPodcast.podcast?.title}</h1>
            <div className="flex items-center mb-3">
              <h2 className="mr-5 font-semibold">작성자</h2>
              <p>{data?.getPodcast.podcast?.creator.email}</p>
            </div>
            <div className="flex items-center mb-3">
              <h2 className="mr-5 font-semibold">카테고리</h2>
              <p>{data?.getPodcast.podcast?.category}</p>
            </div>
            <div className="flex items-center mb-3">
              <h2 className="mr-5 font-semibold">별점</h2>
              <p>{data?.getPodcast.podcast?.rating}</p>
            </div>
            <div className="flex items-center mb-3">
              <h2 className="mr-5 font-semibold">구독</h2>
              <p>
                {isSubsription > -1 ? (
                  <button
                    type="button"
                    onClick={handleSubsription(false)}
                    className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full"
                  >
                    구독해제
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubsription(true)}
                    className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                  >
                    구독하기
                  </button>
                )}
                {/* {meData?.me?.subsriptions &&
                  meData?.me?.subsriptions.includes(1)} */}
              </p>
            </div>
            <ul className="list-reset flex border-b mb-5 flex-1">
              <li className={`${tabClass("episodes")} mr-1`}>
                <button type="button" onClick={handleTab("episodes")}>
                  에피소드들
                </button>
              </li>
              <li className={tabClass("reviews")}>
                <button type="button" onClick={handleTab("reviews")}>
                  리뷰들
                </button>
              </li>
            </ul>
            {tab === "episodes" && (
              <div>
                <h2 className="font-semibold mb-3">에피소드들</h2>
                <table className="divide-y divide-gray-300 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-xs text-gray-500">ID</th>
                      <th className="px-3 py-2 text-xs text-gray-500">Title</th>
                      <th className="px-3 py-2 text-xs text-gray-500">
                        Description
                      </th>
                      <th className="px-3 py-2 text-xs text-gray-500">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {data?.getPodcast.podcast?.episodes?.map(
                      ({ id, title, category, description }) => (
                        <tr className="whitespace-nowrap" key={id}>
                          <td className="px-3 py-2 text-sm text-gray-500 text-center">
                            {id}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 text-center">
                            {title}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500 text-center">
                            {description}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500 text-center">
                            {category}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {tab === "reviews" && (
              <div className="flex">
                <div className="flex-1">
                  <h2 className="font-semibold mb-3">리뷰들</h2>
                  <table className="divide-y divide-gray-300 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-xs text-gray-500">ID</th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Title
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Text
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {data?.getPodcast.podcast?.reviews?.map(
                        ({ id, title, text }) => (
                          <tr className="whitespace-nowrap" key={id}>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {id}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 text-center">
                              {title}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {text}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div>
                  <form onSubmit={handleSubmit(onValid)}>
                    <fieldset className="text-xl mb-5 font-bold">
                      리뷰작성
                    </fieldset>
                    <div className="mb-3">
                      <div className="text-left mb-2">
                        <label htmlFor="title" className="text-xl">
                          title
                        </label>
                      </div>
                      <input
                        className="input rounded-xl p-1 w-full max-w-lg"
                        placeholder="title"
                        name="title"
                        id="title"
                        required
                        ref={register({ required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="text-left mb-2">
                        <label htmlFor="text" className="text-xl">
                          text
                        </label>
                      </div>
                      <input
                        className="input rounded-xl p-1 w-full max-w-lg"
                        placeholder="text"
                        name="text"
                        id="text"
                        required
                        ref={register({ required: true })}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-gray-900 text-white py-3 w-full hover:opacity-90 rounded-3xl"
                      >
                        {loading ? "loading" : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </article>
      )}
      <div className="text-gray-900 text-center">
        <button
          type="button"
          onClick={handleBack}
          className=" hover:underline text-lime-600"
        >
          &larr; go Back~!
        </button>
      </div>
    </div>
  );
};

export default Podcast;
