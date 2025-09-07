import { useDispatch, useSelector } from "react-redux";
import {
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from "../features/users/userApi";
import {
    setSearch,
    setPage,
    deleteLocalUser,
    updateLocalUser,
    addLocalUser,
} from "../features/users/userSlice";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";

export default function UserList() {
    const dispatch = useDispatch();
    const { search, currentPage, itemsPerPage, localUsers } = useSelector(
        (s) => s.users
    );

    const { data: apiUsers = [], isLoading, isError } = useGetUsersQuery();
    const [addUserApi] = useAddUserMutation();
    const [deleteUserApi] = useDeleteUserMutation();
    const [updateUserApi] = useUpdateUserMutation();

    // Form state (used for both Add & Edit)
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [editUserId, setEditUserId] = useState(null);

    const debouncedSearch = useDebounce(search, 400);
    const combinedUsers = [...apiUsers, ...localUsers];

    const filtered = combinedUsers.filter(
        (u) =>
            u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching users.</p>;


    const handleAdd = () => {
        if (!formData.name || !formData.email) return;
        const userObj = { ...formData, id: Date.now() };
        dispatch(addLocalUser(userObj));
        addUserApi(userObj);
        setFormData({ name: "", email: "" });
    };


    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setFormData({ name: user.name, email: user.email });
    };

    const handleUpdate = () => {
        const updatedUser = { id: editUserId, ...formData };
        dispatch(updateLocalUser(updatedUser));
        updateUserApi(updatedUser);
        setEditUserId(null);
        setFormData({ name: "", email: "" });
    };

    const handleCancel = () => {
        setEditUserId(null);
        setFormData({ name: "", email: "" });
    };

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (

        <div className="p-4 max-w-7xl mx-auto">

            <div className="gap-2 mb-4 p-5 bg-fuchsia-100 rounded-lg shadow w-full">
                <h2 className="font-bold mb-4 text-lg">
                    {editUserId ? "Edit User" : "Add User"}
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="border px-2 py-2 rounded flex-1 w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="border px-2 py-2 rounded flex-1 w-full"
                    />
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                    {editUserId ? (
                        <>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                                onClick={handleUpdate}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded w-full sm:w-auto"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                            onClick={handleAdd}
                        >
                            Add User
                        </button>
                    )}
                </div>
            </div>

            {/*  Search */}
            <input
                type="text"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                placeholder="Search by name or email..."
                className="border px-3 py-2 rounded mb-4 w-full"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full border rounded text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((u) => (
                            <tr key={u.id}>
                                <td className="p-2 border text-center">{u.id}</td>
                                <td className="p-2 border">{u.name}</td>
                                <td className="p-2 border">{u.email}</td>
                                <td className="p-2 border space-x-2 flex flex-col sm:flex-row gap-2 justify-center">
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded w-full sm:w-auto"
                                        onClick={() => handleEditClick(u)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                                        onClick={() => {
                                            dispatch(deleteLocalUser(u.id));
                                            deleteUserApi(u.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination  */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">

                <div className="flex gap-2">
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-2 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => dispatch(setPage(page))}
                        >
                            {page}
                        </button>
                    ))}
                </div>

            </div>
        </div>

    );
}
