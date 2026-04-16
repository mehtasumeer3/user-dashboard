import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import UserTable from "./components/UserTable.jsx";
import UserFormModal from "./components/UserFormModal.jsx";
import Pagination from "./components/Pagination.jsx";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [editingUser, setEdtingUser] = useState(null);

  // fetching data
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();

        setUsers(data);
      } catch (err) {
        setError("something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  function handleOnChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  function handleSort(column) {
    if (sortConfig.key !== column)
      setSortConfig({
        key: column,
        direction: "asc",
      });
    else if (sortConfig.direction === "asc") {
      setSortConfig({
        key: column,
        direction: "desc",
      });
    } else {
      setSortConfig({
        key: "",
        direction: "",
      });
    }
    setCurrentPage(1); // this is done bcz if the searched person is in page 1 and currentPage is 3 then it will go to page1 ,or wherever
  }

  function handleNext() {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleAddUser(newUser) {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setIsFormOpened(false);
  }

  function handleEditingUser(user) {
    setEdtingUser(user);
    setIsFormOpened(true);
  }

  function handleUpdateUser(updatedUser) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );

    setEdtingUser(null);
    setIsFormOpened(false);
  }

  function handleDeleteUSer(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }
  //Search logic

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // sort Logic
  let sortedUsers = [...filteredUsers];
  if (sortConfig.key) {
    sortedUsers.sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (sortConfig.key === "name") {
        aValue = a.name;
        bValue = b.name;
      } else if (sortConfig.key === "email") {
        aValue = a.email;
        bValue = b.email;
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0; // if both val are eqaul
    });
  }

  // pagination logic
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize; // as slice(start , end) , end is excluded.
  const totalPageCount = Math.ceil(sortedUsers.length / pageSize);

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  if (loading) return <h1>Loading....</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="min-h-screen bg-[#111315] px-3 sm:px-6 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto bg-[#1a1d21] rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Users Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage users with search, sort, pagination and CRUD actions.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpened(true)}
            className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm"
          >
            + Add User
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#22262b] border border-white/10 rounded-2xl p-5 shadow-lg">
            <p className="text-white">Total Users</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {users.length}
            </h3>
          </div>

          <div className="bg-[#22262b] border border-white/10 rounded-2xl p-5 shadow-lg">
            <p className="text-sm text-white">Showing</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {paginatedUsers.length}
            </h3>
          </div>

          <div className="bg-[#22262b] border border-white/10 rounded-2xl p-5 shadow-lg">
            <p className="text-sm text-white">Current Page</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              {currentPage} / {totalPageCount}
            </h3>
          </div>
        </div>

        {/* Search */}
        <SearchBar searchTerm={searchTerm} onChange={handleOnChange} />

        {/* Table */}
        <div className="mt-6">
          <UserTable
            users={paginatedUsers}
            onSort={handleSort}
            sortConfig={sortConfig}
            onEdit={handleEditingUser}
            onDelete={handleDeleteUSer}
          />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />

        {/* Modal */}
        {isFormOpened && (
          <UserFormModal
            onClose={() => setIsFormOpened(false)}
            onAddUser={handleAddUser}
            editingUser={editingUser}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
}
