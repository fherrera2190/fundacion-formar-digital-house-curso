import { Card, CardBody, CardFooter, CardHeader, Table } from "react-bootstrap";
import { TableItem } from "../components/TableItem";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Paginator } from "../components/Paginator";
import { FormSearch } from "../components/FormSearch";
import { showMessageSuccess } from "../components/Toast";
import Swal from "sweetalert2";
import { FormModal } from "../components/FormModal";

export const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState();
  const [movie, setMovie] = useState(null);

  //---------------------Form Modal

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //---------------------Fin Form Modal

  // http://localhost:3001/api/v1/movies
  const getMovies = async (endpoint = "/api/v1/movies") => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001${endpoint}`);
      const result = await response.json();
      setPagination(result.meta);
      setLoading(false);
      setMovies(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  const handleAddMovie = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/movies`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      showMessageSuccess(result.message);
      getMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (event, endpoint) => {
    event.preventDefault();
    getMovies(endpoint);
  };

  const handleEditMovie = async (id) => {
    handleShow()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/movies/${id}`
      );
      const result = await response.json();
      result.ok && setMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMovie = async (id, data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();

      setMovies(
        movies.map((movie) =>
          movie.id === result.data.id ? result.data : movie
        )
      );
      showMessageSuccess(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMovie = async (id) => {
    Swal.fire({
      title: "Esta seguro de eliminar esta pelicula",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      denyButtonText: `Cancelar`,
      denyButtonColor: "grey"
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/movies/${id}`,
            {
              method: "DELETE"
            }
          );
          const result = await response.json();

          if (result.ok) {
            showMessageSuccess(result.message);
            setMovies(movies.filter((movie) => movie.id !== id));
          }
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Card className="shadow col-12">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <h4>Movies</h4>
              <button className="btn  ml-5 btn-primary " onClick={handleShow}>
              <i className="fas fa-plus-square"></i>
              </button>
            </div>
            <FormSearch getMovies={getMovies} />
          </div>
        </CardHeader>
        <CardBody className="w-100">
          <Table striped borderless>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Duración</th>
                <th>Rating</th>
                <th>Géneros</th>
                <th>Premios</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <TableItem
                  key={movie.id}
                  movie={movie}
                  handleEditMovie={handleEditMovie}
                  handleDeleteMovie={handleDeleteMovie}
                />
              ))}
            </tbody>
          </Table>
        </CardBody>

        <CardFooter className="d-flex justify-content-center align-items-center ">
          <Paginator
            pagination={pagination}
            handlePagination={handlePagination}
          />
        </CardFooter>
      </Card>
      <FormModal
        show={show}
        handleClose={handleClose}
        handleAddMovie={handleAddMovie}
        movie={movie}
        setMovie={setMovie}
        handleUpdateMovie={handleUpdateMovie}
      />
    </div>
  );
};
