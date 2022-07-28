import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import colors from "tailwindcss/colors";
import { responseMessages } from "../../../common/constants";
import Alert from "../../../components/alerts/Alert";
import Badge from "../../../components/badges/Badge";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import AppMenuDropdown from "../../../components/dropdowns/AppMenuDropdown";
import CustomInput from "../../../components/inputs/CustomInput";
import DialogModal from "../../../components/modals/DialogModal";
import { isEmptyString, isNullOrUndefined, isSuccessful } from "../../../libs/helper";
import { callGetMenusByRoleIdApi, callPutEditRoleApi } from "../../../services/roleOpsService";

export default function EditRoleModal({
  handleClose,
  isOpen,
  fetchRoles,
  data }: any) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [roleDetail, setRoleDetail] = useState<any>(data);
  const [roleMenus, setRoleMenus] = useState<any>([]);

  const handleEditRole = () => {
    setIsSubmitting(true);


    callPutEditRoleApi(roleDetail).then((response: any) => {
      setIsSubmitting(false);
      if (isSuccessful(response?.responseCode)) {
        toast.custom((t) => (
          <Alert
            type="success"
            t={t}
            message={response?.message ?? responseMessages.SUCCESSFUL}
          />
        ));
        handleClose();
        fetchRoles();
      } else {
        toast.custom((t) => (
          <Alert
            type="failed"
            t={t}
            message={response?.message ?? responseMessages.BAD_REQUEST}
          />
        ));
      }
    });
  };

  const addToRoleMenus = (e: any) => {
    setRoleMenus(
      [...roleMenus, e.target.value]
    );
  }

  useEffect(() => {
    callGetMenusByRoleIdApi(data.id).then((response) => {
      console.log("response:::", response);
      if (isSuccessful(response.responseCode)) {
        setRoleMenus(response.data.menus);
      }
    })

    return () => {

    }
  }, [])

  return (
    <DialogModal
      showFooter={false}
      size="md:w-1/2"
      isModalVisible={isOpen}
      modalTitle="Edit Role Details"
      onClosed={handleClose}
    >
      <div className="my-3 h-full">
        <div className="mb-2 md:flex">
          <div className="w-full">
            <CustomInput
              value={roleDetail?.name}
              hideableLabelText=""
              fixedLabelText="Role Name"
              onChange={(e: any) => {
                setRoleDetail({ ...roleDetail, [e.target.name]: e.target.value })
              }}
              type="text"
              inputFontSize="md:text-sm"
              name="name"
            />
          </div>
        </div>
        <div className="flex justify-between -mb-2 space-x-2">
          <div className="my-5 text-sm font-bold">Role Menus</div>
          <div className="w-1/2 my-2">
            <AppMenuDropdown labelTitle="" onChange={addToRoleMenus} />
          </div>
          <PrimaryButton
            extraDivStyles="w-1/5 my-5"
            className={`w-full font-bold text-xs bg-primary-900 text-white rounded-lg border-0 cursor-pointer`}
            disabled={false}
            isLoading={isSubmitting}
            onClicked={handleEditRole}
            height="py-2 px-3"
          >
            <span className="flex justify-between space-x-2 text-center inline-block align-baseline" onClick={() => null}>
              <BsPlusCircle stroke={colors.white} strokeWidth={1} /> <span>Add Menu</span>
            </span>
          </PrimaryButton>
        </div>
        <div className={`flex border-2 rounded-lg border-primary-900 p-2 ${roleMenus.length === 0 && "bg-gray-100"}`} style={
          {
            height: "100px"
          }
        }>
          <div className={`overflow-y-auto`}>
            {
              roleMenus.length > 0 ? roleMenus.map((items: any, index: any) => {
                return <Fragment key={"badge_"+index}>
                  <Badge bgColor="bg-primary-600"
                    text={items}
                    textSize="text-xs px-2 text-white" />
                </Fragment>
              }) : <>No menus added yet</>
            }
          </div>
        </div>
        {/* <AppMenuDropdown /> */}
        <div>
          <PrimaryButton
            extraDivStyles="w-full my-5"
            disabled={isSubmitting || (isNullOrUndefined(roleDetail.name) || isEmptyString(roleDetail.name))}
            isLoading={isSubmitting}
            onClicked={handleEditRole}
            buttonText="Submit"
            height="py-4"
          />
        </div>
      </div>
    </DialogModal>
  );
}
