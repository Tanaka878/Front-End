import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://distinguished-happiness-production.up.railway.app/customer/getProfile/${props.Email}`); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  if (!user) {
    return <div style={styles.container}>No user data available</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>User Details</h2>
        <div style={styles.detail}>
          <strong>Name:</strong> {user.name}
        </div>
        <div style={styles.detail}>
          <strong>Surname:</strong> {user.surname}
        </div>
        <div style={styles.detail}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={styles.detail}>
          <strong>Password:</strong> {user.password}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f0f0f0",
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  detail: {
    margin: "10px 0",
    color: "#555",
  },
};

export default Profile;
