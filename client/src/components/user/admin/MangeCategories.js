import React from "react";
import UserDashboardLayout from "./../../shared/user/index";
import ManageWoods from "./ManageWoods";
import ManageBrands from "./ManageBrands";
function MangeCategories() {
  return (
    <UserDashboardLayout>
      <ManageBrands />

      <ManageWoods />
    </UserDashboardLayout>
  );
}

export default MangeCategories;
