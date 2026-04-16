import { useEffect, useState } from "react";

export default function UserFormModal({
  onClose,
  onAddUser,
  editingUser,
  onUpdateUser,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    company: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        city: editingUser.address.city,
        company: editingUser.company.name,
      });
    }
  }, [editingUser]);

  function handleOnChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.city.trim() === "" ||
      formData.company.trim() === ""
    ) {
      alert("Enter all details properly");
      return;
    }

    if (editingUser) {
      onUpdateUser({
        id: editingUser.id,
        name: formData.name,
        email: formData.email,
        address: {
          city: formData.city,
        },
        company: {
          name: formData.company,
        },
      });
    } else {
      onAddUser({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        address: {
          city: formData.city,
        },
        company: {
          name: formData.company,
        },
      });
    }
    setFormData({
      name: "",
      email: "",
      city: "",
      company: "",
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {editingUser ? "Edit User" : "Add User"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleOnChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-xl font-medium transition-all shadow-sm"
            >
              {editingUser ? "Update User" : "Add User"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 py-2.5 rounded-xl font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
