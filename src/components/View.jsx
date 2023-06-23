import { useStateContext } from "../context/ContextProvider";

const View = () => {
  const { selectedUser } = useStateContext();
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card text-center d-flex flex-row m-5 shadow">
          <div>
            {" "}
            <img
              src={selectedUser.profile}
              width={300}
              height={300}
              className=" rounded-circle p-3"
              alt="profile"
            />
          </div>
          <div className="p-3">
            <div className="card-body">
              <h5 className="card-title">
                {selectedUser.firstName + " " + selectedUser.lastName}
              </h5>
              {/* <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p> */}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{selectedUser.email}</li>
              <li className="list-group-item">{selectedUser.mobileNumber}</li>
              <li className="list-group-item">{selectedUser.location}</li>
            </ul>
            <div className="card-body">
              {/* <a href="/edit    " className="card-link">
                Edit details
              </a> */}
              <a href="/" className="card-link">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
