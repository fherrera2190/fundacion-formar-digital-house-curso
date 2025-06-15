import { Card, CardBody, Table } from "react-bootstrap";
import { TableItem } from "./TableItem";

export const TableMovies = () => {
  const movies = [
    {
      id: crypto.randomUUID(),
      title: "Rambo",
      length: 120,
      awards: 10,
      rating: 10,
      genres: ["Acción", "Belico"]
    },
    {
      id: crypto.randomUUID(),
      title: "Rambo",
      length: 120,
      awards: 10,
      rating: 10,
      genres: ["Acción", "Belico"]
    },
    {
      id: crypto.randomUUID(),
      title: "Rambo",
      length: 120,
      awards: 10,
      rating: 10,
      genres: ["Acción", "Belico"]
    }
  ];

  return (
    <Card className="shadow mb-5">
      <CardBody>
        <Table striped borderless>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Duración</th>
              <th>Rating</th>
              <th>Géneros</th>
              <th>Premios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(({ id, title, length, awards, rating, genres }) =>
              <TableItem
                key={id}
                title={title}
                length={length}
                awards={awards}
                genres={genres}
                rating={rating}
              />
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
