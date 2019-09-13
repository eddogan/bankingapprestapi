import React, { useState, useEffect } from "react";
import axios from "axios";
// Custom imports
import Loading from "../Loading";

export default function Welcome() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserName = () => {
    if (sessionStorage.firstName && sessionStorage.lastName) {
      setLoading(false);
      return;
    } else {
      const api = `${process.env.REACT_APP_API_URL}/api/Clients/${sessionStorage.AccountId}`;
      const axiosConfig = {
        method: "get",
        url: api,
        withCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.access_token}`
        }
      };
      axios(axiosConfig)
        .then(response => {
          if (response.status === 200) {
            sessionStorage.setItem("firstName", response.data.firstName);
            sessionStorage.setItem("lastName", response.data.lastName);
            setFirstName(sessionStorage.firstName);
            setLastName(sessionStorage.lastName);
            setLoading(false);
          } else {
            throw new Error(`Error Code ${response.status}`);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  if (loading) {
    return <Loading isLoading={loading} />;
  } else {
    return (
      <div>
        Welcome Back <span>{sessionStorage.firstName || firstName} </span>
        <span>{sessionStorage.lastName || lastName}</span>
      </div>
    );
  }
}
