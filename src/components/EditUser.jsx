import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useStateContext } from "../context/ContextProvider";
import config from "../utils/config";
import axios from "axios";

const EditUser = () => {
  const { selectedUser } = useStateContext();
  const navigate = useNavigate();
  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: selectedUser.firstName,
    lastName: selectedUser.lastName,
    email: selectedUser.email,
    mobileNumber: selectedUser.mobileNumber,
    gender: selectedUser.gender,
    status: selectedUser.status,
    location: selectedUser.location,
    profile: selectedUser.profile,
  });

  const [focus, setFocus] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobileNumber: false,
    status: false,
    location: false,
    country: false,
    profile: false,
  });

  const handleFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  //handle profile
  const handleProfile = async (e) => {
    const profile = e.target.files[0];
    setLoading(true);
    const base64 = await convertBase64(profile);
    setValues({ ...values, profile: base64 });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `http://localhost:4000/user/${selectedUser._id}`,
        values,
        config
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      generateError(error.response.data.error);
      navigate("/")
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Register Your Details</h1>
      <form className="row g-3 border mt-3 shadow p-2" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter FirstName"
            name="firstName"
            defaultValue={selectedUser.firstName}
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            pattern="^[A-Za-z]{1,50}$"
            required
            onBlur={handleFocus}
            focused={focus.firstName.toString()}
          />
          <p className="error">
            Required, alphabetic characters only, maximum length of 50
            characters
          </p>
        </div>

        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            name="lastName"
            defaultValue={selectedUser.lastName}
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            pattern="^[A-Za-z]{1,50}$"
            required
            onBlur={handleFocus}
            focused={focus.lastName.toString()}
          />
          <p className="error">
            Required, alphabetic characters only, maximum length of 50
            characters
          </p>
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            name="email"
            defaultValue={selectedUser.email}
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            required
            onBlur={handleFocus}
            focused={focus.email.toString()}
          />
          <p className="error">Required, valid email format</p>
        </div>
        <div className="col-md-6">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Mobile"
            name="mobileNumber"
            defaultValue={selectedUser.mobileNumber}
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            pattern="^[789]\d{9}$"
            required
            onBlur={handleFocus}
            focused={focus.mobileNumber.toString()}
          />
          <p className="error">
            Required, valid phone number format with 10 digits (e.g., 9098787898
            )
          </p>
        </div>
        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">
            Select your gender
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={values.gender === "Male"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              required
            />
            <label className="form-check-label" htmlFor="gender">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={values.gender === "Female"}
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              required
            />
            <label className="form-check-label" htmlFor="gridRadios2">
              Female
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">
            Select Your Status
          </label>
          <select
            className="form-select"
            value={values.status}
            name="status"
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          >
            <option value="">-- Select --</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="profilePic" className="form-label">
            Select Your Profile
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/jpeg, image/png"
            onChange={handleProfile}
            name="profile"
            pattern="^.+\.(jpg|jpeg|png|gif|bmp)$"
            onBlur={handleFocus}
            focused={focus.profile.toString()}
          />
          <p className="error">
            Please select a valid image file (JPEG or PNG).
          </p>
        </div>

        <div className="col-md-6">
          <label htmlFor="location" className="form-label">
            Enter Your Location
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Location"
            name="location"
            defaultValue={selectedUser.location}
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
            pattern="^[A-Za-z0-9]{1,100}$"
            required
            onBlur={handleFocus}
            focused={focus.location.toString()}
          />
          <p className="error">Required, maximum length of 100 characters</p>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary col-12">
            {loading ? (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "submit"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditUser;
