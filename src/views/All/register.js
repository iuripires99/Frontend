import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import logo from "../../images/logo-navbar.svg";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userNif, setUserNif] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState(2); // Default to buyer
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://backend-ofwz.onrender.com/user/create", {
        idAccountType: accountType,
        idDepartment: accountType === 3 ? 1 : null,
        idCart: null,
        userName,
        userPassword,
        userEmail,
        userNif: parseInt(userNif),
        idBuyer: null,
      });

      console.log("Registration successful:", response.data);
      // Show success message
      setSuccessMessage("Account created successfully!");
      // Clear form fields
      setUserName("");
      setUserNif("");
      setUserEmail("");
      setUserPassword("");
      setConfirmPassword("");
      // Redirect to another page
      window.location.href = "/"; // Redirect to the home page or any desired route
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.error === 'Email already in use') {
          setError('Email is already registered. Please use a different email.');
        } else if (data.error === 'NIF already in use') {
          setError('NIF is already registered. Please use a different NIF.');
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <section className="vh-100 Gradient">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="bg-light shadow card-registration" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="userName"
                          className="form-control form-control-lg"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userName">
                          Username
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="userNif"
                          maxLength="9"
                          minLength="9"
                          pattern="^\d{9}$"
                          value={userNif}
                          onChange={(e) => setUserNif(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userNif">
                          NIF
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="userEmail"
                          className="form-control form-control-lg"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userEmail">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="userPassword"
                          className="form-control form-control-lg"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="userPassword">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control form-control-lg"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <h6 className="mb-2 pb-1">Account Type: </h6>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="accountType"
                          id="buyer"
                          value="1"
                          checked={accountType === 1}
                          onChange={(e) => setAccountType(parseInt(e.target.value))}
                        />
                        <label className="form-check-label" htmlFor="buyer">Admin</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="accountType"
                          id="buyer"
                          value="2"
                          checked={accountType === 2}
                          onChange={(e) => setAccountType(parseInt(e.target.value))}
                        />
                        <label className="form-check-label" htmlFor="buyer">Buyer</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="accountType"
                          id="manager"
                          value="3"
                          checked={accountType === 3}
                          onChange={(e) => setAccountType(parseInt(e.target.value))}
                        />
                        <label className="form-check-label" htmlFor="manager">Manager</label>
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-danger">{error}</p>}

                  <div className="mt-4 pt-2 col-12">
                    <input
                      className="btn btn-info text-white btn-lg col-12 hover"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
