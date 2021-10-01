import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    category
    rating
    description
    thumbnailUrl
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    id
    title
    category
    description
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewParts on Review {
    id
    title
    text
  }
`;
