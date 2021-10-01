import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import {
  PODCAST_FRAGMENT,
  EPISODE_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragments";
import {
  deletePodcastMutation,
  deletePodcastMutationVariables,
} from "../../__generated__/deletePodcastMutation";
import { myPodcastsQuery } from "../../__generated__/myPodcastsQuery";

export const MYPODCASTS_QUERY = gql`
  query myPodcastsQuery {
    myPodcasts {
      error
      ok
      podcasts {
        ...PodcastParts
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

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcastMutation($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      error
      ok
    }
  }
`;

export const MyPodcasts = () => {
  const history = useHistory();
  const { data, loading, refetch } = useQuery<myPodcastsQuery>(
    MYPODCASTS_QUERY,
    {
      fetchPolicy: "network-only",
    }
  );
  const onCompleted = (data: deletePodcastMutation) => {
    const {
      deletePodcast: { ok },
    } = data;
    if (ok) {
      alert("삭제되었습니다.");
      refetch();
    }
  };
  const [deletePodcastMutation, { data: deleteData }] = useMutation<
    deletePodcastMutation,
    deletePodcastMutationVariables
  >(DELETE_PODCAST_MUTATION, {
    onCompleted,
  });
  const handleUpdate = (id: number) => () => {
    history.push({
      pathname: "/updatePodcast",
      state: {
        id,
      },
    });
  };
  const handleDelete = (id: number) => () => {
    try {
      deletePodcastMutation({
        variables: {
          input: {
            id,
          },
        },
      });
    } catch (error) {}
  };
  return (
    <div>
      <Helmet>
        <title>My Podcast List</title>
      </Helmet>
      <h1 className="text-center font-semibold text-2xl mt-10">
        My Podcast List
      </h1>

      {!loading && (
        <div className="mt-10">
          <div className="container flex justify-center mx-auto">
            <div className="flex flex-col">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <table className="divide-y divide-gray-300 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-xs text-gray-500">ID</th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Title
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Category
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Rating
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Description
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          ThumbnailUrl
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Episode Count
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Episode management
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Review Count
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Edit
                        </th>
                        <th className="px-3 py-2 text-xs text-gray-500">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {data?.myPodcasts.podcasts?.map(
                        ({
                          id,
                          title,
                          category,
                          rating,
                          description,
                          episodes,
                          reviews,
                          thumbnailUrl,
                        }) => (
                          <tr className="whitespace-nowrap" key={id}>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {id}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900 text-center">
                              {title}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {category}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {rating}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {description}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {thumbnailUrl ? (
                                <a href={thumbnailUrl} target="_blank">
                                  Link
                                </a>
                              ) : (
                                ""
                              )}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {episodes.length}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <Link
                                to={`/episodes/${id}`}
                                className="px-4 py-1 text-sm text-green-600 bg-green-200 rounded-full"
                              >
                                Move
                              </Link>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500 text-center">
                              {reviews.length}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <button
                                type="button"
                                onClick={handleUpdate(id)}
                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full"
                              >
                                Update
                              </button>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <button
                                type="button"
                                onClick={handleDelete(id)}
                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="text-center mt-3 hover:underline">
        <Link to={`/createPodcast`}>++ Podcast 만들기</Link>
      </p>
    </div>
  );
};

export default MyPodcasts;
