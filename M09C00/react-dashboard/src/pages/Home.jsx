import { ContentRowMovies } from "../components/ContentRowMovies";
import { GenresInDb } from "../components/GenresInDb";
import { LastMovieInDb } from "../components/LastMovieInDb";

export const Home = () => {
  return (
    <div className="row">
      <ContentRowMovies />
      <LastMovieInDb />
      <GenresInDb />
    </div>
  );
};
