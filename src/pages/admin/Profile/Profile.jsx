import React, { useState, useRef } from 'react';
import AdminSidebar from '../../../components/AdminSidebar/Adminsidebar';
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUserGraduate, 
         FaLinkedin, FaGithub, FaTwitter, FaPencilAlt, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import CameraModal from './CameraModal';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

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

  const [editedData, setEditedData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditedData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handlePhotoClick = () => {
    setShowPhotoOptions(true);
  };

  const handlePhotoOptionClose = () => {
    setShowPhotoOptions(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
    setShowPhotoOptions(false);
  };

  const handleCameraCapture = () => {
    setShowCamera(true);
    setShowPhotoOptions(false);
  };

  const handleCapturedPhoto = (photoData) => {
    setProfileData(prev => ({
      ...prev,
      avatar: photoData
    }));
    setShowCamera(false);
  };

  const handleDeletePhoto = () => {
    setProfileData(prev => ({
      ...prev,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
    }));
    setShowPhotoOptions(false);
  };

  return (
    <div className="profile-container">
      <AdminSidebar />
      
      <div className="profile-content">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="profile-actions">
            {!isEditing ? (
              <button className="edit-button" onClick={handleEdit}>
                <FaPencilAlt /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-button" onClick={handleSave}>
                  <FaSave /> Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-main-info">
            <div className="profile-avatar-section">
              <div className="avatar-container">
                <img src={profileData.avatar} alt="Profile" className="profile-avatar" />
                <button className="camera-button" onClick={handlePhotoClick}>
                  <FaCamera />
                </button>
                {showPhotoOptions && (
                  <div className="photo-options">
                    <button onClick={() => fileInputRef.current?.click()}>
                      Upload Photo
                    </button>
                    <button onClick={handleCameraCapture}>
                      Take Photo
                    </button>
                    <button className="delete-photo" onClick={handleDeletePhoto}>
                      <FaTrash /> Delete Photo
                    </button>
                    <button onClick={handlePhotoOptionClose}>
                      Cancel
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="edit-input name-input"
                  />
                  <input
                    type="text"
                    value={editedData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={editedData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="edit-input"
                  />
                </>
              ) : (
                <>
                  <h2 className="profile-name">{profileData.name}</h2>
                  <p className="profile-role">{profileData.role}</p>
                  <p className="profile-department">{profileData.department}</p>
                </>
              )}
            </div>

            <div className="social-links">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="edit-input"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    type="text"
                    value={editedData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    className="edit-input"
                    placeholder="GitHub URL"
                  />
                  <input
                    type="text"
                    value={editedData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="edit-input"
                    placeholder="Twitter Handle"
                  />
                </>
              ) : (
                <>
                  <a href={profileData.socialLinks.linkedin} className="social-link linkedin">
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a href={profileData.socialLinks.github} className="social-link github">
                    <FaGithub /> GitHub
                  </a>
                  <a href={profileData.socialLinks.twitter} className="social-link twitter">
                    <FaTwitter /> Twitter
                  </a>
                </>
              )}
            </div>

            <div className="contact-info">
              {isEditing ? (
                <>
                  <div className="info-item">
                    <FaEnvelope className="info-icon" />
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-item">
                    <FaPhone className="info-icon" />
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <input
                      type="text"
                      value={editedData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-item">
                    <FaCalendar className="info-icon" />
                    <input
                      type="text"
                      value={editedData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-item">
                    <FaUserGraduate className="info-icon" />
                    <input
                      type="text"
                      value={editedData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="edit-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <FaEnvelope className="info-icon" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="info-item">
                    <FaPhone className="info-icon" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{profileData.address}</span>
                  </div>
                  <div className="info-item">
                    <FaCalendar className="info-icon" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                  <div className="info-item">
                    <FaUserGraduate className="info-icon" />
                    <span>{profileData.education}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="profile-details">
            <section className="bio-section">
              <h3>About Me</h3>
              {isEditing ? (
                <textarea
                  value={editedData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="edit-input bio-input"
                />
              ) : (
                <p>{profileData.bio}</p>
              )}
            </section>

            <section className="expertise-section">
              <h3>Areas of Expertise</h3>
              {isEditing ? (
                <div className="expertise-edit">
                  {editedData.expertise.map((skill, index) => (
                    <div key={index} className="expertise-edit-item">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newExpertise = [...editedData.expertise];
                          newExpertise[index] = e.target.value;
                          handleInputChange('expertise', newExpertise);
                        }}
                        className="edit-input"
                      />
                      <button
                        onClick={() => {
                          const newExpertise = editedData.expertise.filter((_, i) => i !== index);
                          handleInputChange('expertise', newExpertise);
                        }}
                        className="remove-expertise"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      handleInputChange('expertise', [...editedData.expertise, '']);
                    }}
                    className="add-expertise"
                  >
                    Add Expertise
                  </button>
                </div>
              ) : (
                <div className="expertise-tags">
                  {profileData.expertise.map((skill, index) => (
                    <span key={index} className="expertise-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <section className="achievements-section">
              <h3>Key Achievements</h3>
              {isEditing ? (
                <div className="achievements-edit">
                  {editedData.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-edit-item">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => {
                          const newAchievements = [...editedData.achievements];
                          newAchievements[index] = e.target.value;
                          handleInputChange('achievements', newAchievements);
                        }}
                        className="edit-input"
                      />
                      <button
                        onClick={() => {
                          const newAchievements = editedData.achievements.filter((_, i) => i !== index);
                          handleInputChange('achievements', newAchievements);
                        }}
                        className="remove-achievement"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      handleInputChange('achievements', [...editedData.achievements, '']);
                    }}
                    className="add-achievement"
                  >
                    Add Achievement
                  </button>
                </div>
              ) : (
                <div className="achievements-list">
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <div className="achievement-marker">🏆</div>
                      <p>{achievement}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {showCamera && (
        <CameraModal
          onCapture={handleCapturedPhoto}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};

export default Profile; 