import React from "react";
import "./Device.scss"
import { popupState } from "./Device";
import { IoClose } from "react-icons/io5";
import { hasIn } from "lodash";

export default function Popup() {

  const popup_state = {
    pre: { transform: "rotate(0deg)", transition: "0.5s", color: "black" },
    new: { transform: "rotate(90deg)", transition: "0.5s", color: "red" }
  }

  const handlePopup = (state) => {
    const popup = document.getElementById("Popup")
    popup.style.transform = popup_state[state].transform;
    popup.style.transition = popup_state[state].transition;
    popup.style.color = popup_state[state].color;
  }



  return (
    <div className="DAT_Popup_Box">
      <div className="DAT_Popup_Box_Head">
        <div className="DAT_Popup_Box_Head_Left">
          <p>Xóa thiết bị</p>
        </div>
        <div className="DAT_Popup_Box_Head_Right">
          <div
            className="DAT_Popup_Box_Head_Right_Icon"
            onClick={() => (popupState.value = false)}
            id="Popup"
            onMouseEnter={e => (handlePopup("new"))}
            onMouseLeave={e => (handlePopup("pre"))}
          >
            <IoClose size={20}  ></IoClose>
          </div>
        </div>
      </div>
      <div className="DAT_Popup_Box_Body">
        <p>
          Bạn có chắc chắn muốn xóa vĩnh viễn thiết bị này không? Tất cả dữ liệu
          lịch sử của XXX sẽ bị mất.
        </p>
      </div>
      <div className="DAT_Popup_Box_Foot">
        <button
          style={{
            border: "1px solid #505050", backgroundColor: "white",
            color: "#505050"
          }}
          onClick={() => (popupState.value = false)}
        >
          Hủy
        </button>
        <button style={{ backgroundColor: "#048FFF", color: "white" }}>
          Xác nhận
        </button>
      </div>
    </div>
  );
}
