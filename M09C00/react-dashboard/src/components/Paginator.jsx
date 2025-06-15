import PropType from "prop-types";

export const Paginator = ({ pagination, handlePagination }) => {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${!pagination.hasPrevPages && "disabled"} `}>
          <a
            className="page-link"
            href="#"
            onClick={() =>
              handlePagination(
                event,
                pagination.hasPrevPages
                  ? pagination.pages[+pagination.currentPage - 2].url
                  : null
              )}
          >
            Prev
          </a>
        </li>

        {pagination.pages.map(paginate =>
          <li
            key={paginate.number}
            className={`page-item ${paginate.number ===
              pagination.currentPage && "active"}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePagination(event, paginate.url)}
            >
              {paginate.number}
            </a>
          </li>
        )}

        <li className={`page-item ${!pagination.hasNextPages && "disabled"} `}>
          <a
            className="page-link"
            href="#"
            onClick={() =>
              handlePagination(
                event,
                pagination.hasNextPages
                  ? pagination.pages[+pagination.currentPage].url
                  : null
              )}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  pagination: PropType.object,
  handlePagination: PropType.func
};
