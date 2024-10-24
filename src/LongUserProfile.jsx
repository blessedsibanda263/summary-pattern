import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";
import { UserDataForm } from "./UserDataForm";
import { UserDetails } from "./UserDetails";
import { UserPreferences } from "./UserPreferences";

export function LongUserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    theme: "light",
    notifications: false,
  });

  // fetching user data
  const api = useAPI();
  useEffect(() => {
    api
      .fetchUser(userId)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [api, userId]);

  // initializing user preference
  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  // updating user preferences
  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
  }, [userPreferences]);

  // toggle edit mode
  const toggleEditMode = () => setEditMode(!editMode);

  // update preferences
  const updatePreferences = (newPreferences) => {
    console.log("old -->", userPreferences);
    console.log("new -->", newPreferences);
    setUserPreferences(newPreferences);
  };

  if (!userData) return <div>Loading...</div>;
  return (
    <div>
      <h1>User Profile</h1>
      {editMode ? (
        <UserDataForm userData={userData} onChange={setUserData} />
      ) : (
        <UserDetails userData={userData} />
      )}
      <button onClick={toggleEditMode}>
        {editMode ? "Save Changes" : "Edit Profile"}
      </button>
      <UserPreferences
        preferences={userPreferences}
        onPreferencesChange={updatePreferences}
      />
    </div>
  );
}
