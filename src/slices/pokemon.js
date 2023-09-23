import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (name) => `photos`,
    }),
  }),
});

export const { useGetAllPostsQuery } = pokemonApi;
