import React from "react";
import './UserProfile.css';
function UserProfileIcon({ username }) {
  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return initials;
  };

  return (
    <div className="user-profile-icon">
      <span>{getInitials(username)}</span>
    </div>
  );
}

export default UserProfileIcon;
