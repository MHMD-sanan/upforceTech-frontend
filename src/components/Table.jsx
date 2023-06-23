import { useEffect, useState } from "react";
import { ReactComponent as More } from "../assets/more-vertical.svg";
import { useStateContext } from "../context/ContextProvider";
import { ReactComponent as Eyes } from "../assets/eye.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Trash } from "../assets/trash.svg";

import config from "../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Table = () => {
  const { users, setUsers, setSelectedUser } = useStateContext();

  const [action, setAction] = useState(false);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000", config);
      if (data.users.length !== 0) {
        setUsers(data.users);
      }
    } catch (error) {
      setUsers("");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  //edit user
  const handleEdit = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/${id}`,
        config
      );
      setSelectedUser(data.user);
      navigate("/edit");
    } catch (error) {
      setSelectedUser("")
    }
  };

  //delete user
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/user/${id}`,
        config
      );
      // generateError("User Deleted successfully");
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/${id}`,
        config
      );
      setSelectedUser(data.user);
      navigate("/view");
    } catch (error) {
      setSelectedUser("");
    }
  };

  return (
    <div className="container mt-5 border shadow p-0">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">FullName</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {users ? (
            users.map((user, index) => (
              <tbody key={user._id}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.status}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Active
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            InActive
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <img
                      src={user.profile}
                      height={40}
                      width={40}
                      className="rounded-circle"
                      alt="profile"
                    />
                  </td>
                  <td>
                    <div className="svg-container">
                      <div className="">
                        <More />
                      </div>
                      <div className="button-group border rounded flex flex-column">
                        <div className="p-2 me-5">
                          <button
                            className="border-0 bg-white"
                            onClick={() => handleView(user._id)}
                          >
                            <Eyes />
                            View
                          </button>
                        </div>
                        <div className="p-2 me-5">
                          <button
                            className="border-0 bg-white"
                            onClick={() => handleEdit(user._id)}
                          >
                            <Edit />
                            Edit
                          </button>
                        </div>
                        <div className="p-2 me-5">
                          <button
                            className="border-0 bg-white"
                            onClick={() => handleDelete(user._id)}
                          >
                            <Trash />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <p className="m-3">No users found</p>
          )}
        </table>
      </div>

      <div>
        {" "}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end pe-5">
            <li className="page-item">
              <a className="page-link" href="#d" aria-label="Previous">
                <span aria-hidden="true">&lsaquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#d">
                1
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#d">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="d#" aria-label="Next">
                <span aria-hidden="true">&rsaquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
