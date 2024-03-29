import React from "react";
import "./Role.scss";
import { popupState, roleState } from "./Role";
import { IoClose } from "react-icons/io5";
import { useIntl } from "react-intl";

export default function DeleteRole() {
  const dataLang = useIntl();

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" },
  };

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup");
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  };

  return (
    <div className="DAT_DeleteRole">
      <div className="DAT_DeleteRole_Head">
        <div className="DAT_DeleteRole_Head_Left">
          <p>{dataLang.formatMessage({ id: 'delAccount' })}</p>
        </div>
        <div className="DAT_DeleteRole_Head_Right">
          <div
            className="DAT_DeleteRole_Head_Right_Icon"
            onClick={() => (popupState.value = "default")}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_DeleteRole_Body">
        <p>
          {dataLang.formatMessage({ id: 'delaccountmess' })}
        </p>
      </div>
      <div className="DAT_DeleteRole_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupState.value = "default")}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
        >
          {dataLang.formatMessage({ id: 'confirm' })}
        </button>
      </div>
    </div>
  );
}
