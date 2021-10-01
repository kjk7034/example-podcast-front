/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcastsPageQuery
// ====================================================

export interface searchPodcastsPageQuery_searchPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  description: string | null;
}

export interface searchPodcastsPageQuery_searchPodcasts_podcasts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface searchPodcastsPageQuery_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number | null;
  description: string | null;
  thumbnailUrl: string | null;
  episodes: searchPodcastsPageQuery_searchPodcasts_podcasts_episodes[];
  reviews: searchPodcastsPageQuery_searchPodcasts_podcasts_reviews[];
}

export interface searchPodcastsPageQuery_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcastsPageQuery_searchPodcasts_podcasts[] | null;
}

export interface searchPodcastsPageQuery {
  searchPodcasts: searchPodcastsPageQuery_searchPodcasts;
}

export interface searchPodcastsPageQueryVariables {
  input: SearchPodcastsInput;
}
