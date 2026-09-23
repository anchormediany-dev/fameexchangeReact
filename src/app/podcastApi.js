import { api } from "./api";

export const podcastApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Public — no auth needed, same as the FAQ/team-public endpoints.
    getPodcastEpisodes: builder.query({
      query: () => "/podcast/episodes",
    }),
  }),
});

export const { useGetPodcastEpisodesQuery } = podcastApi;
