import React from "react";
import UserDashboardLayout from "./../shared/user/index";
import SharedButton from "./../shared/button";
import UserHistoryBlock from "./UserHistoryBlock";
function UserDashboard({ user }) {
  if (user.userData) {
    return (
      <UserDashboardLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User information</h1>
            <div>
              <span>{user.userData.firstname}</span>
              <span>{user.userData.lastname}</span>
              <span>{user.userData.email}</span>
            </div>
            <SharedButton
              type="link"
              title="Edit account info"
              linkTo="/user/user_profile"
            />
          </div>
          {user.userData.history ? (
            <div className="user_nfo_panel">
              <h1>History purchases</h1>
              <div className="user_product_block_wrapper">
                <UserHistoryBlock history={user.userData.history} />
              </div>
            </div>
          ) : null}
        </div>
      </UserDashboardLayout>
    );
  } else {
    return <div></div>;
  }
}

export default UserDashboard;
