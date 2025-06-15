export const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "El titulos es requerido";
  }

  if (!values.awards) {
    errors.awards = "Debe ingresar los Premios";
  }
  if (!values.rating) {
    errors.rating = "Debe ingresar el Rating";
  } else if (values.rating > 10 || values.rating < 0) {
    errors.rating = 'Rating del 0 al 10';
  }
  if (!values.length) {
    errors.length = "Debe ingresar duración de la pelicula";
  }
  if (!values.release_date) {
    errors.release_date = "Debe ingresar fecha de estreno";
  }
  if (!values.genre_id) {
    errors.genre_id = "Debe ingresar fecha de estreno";
  }
  return errors;
};
