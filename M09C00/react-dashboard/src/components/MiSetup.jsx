import PropTypes from "prop-types";

// Dentro del archivo Setup.js
function MiSetup(props) {
  return (
    <div>
      <ul>
        {props.listado.map((elemento, i) => <li key={elemento + i}>{elemento}</li>)}
      </ul>
    </div>
  );
}

MiSetup.propTypes = {
  listado: PropTypes.array
};

export default MiSetup;
