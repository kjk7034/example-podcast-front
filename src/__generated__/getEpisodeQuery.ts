/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeQuery
// ====================================================

export interface getEpisodeQuery_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  description: string | null;
}

export interface getEpisodeQuery_getEpisode {
  __typename: "EpisodeOutput";
  error: string | null;
  ok: boolean;
  episode: getEpisodeQuery_getEpisode_episode | null;
}

export interface getEpisodeQuery {
  getEpisode: getEpisodeQuery_getEpisode;
}

export interface getEpisodeQueryVariables {
  input: EpisodesSearchInput;
}
