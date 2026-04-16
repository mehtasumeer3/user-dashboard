export default function SearchBar({ searchTerm, onChange }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Users</h2>
        <p className="text-sm text-slate-400 mt-1">
          Search and manage user records
        </p>
      </div>

      <div className="relative w-full lg:w-96">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>

        <input
          value={searchTerm}
          onChange={onChange}
          placeholder="Search by name..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-[#22262b] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>
    </div>
  );
}
