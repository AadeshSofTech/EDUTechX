import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    role: "Senior Administrator",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Education Avenue, Academic District",
    joinDate: "September 2020",
    education: "Ph.D. in Educational Leadership",
    department: "School Administration",
    expertise: ["Educational Leadership", "Curriculum Development", "Staff Management", 
                "Student Affairs", "Policy Implementation", "Strategic Planning"],
    bio: "Dedicated educational administrator with over 10 years of experience in academic leadership and institutional development. Committed to fostering an innovative and inclusive learning environment.",
    socialLinks: {
      linkedin: "linkedin.com/in/sarahjohnson",
      github: "github.com/sarahedu",
      twitter: "@sarah_edu"
    },
    achievements: [
      "Led school-wide digital transformation initiative",
      "Increased student satisfaction rate by 35%",
      "Implemented innovative STEM program",
      "Published in Educational Leadership Journal"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  });

  const updateProfile = (newData) => {
    setProfileData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const updateProfilePicture = (avatarUrl) => {
    setProfileData(prev => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile, updateProfilePicture }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext; 