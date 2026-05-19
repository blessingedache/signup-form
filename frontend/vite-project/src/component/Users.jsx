import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/register");
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.alldata)) {
          setUsers(data.alldata); // This is your correct key
        } else if (data && Array.isArray(data.users)) { 
          setUsers(data.users);
        } else if (data && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.warn("Unexpected API response shape:", data);
          setUsers([]);
        }

      } catch (error) {
        console.log(error.message);
        setUsers([]);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="userContainer">
      {users.length > 0 ? (
        users.map((info) => (
          <div key={info._id}>  {/* ✅ Using _id since it's MongoDB */}
            <p>{info.firstName}</p>
            <p>{info.lastName}</p>
            <p>{info.email}</p>
            <p>{info.username}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
