import { useState } from "react";
import { Form } from "react-bootstrap";
import PropType from "prop-types";
export const FormSearch = ({ getMovies }) => {
  const [valuesForm, setValuesForm] = useState({});
  const handleInputChange = ({ target }) => {
    setValuesForm({ ...valuesForm, [target.name]: target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    getMovies(`/api/v1/movies?keyword=${valuesForm.keyword}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          name="keyword"
          placeholder="Search"
          aria-label="Search"
          onChange={handleInputChange}
        />
        <button className=" mx-2 btn btn-primary" type="submit">
          Search
        </button>
      </Form>
    </div>
  );
};

FormSearch.propTypes = {
  getMovies: PropType.func
};
