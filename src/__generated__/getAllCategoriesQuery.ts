/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllCategoriesQuery
// ====================================================

export interface getAllCategoriesQuery_getAllCategories {
  __typename: "PodcastCategoriesOutput";
  error: string | null;
  ok: boolean;
  categories: string[] | null;
}

export interface getAllCategoriesQuery {
  getAllCategories: getAllCategoriesQuery_getAllCategories;
}
