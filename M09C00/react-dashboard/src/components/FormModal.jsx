// import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validate } from "../validations/movie-validator";
export const FormModal = ({
  show,
  handleClose,
  handleAddMovie,
  movie,
  setMovie,
  handleUpdateMovie
}) => {
  const [genres, setGenres] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      rating: "",
      awards: "",
      release_date: "",
      length: "",
      genre_id: ""
    },
    validate,
    onSubmit: (values) => {
      movie ? handleUpdateMovie(movie.id, values) : handleAddMovie(values);
      formik.handleReset();
      handleClose()
    }
  });

  const getGenres = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/genres`);
    const result = await response.json();
    setGenres(result.data);
  };

  const handleCancel = () => {
    setMovie(null);
    formik.handleReset();
    handleClose()
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    if (movie) {
      formik.setValues({
        title: movie.title,
        rating: movie.rating,
        awards: movie.awards,
        release_date: movie.release_date.split("T")[0],
        length: movie.length,
        genre_id: movie.genre ? movie.genre.id : null
      });
    }
  }, [movie]);

  return (
    <>
      <Modal show={show} onHide={handleCancel} >
        <Modal.Header closeButton>
          <Modal.Title>{movie? "Editar Pelicula": "Nueva Pelicula"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 col-12">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título de la pelicula"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title && (
                <small className="mr-2 text-danger">
                  {formik.errors.title}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                onChange={formik.handleChange}
                value={formik.values.rating}
                min={0}
                max={10}
              />
              {formik.errors.rating && (
                <small className="mr-2 text-danger">
                  {formik.errors.rating}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6">
              <Form.Label>Premios</Form.Label>
              <Form.Control
                type="number"
                name="awards"
                onChange={formik.handleChange}
                value={formik.values.awards}
                min={0}
              />
              {formik.errors.awards && (
                <small className="mr-2 text-danger">
                  {formik.errors.awards}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6">
              <Form.Label>Duración</Form.Label>
              <Form.Control
                type="number"
                name="length"
                onChange={formik.handleChange}
                value={formik.values.length}
                min={1}
              />
              {formik.errors.length && (
                <small className="mr-2 text-danger">
                  {formik.errors.length}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-6">
              <Form.Label>Fecha de estreno</Form.Label>
              <Form.Control
                type="date"
                name="release_date"
                onChange={formik.handleChange}
                value={formik.values.release_date}
              />
              {formik.errors.release_date && (
                <small className="mr-2 text-danger">
                  {formik.errors.release_date}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 col-12">
              <Form.Label>Genero</Form.Label>
              <Form.Select
                className="form-control"
                name="genre_id"
                onChange={formik.handleChange}
                value={formik.values.genre_id}
              >
                <option hidden>Seleccionar</option>
                {genres.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Select>
              {formik.errors.genre_id && (
                <small className="mr-2 text-danger">
                  {formik.errors.genre_id}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3 col-12">
              <div className="d-flex">
                <Button onClick={handleCancel} variant="outline-dark">
                  Cancelar
                </Button>
                <Button  type="submit" className="mx-3" variant="primary">
                  Guardar
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

FormModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  handleAddMovie: PropTypes.func,
  movie: PropTypes.object,
  setMovie: PropTypes.func,
  handleUpdateMovie: PropTypes.func
};
