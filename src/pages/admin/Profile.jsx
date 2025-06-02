import React from "react";
import "./Profile.css";
import Adminsidebar from "../../components/Adminsidebar";

const UserProfile = () => {
  return (
    <>
      <Adminsidebar />

      <div className='container'>
        {/* Main Content */}
        <div className='main-content'>
          {/* Profile Card */}
          <div className='profile-card'>
            <div className='profile-left'>
              <img
                className='avatar'
                src='https://via.placeholder.com/150'
                alt='Diane Cooper'
              />
              <h2>Diane Cooper</h2>
              <p className='email'>diane.cooper@example.com</p>

              <div className='stats'>
                <div>
                  <p className='stat-count'>15</p>
                  <p>Past</p>
                </div>
                <div>
                  <p className='stat-count'>2</p>
                  <p>Upcoming</p>
                </div>
              </div>

              <button className='send-button'>Send Message</button>
            </div>

            <div className='profile-right'>
              <div className='info-grid'>
                <div>
                  <strong>Gender:</strong> Female
                </div>
                <div>
                  <strong>Birthday:</strong> Feb 24th, 1997
                </div>
                <div>
                  <strong>Phone Number:</strong> (239) 555-0108
                </div>
                <div>
                  <strong>Street Address:</strong> 8721 M. Dragnea St.
                </div>
                <div>
                  <strong>City:</strong> Columbia
                </div>
                <div>
                  <strong>ZIP Code:</strong> 656849
                </div>
                <div>
                  <strong>Member Status:</strong> Active Member
                </div>
                <div>
                  <strong>Registered Date:</strong> Feb 24th, 1997
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
