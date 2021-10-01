/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPodcastsQuery
// ====================================================

export interface myPodcastsQuery_myPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  description: string | null;
}

export interface myPodcastsQuery_myPodcasts_podcasts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface myPodcastsQuery_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number | null;
  description: string | null;
  thumbnailUrl: string | null;
  episodes: myPodcastsQuery_myPodcasts_podcasts_episodes[];
  reviews: myPodcastsQuery_myPodcasts_podcasts_reviews[];
}

export interface myPodcastsQuery_myPodcasts {
  __typename: "MyPodcastsOutput";
  error: string | null;
  ok: boolean;
  podcasts: myPodcastsQuery_myPodcasts_podcasts[];
}

export interface myPodcastsQuery {
  myPodcasts: myPodcastsQuery_myPodcasts;
}
