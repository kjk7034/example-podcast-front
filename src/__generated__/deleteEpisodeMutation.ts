/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEpisodeMutation
// ====================================================

export interface deleteEpisodeMutation_deleteEpisode {
  __typename: "CoreOutput";
  error: string | null;
  ok: boolean;
}

export interface deleteEpisodeMutation {
  deleteEpisode: deleteEpisodeMutation_deleteEpisode;
}

export interface deleteEpisodeMutationVariables {
  input: EpisodesSearchInput;
}
