export default function Pagination({
  currentPage,
  totalPageCount,
  handleNext,
  handlePrevious,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Previous
      </button>

      <span className="text-sm sm:text-base font-medium text-white">
        Page {currentPage} of {totalPageCount}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPageCount}
        className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        Next
      </button>
    </div>
  );
}
