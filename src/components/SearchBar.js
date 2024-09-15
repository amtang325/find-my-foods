import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import axios from 'axios';
import React, { useRef, useEffect, useState } from "react";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getUsers', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('users', response.data.users);
                setUsers(response.data.users)
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
        fetchUsers();
    }, []);

  const fetchData = (value) => {
    console.log("fetching")
      const results = users.filter((user) => {
          return (
              value &&
              user &&
              (user.first_name || user.last_name) &&
              (user.first_name.toLowerCase().includes(value.toLowerCase()) || user.last_name.toLowerCase().includes(value.toLowerCase()) || (user.first_name + " " + user.last_name).toLowerCase().includes(value.toLowerCase()))
          );
      });
      setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};