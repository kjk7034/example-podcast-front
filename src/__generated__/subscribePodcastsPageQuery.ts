/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subscribePodcastsPageQuery
// ====================================================

export interface subscribePodcastsPageQuery_subscribePodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  description: string | null;
}

export interface subscribePodcastsPageQuery_subscribePodcasts_podcasts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface subscribePodcastsPageQuery_subscribePodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number | null;
  description: string | null;
  thumbnailUrl: string | null;
  episodes: subscribePodcastsPageQuery_subscribePodcasts_podcasts_episodes[];
  reviews: subscribePodcastsPageQuery_subscribePodcasts_podcasts_reviews[];
}

export interface subscribePodcastsPageQuery_subscribePodcasts {
  __typename: "SubscribePodcastsOutput";
  error: string | null;
  ok: boolean;
  podcasts: subscribePodcastsPageQuery_subscribePodcasts_podcasts[] | null;
}

export interface subscribePodcastsPageQuery {
  subscribePodcasts: subscribePodcastsPageQuery_subscribePodcasts;
}
