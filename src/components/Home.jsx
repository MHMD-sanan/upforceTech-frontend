import { Link } from "react-router-dom";
import Table from "./Table";
import config from "../utils/config.js";
import { useStateContext } from "../context/ContextProvider";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { useState } from "react";
import axios from "axios";

function Home() {
  const { setUsers } = useStateContext();
  const [name, setName] = useState("");

  // search user
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:4000/search/${name}`,
        config
      );
      setUsers(data.users);
    } catch (error) {
      setUsers("");
      console.log(error.message);
    }
  };

  //export to csv
  const handleExport = async () => {
    try {
      const res = await axios.get("http://localhost:4000/export", {
        responseType: "blob",
      });
      if (res) {
        const csvData = new Blob([res.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(csvData);
        const link = document.createElement("a");
        link.href = url;
        link.download = "users.csv";
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Upforce Tech
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <form
                className="d-flex mt-"
                role="search"
                onSubmit={handleSearch}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </form>
              <ul className="navbar-nav justify-content-end flex-grow-1">
                <li className="nav-item pe-2">
                  <Link to={"/register"}>
                    <button
                      className="btn btn-primary flex flex-row"
                      aria-current="page"
                    >
                      <Plus className="text-xl" />
                      Add User
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    aria-current="page"
                    onClick={handleExport}
                  >
                    Export To Csv
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Table></Table>
    </>
  );
}

export default Home;
