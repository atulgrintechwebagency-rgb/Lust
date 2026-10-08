import "./ModelPagination.css";

export const MODEL_PAGE_SIZE = 24;

export default function ModelPagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  const firstVisiblePage = Math.max(1, currentPage - 2);
  const lastVisiblePage = Math.min(totalPages, currentPage + 2);
  const visiblePages = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index
  );
  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav className="model-pagination" aria-label="Model pages">
      <p className="model-pagination-count" aria-live="polite">
        Showing {firstItem}–{lastItem} of {totalItems} models
      </p>
      <div className="model-pagination-controls">
        <button
          type="button"
          className="model-pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        {firstVisiblePage > 1 && (
          <>
            <button
              type="button"
              className="model-pagination-button"
              onClick={() => onPageChange(1)}
              aria-label="Page 1"
            >
              1
            </button>
            {firstVisiblePage > 2 && (
              <span className="model-pagination-ellipsis" aria-hidden="true">
                …
              </span>
            )}
          </>
        )}
        {visiblePages.map((page) => (
          <button
            type="button"
            key={page}
            className={`model-pagination-button${
              page === currentPage ? " active" : ""
            }`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        {lastVisiblePage < totalPages && (
          <>
            {lastVisiblePage < totalPages - 1 && (
              <span className="model-pagination-ellipsis" aria-hidden="true">
                …
              </span>
            )}
            <button
              type="button"
              className="model-pagination-button"
              onClick={() => onPageChange(totalPages)}
              aria-label={`Page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          type="button"
          className="model-pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
