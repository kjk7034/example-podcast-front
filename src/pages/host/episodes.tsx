import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { EPISODE_FRAGMENT } from "../../fragments";
import {
  deleteEpisodeMutation,
  deleteEpisodeMutationVariables,
} from "../../__generated__/deleteEpisodeMutation";
import {
  getEpisodesQuery,
  getEpisodesQueryVariables,
} from "../../__generated__/getEpisodesQuery";

export const EPISODES_QUERY = gql`
  query getEpisodesQuery($input: PodcastSearchInput!) {
    getEpisodes(input: $input) {
      error
      ok
      episodes {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisodeMutation($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      error
      ok
    }
  }
`;

export const Episodes = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { data, loading, refetch } = useQuery<
    getEpisodesQuery,
    getEpisodesQueryVariables
  >(EPISODES_QUERY, {
    variables: {
      input: {
        id: Number(params.id),
      },
    },
  });
  const onCompleted = (data: deleteEpisodeMutation) => {
    const {
      deleteEpisode: { ok },
    } = data;
    if (ok) {
      alert("삭제되었습니다.");
      refetch();
    }
  };
  const [deleteEpisodeMutation, { data: deleteData }] = useMutation<
    deleteEpisodeMutation,
    deleteEpisodeMutationVariables
  >(DELETE_EPISODE_MUTATION, {
    onCompleted,
  });
  const handleUpdate = (id: number) => () => {
    history.push({
      pathname: "/updateEpisode",
      state: {
        podcastId: Number(params.id),
        episodeId: id,
      },
    });
  };
  const handleDelete = (id: number) => () => {
    try {
      deleteEpisodeMutation({
        variables: {
          input: {
            podcastId: Number(params.id),
            episodeId: id,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleBack = () => {
    history.goBack();
  };
  return (
    <div>
      <Helmet>
        <title>Episode List</title>
      </Helmet>
      <h1 className="text-center font-semibold text-2xl mt-10">
        Episode List (Podcast 10)
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
                          Description
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
                      {data?.getEpisodes.episodes?.map(
                        ({ id, title, category, description }) => (
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
                              {description}
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
      <p className="text-center mt-3">
        <Link
          to={{
            pathname: `/createEpisode`,
            state: {
              podcastId: Number(params.id),
            },
          }}
          className="hover:underline"
        >
          ++ Episode 만들기
        </Link>
        <Link to="/" className="ml-5 hover:underline">
          My Podcast List
        </Link>
      </p>
    </div>
  );
};

export default Episodes;
