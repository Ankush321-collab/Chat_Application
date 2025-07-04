import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const GetAllUser = () => {
  const [alluser, setalluser] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getuser = async () => {
      setloading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/alluser", {
          withCredentials: true
        });
        setalluser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        console.log("Error in getting all user:" + error);
      } finally {
        setloading(false);
      }
    };
    getuser();
  }, [navigate]);
  return [alluser, loading];
};

export default GetAllUser