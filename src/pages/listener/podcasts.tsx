import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  EPISODE_FRAGMENT,
  PODCAST_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../../fragments";
import { searchPodcastsPageQuery } from "../../__generated__/searchPodcastsPageQuery";
import { PodcastCardList } from "../../components/podcastCardList";
import { getAllCategoriesQuery } from "../../__generated__/getAllCategoriesQuery";

export const ALL_CATEGORIES_QUERY = gql`
  query getAllCategoriesQuery {
    getAllCategories {
      error
      ok
      categories
    }
  }
`;

export const SEARCH_PODCASTS_QUERY = gql`
  query searchPodcastsPageQuery($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
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

interface SearchQueryInput {
  categoryQuery: string;
  titleQuery: string;
}
export const Podcasts = () => {
  const [query, setQuery] = useState<SearchQueryInput>({
    titleQuery: "",
    categoryQuery: "",
  });
  const { register, handleSubmit, getValues } = useForm();
  const { data, loading } =
    useQuery<getAllCategoriesQuery>(ALL_CATEGORIES_QUERY);

  const allCategories = data?.getAllCategories?.categories ?? [];

  const { data: searchData, loading: searchLoding } =
    useQuery<searchPodcastsPageQuery>(SEARCH_PODCASTS_QUERY, {
      variables: {
        input: {
          categoryQuery: query.categoryQuery,
          titleQuery: query.titleQuery,
        },
      },
      fetchPolicy: "network-only",
    });

  const onValid = () => {
    if (loading) return;
    const { category, title } = getValues();
    setQuery({
      categoryQuery: category,
      titleQuery: title,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Podcast List</title>
      </Helmet>
      {!loading && (
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <div className="text-center">
              <select
                title="카테고리 선택"
                className="input rounded-3xl p-3 max-w-lg"
                name="category"
                ref={register()}
              >
                <option value={""}>전체</option>
                {allCategories.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
              <input
                className="input rounded-3xl p-3 w-full max-w-lg mx-3"
                placeholder="검색할 제목을 입력하세요."
                name="title"
                ref={register()}
              />
              <button
                type="submit"
                className="bg-gray-900 text-white py-3 w-20 hover:opacity-90 rounded-3xl"
              >
                검색
              </button>
            </div>
          </form>
        </div>
      )}
      {!searchLoding && (
        <PodcastCardList data={searchData?.searchPodcasts.podcasts ?? []} />
      )}
    </div>
  );
};

export default Podcasts;
