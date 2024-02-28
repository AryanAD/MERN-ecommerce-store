import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-7" : "top-2 right-7"
        } border border-[#396246] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="#396246" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-[#396246] my-1"></div>
            <div className="w-6 h-0.5 bg-[#396246] my-1"></div>
            <div className="w-6 h-0.5 bg-[#396246] my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[white] p-2 rounded-md drop-shadow-lg fixed right-[63px] top-[34px]">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#396246",
                  background: isActive ? "whitesmoke" : "",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-[whitesmoke] rounded-sm"
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users-list"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#396246",
                  background: isActive ? "whitesmoke" : "",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-[whitesmoke] rounded-sm"
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categories-list"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#396246",
                  background: isActive ? "whitesmoke" : "",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-[whitesmoke] rounded-sm"
              >
                Manage Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/create-product"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#396246",
                  background: isActive ? "whitesmoke" : "",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-[whitesmoke] rounded-sm"
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products-list"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#396246",
                  background: isActive ? "whitesmoke" : "",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-[whitesmoke] rounded-sm"
              >
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders-list"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "#396246",
                  background: isActive ? "whitesmoke" : "",
                })}
                className="list-item py-2 px-3 mb-5 hover:bg-[whitesmoke] rounded-sm"
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
