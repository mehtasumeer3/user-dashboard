export default function UserTable({
  users,
  onSort,
  sortConfig,
  onEdit,
  onDelete,
}) {
  const isActiveSort = (key) => sortConfig.key === key && sortConfig.direction;

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1f2328] shadow-xl">
      <table className="min-w-full">
        <thead className="bg-[#252a30]">
          <tr>
            <th
              onClick={() => onSort("name")}
              className={`px-4 py-4 text-left text-sm font-semibold cursor-pointer select-none transition ${
                isActiveSort("name")
                  ? "bg-[#323843] text-white"
                  : "text-slate-300"
              }`}
            >
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>

            <th
              onClick={() => onSort("email")}
              className={`px-4 py-4 text-left text-sm font-semibold cursor-pointer select-none transition ${
                isActiveSort("email")
                  ? "bg-[#323843] text-white"
                  : "text-slate-300"
              }`}
            >
              Email{" "}
              {sortConfig.key === "email"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">
              City
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">
              Company
            </th>

            <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`border-t border-white/5 hover:bg-[#262b31] transition-all duration-200 ${
                index % 2 === 0 ? "bg-[#1f2328]" : "bg-[#22262b]"
              }`}
            >
              <td className="px-4 py-4 text-sm text-white whitespace-nowrap">
                {user.name}
              </td>

              <td className="px-4 py-4 text-sm text-white whitespace-nowrap">
                {user.email}
              </td>

              <td className="px-4 py-4 text-sm text-white whitespace-nowrap">
                {user.address.city}
              </td>

              <td className="px-4 py-4 text-sm text-white whitespace-nowrap">
                {user.company.name}
              </td>

              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-white/10 bg-[#2a2f36] text-white hover:bg-[#343a43] transition-all duration-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border border-white/10 bg-white text-black hover:bg-slate-200 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
