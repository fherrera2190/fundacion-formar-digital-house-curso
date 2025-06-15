import { useState } from "react";

export const GenresInDb = () => {
  const [genres, setGenres] = useState([]);

  useState(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}`+"/api/v1/genres");
        const genres = await response.json();
        setGenres(genres.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Genres in Data Base
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {genres.map(genre => {
              return (
                <div key={genre.id} className="col-lg-6 mb-4">
                  <div className="card bg-dark text-white shadow">
                    <div className="card-body">
                      {genre.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
