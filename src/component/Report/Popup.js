import React, { useEffect } from "react";
import { popupStateReport } from "./Report";
import { IoClose } from "react-icons/io5";
import { list, idReport, ReportData } from "./Report";
import { useIntl } from "react-intl";

export default function Popup() {
  const dataLang = useIntl();

  const handleDeleteReport = (e) => {
    popupStateReport.value = false;
    const newDB = ReportData.value.filter(
      (item) => item.id !== parseInt(idReport.value)
    );
    console.log(newDB);
    ReportData.value = newDB;
  };

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

  // useEffect(() => {
  //   console.log(idReport.value);
  // },[idReport.value]);

  return (
    <div className="DAT_PopupReport_Box">
      <div className="DAT_PopupReport_Box_Head">
        <div className="DAT_PopupReport_Box_Head_Left">
          <p>{dataLang.formatMessage({ id: 'delDevice' })}</p>
        </div>
        <div className="DAT_PopupReport_Box_Head_Right">
          <div
            className="DAT_PopupReport_Box_Head_Right_Icon"
            onClick={() => (popupStateReport.value = false)}
            id="Popup"
            onMouseEnter={(e) => handlePopup("new")}
            onMouseLeave={(e) => handlePopup("pre")}
          >
            <IoClose size={20}></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_PopupReport_Box_Body">
        <p>
          {dataLang.formatMessage({ id: 'delreportmess' })}
        </p>
      </div>
      <div className="DAT_PopupReport_Box_Foot">
        <button
          style={{
            border: "1px solid #505050",
            backgroundColor: "white",
            color: "#505050",
          }}
          onClick={() => (popupStateReport.value = false)}
        >
          {dataLang.formatMessage({ id: 'cancel' })}
        </button>
        <button
          style={{ backgroundColor: "#048FFF", color: "white" }}
          onClick={(e) => handleDeleteReport(e)}
        >
          {dataLang.formatMessage({ id: 'confirm' })}
        </button>
      </div>
    </div>
  );
}
