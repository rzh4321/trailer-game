import type { CategoryToTableName } from "./types";

// key is URL route, value is the table name
const categoryToTableName: CategoryToTableName = {
  all: "All",
  "highest-critic": "Highest_critic",
  "lowest-critic": "Lowest_critic",
  "highest-audience": "Highest_audience",
  "lowest-audience": "Lowest_audience",
  controversial: "Controversial",
  g: "G",
  pg: "PG",
  "pg-13": "PG_13",
  r: "R",
  "nc-17": "NC_17",
  action: "Action",
  adventure: "Adventure",
  animation: "Animation",
  anime: "Anime",
  biography: "Biography",
  comedy: "Comedy",
  crime: "Crime",
  documentary: "Documentary",
  drama: "Drama",
  horror: "Horror",
};

export default categoryToTableName;
