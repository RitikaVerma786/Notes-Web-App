import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateUserInfoReq, changePasswordReq } from "../../apis/userApi";
import styles from "./Settings.module.css";
import { toast } from "react-toastify";

const Settings = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  
  // Local profile details form state
  const [formData, setFormData] = useState({
    firstName: loggedInUser?.firstName || "",
    lastName: loggedInUser?.lastName || "",
    email: loggedInUser?.email || "",
  });

  // Local password form state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Submit profile details to the backend
  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast.error("Please fill in all account fields");
      return;
    }
    
    try {
      const res = await updateUserInfoReq(formData);
      if (res.status === 200) {
        setLoggedInUser(res.data.userInfo);
        toast.success("Profile details updated successfully on the backend!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Submit password change to the backend
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwords;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    try {
      const res = await changePasswordReq({ currentPassword, newPassword });
      if (res.status === 200) {
        toast.success("Password updated successfully!");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      {/* Account Settings Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Account Information</h2>
        <form onSubmit={handleSaveAccount} className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={styles.saveBtn}>
            Save Account Details
          </button>
        </form>
      </div>

      {/* Password Management Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Change Password</h2>
        <form onSubmit={handleSavePassword} className={styles.formGrid}>
          <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password..."
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password..."
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password..."
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className={styles.saveBtn}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
