module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "podcast",
      url: "https://nuber-eats-backend-wise7034.herokuapp.com/graphql",
    },
  },
};
