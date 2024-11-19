import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Fetch data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://distinguished-happiness-production.up.railway.app/customer/getProfile/${props.Email}`
        );
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
  }, [props.Email]);

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
        <div style={styles.profilePicture}>
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt={`${user.name}'s profile`}
            style={styles.image}
          />
        </div>
        <h2 style={styles.heading}>
          {user.name} {user.surname}
        </h2>
        <div style={styles.detail}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={styles.detail}>
          <strong>Password:</strong>{" "}
          <span>
            {showPassword ? user.password : "●●●●●●●●"}
          </span>
          <button
            style={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
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
    backgroundColor: "#eaeaea",
    padding: "20px",
    boxSizing: "border-box", 
    marginLeft:"auto",
    marginRight:"auto"// Ensure padding doesn't affect layout
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
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 123, 255, 0.5)",
    maxWidth: "400px",
    width: "100%", // Take full width of the screen
    minHeight: "90vh", // Make the card fill most of the screen on mobile
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  profilePicture: {
    marginBottom: "20px",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    objectFit: "cover",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  detail: {
    margin: "10px 0",
    color: "#555",
    fontSize: "1rem",
    textAlign: "center",
  },
  toggleButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    fontSize: "0.8rem",
    color: "#007bff",
    backgroundColor: "transparent",
    border: "1px solid #007bff",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

// Add CSS keyframes for the loader animation
const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(globalStyles);

export default Profile;
