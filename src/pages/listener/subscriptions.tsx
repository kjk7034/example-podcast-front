import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { PodcastCardList } from "../../components/podcastCardList";
import {
  EPISODE_FRAGMENT,
  PODCAST_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragments";
import {
  subscribePodcastsPageQuery,
  subscribePodcastsPageQuery_subscribePodcasts_podcasts_episodes,
} from "../../__generated__/subscribePodcastsPageQuery";

export const SUBSCRIBE_PODCASTS_QUERY = gql`
  query subscribePodcastsPageQuery {
    subscribePodcasts {
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

type ITabName = "podcast" | "episodes";

export const Subscriptions: React.FC = () => {
  const [tab, setTab] = useState<ITabName>("podcast");

  const { data, loading } = useQuery<subscribePodcastsPageQuery>(
    SUBSCRIBE_PODCASTS_QUERY
  );

  const tabClass = (tabName: ITabName) =>
    tabName === tab
      ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold"
      : "bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold";

  const handleTab = (tabName: ITabName) => () => {
    setTab(tabName);
  };
  let episodeList: subscribePodcastsPageQuery_subscribePodcasts_podcasts_episodes[] =
    [];

  data?.subscribePodcasts.podcasts?.forEach((podcast) => {
    episodeList = [...episodeList, ...podcast.episodes];
  });
  episodeList.sort((a, b) => {
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  });
  return (
    <div>
      <h1 className="text-center text-4xl mb-5">내가 구독한 내용</h1>
      <ul className="list-reset flex border-b mb-5 flex-1">
        <li className={tabClass("podcast")}>
          <button type="button" onClick={handleTab("podcast")}>
            PodCast
          </button>
        </li>
        <li className={`${tabClass("episodes")} ml-1`}>
          <button type="button" onClick={handleTab("episodes")}>
            에피소드들
          </button>
        </li>
      </ul>
      {!loading && (
        <>
          {tab === "podcast" && (
            <PodcastCardList data={data?.subscribePodcasts.podcasts ?? []} />
          )}
          {tab === "episodes" && (
            <div>
              <h2 className="font-semibold mb-3">최근 에피소드들</h2>
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
                  {episodeList?.map(({ id, title, category, description }) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
