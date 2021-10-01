/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodesQuery
// ====================================================

export interface getEpisodesQuery_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  description: string | null;
}

export interface getEpisodesQuery_getEpisodes {
  __typename: "EpisodesOutput";
  error: string | null;
  ok: boolean;
  episodes: getEpisodesQuery_getEpisodes_episodes[] | null;
}

export interface getEpisodesQuery {
  getEpisodes: getEpisodesQuery_getEpisodes;
}

export interface getEpisodesQueryVariables {
  input: PodcastSearchInput;
}
