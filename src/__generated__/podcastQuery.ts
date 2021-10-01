/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastQuery
// ====================================================

export interface podcastQuery_getPodcast_podcast_creator {
  __typename: "User";
  email: string;
}

export interface podcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  description: string | null;
}

export interface podcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
}

export interface podcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number | null;
  description: string | null;
  thumbnailUrl: string | null;
  creator: podcastQuery_getPodcast_podcast_creator;
  episodes: podcastQuery_getPodcast_podcast_episodes[];
  reviews: podcastQuery_getPodcast_podcast_reviews[];
}

export interface podcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: podcastQuery_getPodcast_podcast | null;
}

export interface podcastQuery {
  getPodcast: podcastQuery_getPodcast;
}

export interface podcastQueryVariables {
  input: PodcastSearchInput;
}
