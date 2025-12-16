

export const Pagination = ({ page, setPage, totalPages }) => {
    return (
        <div className="flex justify-center gap-2 mt-6">
            <button
                className="btn btn-primary"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Prev
            </button>

            <span>{page} / {totalPages}</span>

            <button
                className="btn btn-primary"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

        </div>
    );
};
