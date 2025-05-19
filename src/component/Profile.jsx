import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      const updatedUser = {
        ...user,
        profilePicture: base64Image,
      };

      setUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        No user profile found in localStorage.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white p-4 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Account Settings</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 mt-8 flex items-center">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 overflow-hidden">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-20 h-20 object-cover"
              />
            ) : (
              <FaCamera className="text-gray-600 text-2xl" />
            )}
          </div>

          <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer flex items-center justify-center">
            <FaCamera className="text-white text-sm" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-grow pl-4">
          <h2 className="text-lg font-semibold text-gray-800">{user.fullName}</h2>
          <p className="text-gray-500 mt-1">{user.email}</p>
          <p className="text-gray-600 mt-2 text-sm">
            Welcome! You can upload your profile picture here.
          </p>
        </div>
      </div>
    </div>
  );
}
