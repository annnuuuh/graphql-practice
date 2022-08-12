/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import MyDatabase from "./MyDatabase";

const knexConfig = {
  client: "pg",
  connection: {
    host: process.env.HOST!!,
    port: process.env.PORT!!,
    user: process.env.USER!!,
    password: process.env.PASSWORD!!,
    database: process.env.DB!!,
  },
};

const db = new MyDatabase(knexConfig);

const typeDefs = gql`
  type State {
    id: String
    name: String
    isActive: Boolean
    counties: [County]
  }

  type County {
    id: ID!
    name: String!
    stateId: String!
    isActive: Boolean!
    isRestricted: Boolean!
    cities: [City]
    requirementsId: ID!
    requirements: [PropertyRequirement]
  }

  type City {
    id: ID!
    name: String!
    countyId: County!
    isActive: Boolean!
    requirements: [PropertyRequirement]
  }

  type RestrictedZip {
    zipFirstFive: Int!
    reason: String!
  }

  type PropertyRequirement {
    id: ID
    name: String
    maxCashOffer: Int
    minBedrooms: Int
    minBathrooms: String
    minYearBuilt: Int
    minSqft: Int
    maxSqft: Int
    minAskedPrice: Int
    minSqftDisplay: Int
  }

  type Query {
    states: [State]
  }
`;

const resolvers = {
  Query: {
    states: () => {
      return db.getActiveStates();
    },
  },
  State: {
    counties: (state: { id: any }) => {
      return db.getActiveCounties(state.id);
    },
  },
  County: {
    cities: (county: { id: any }) => {
      return db.getCities(county.id);
    },
    requirements: (county: { requirementsId: any }) => {
      return db.getPropertyRequirements(county.requirementsId);
    },
  },
  City: {
    requirements: (city: { requirementsId: any }) => {
      return db.getPropertyRequirements(city.requirementsId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  dataSources: () => ({ db }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
