import { useEffect, useState } from "react";
import PageHeader from "../components/header/PageHeader";
import CustomInput from "../components/inputs/CustomInput";
import DashboardContainer from "../containers/DashboardContainer";
import { getValueFromUserDetail } from "../utils/helpers";

export default function Profile({ }: any) {
  const [userDetail, setUserDetail] = useState(Object.assign({}));

  useEffect(() => {
    const getUserDetails = getValueFromUserDetail();
    setUserDetail(getUserDetails);
    return () => {

    }
  }, [])

  return (
    <DashboardContainer>
      <PageHeader
        title="Profile"
        description="Profile management"
      />

      <div className="bg-white rounded shadow overflow-x-auto sm:rounded mb-5 p-5 table-div" >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CustomInput
              value={userDetail?.firstName}
              hideableLabelText=""
              fixedLabelText="Firstname"
              readOnly={true}
              type="text"
              inputFontSize="md:text-sm"
              name="firstName"
              className="col-span-6"
            />
          </div>
          <div>
            <CustomInput
              value={userDetail?.firstName}
              hideableLabelText=""
              fixedLabelText="Firstname"
              readOnly={true}
              type="text"
              inputFontSize="md:text-sm"
              name="firstName"
              className="col-span-6"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CustomInput
              value={userDetail?.email}
              hideableLabelText=""
              fixedLabelText="Email"
              readOnly={true}
              type="text"
              inputFontSize="md:text-sm"
              name="email"
              className="col-span-6"
            />
          </div>
          <div>
            <CustomInput
              value={userDetail?.jobTitle}
              hideableLabelText=""
              fixedLabelText="Job Title"
              readOnly={true}
              type="text"
              inputFontSize="md:text-sm"
              name="jobTitle"
              className="col-span-6"
            />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
