import React from "react";
import { Link } from "react-router-dom";
import { searchPodcastsPageQuery_searchPodcasts_podcasts } from "../__generated__/searchPodcastsPageQuery";
import { subscribePodcastsPageQuery_subscribePodcasts_podcasts } from "../__generated__/subscribePodcastsPageQuery";

interface IPodcastCardList {
  data: Array<
    | subscribePodcastsPageQuery_subscribePodcasts_podcasts
    | searchPodcastsPageQuery_searchPodcasts_podcasts
  >;
}

export const PodcastCardList: React.FC<IPodcastCardList> = ({ data }) => {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {data?.map(
        ({
          id,
          title,
          category,
          description,
          thumbnailUrl,
          episodes,
          reviews,
        }) => {
          return (
            <div key={id} className="rounded overflow-hidden shadow-lg">
              <Link to={`/podcast/${id}`}>
                <img
                  className="w-full h-52"
                  src={`${thumbnailUrl}`}
                  alt={title}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 truncate">{title}</div>
                  <p className="text-gray-700 text-base h-12 line-clamp-2 break-all">
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description} {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                  </p>
                  <div className="flex items-center">
                    <p className="text-gray-700 text-base">
                      에피소드 {episodes.length}
                    </p>
                    <p className="text-gray-700 text-base ml-5">
                      리뷰 {reviews.length}
                    </p>
                  </div>
                </div>
                <div className="px-6 mb-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {category}
                  </span>
                </div>
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};
