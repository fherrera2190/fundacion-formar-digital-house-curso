import PropTypes from "prop-types";

export const TableItem = ({
  movie: { id, title, length, awards, rating, genre },
  handleEditMovie,
  handleDeleteMovie
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{length && length + " min"}</td>
      <td>{rating}</td>
      <td>{genre?.name}</td>
      <td>{awards}</td>
      <td>
        <div className="d-flex">
          <button
            className="btn btn-outline-success mr-3"
            onClick={() => handleEditMovie(id)}
          >
            <i className="fas fa-pencil-alt "></i>
          </button>
          <button
            onClick={() => handleDeleteMovie(id)}
            className="btn btn-outline-danger"
          >
            <i className="fas fa-trash-alt "></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

TableItem.propTypes = {
  movie: PropTypes.object,
  handleEditMovie: PropTypes.func,
  handleDeleteMovie: PropTypes.func
};

TableItem.defaultProps = {
  genre: "Sin género"
};
