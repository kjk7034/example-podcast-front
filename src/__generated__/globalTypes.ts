/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  category: string;
  podcastId: number;
  description?: string | null;
}

export interface CreatePodcastInput {
  thumbnailUrl?: string | null;
  description?: string | null;
  rating?: number | null;
  title: string;
  category: string;
}

export interface CreateReviewInput {
  title: string;
  text: string;
  podcastId: number;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface PodcastSearchInput {
  id: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  titleQuery?: string | null;
  categoryQuery?: string | null;
}

export interface ToggleSubscribeInput {
  podcastId: number;
}

export interface UpdateEpisodeInput {
  podcastId: number;
  episodeId: number;
  title?: string | null;
  category?: string | null;
  description?: string | null;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  thumbnailUrl?: string | null;
  description?: string | null;
  rating?: number | null;
  title: string;
  category: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
