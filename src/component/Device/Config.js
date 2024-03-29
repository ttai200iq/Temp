import React from "react";
import { IoMdExit } from "react-icons/io";
import { configState } from "./Device";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useIntl } from "react-intl";

const CheckBox = (props) => {
  return (
    <div className="DAT_Config_Body_Item_CheckBox_Option">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={props.info}
        ></input>
        <label
          style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
          className="form-check-label"
          htmlFor={props.info}
        >
          {props.info}
        </label>
      </div>
    </div>
  );
};

export default function Config() {
  const dataLang = useIntl();
  React.useEffect(() => {
    console.log(configState.value);
  });
  const handleCloseConfig = () => {
    configState.value = false;
  };

  return (

    <div className="DAT_Config">
      <div className="DAT_Config_Header">
        <div className="DAT_Config_Header_Left">
          <p style={{ fontSize: "20px" }}>{dataLang.formatMessage({ id: 'config' })}</p>
        </div>
        <div className="DAT_Config_Header_Right">
          <div className="DAT_Config_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>{dataLang.formatMessage({ id: 'save' })}</span>
          </div>
          <div className="DAT_Config_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={handleCloseConfig}
            />
          </div>
        </div>
      </div>

      <div className="DAT_Config_Body">
        <div className="DAT_Config_Body_Item">
          <div className="DAT_Config_Body_Item_Tit">{dataLang.formatMessage({ id: 'chooseDevice' })}</div>
          <div className="DAT_Config_Body_Item_CheckBox">
            <CheckBox info="Biến tần" />
            <CheckBox info="Đồng hồ đo" />
            <CheckBox info="Mô-đun" />
            <CheckBox info="Hộp kết hợp" />
            <CheckBox info="Trạm thời tiết" />
            <CheckBox info="Micro biến tần" />
            <CheckBox info="Pin, ắc quy" />
            <CheckBox info="Bộ khuếch đại tín hiệu" />
            <CheckBox info="Quạt" />
            <CheckBox info="Tủ Điện Hỗn Hợp " />
            <CheckBox info="Đồng Hồ Thông Minh" />
            <CheckBox info="Biến tần Hệ Thống Ngoại Lưới" />
            <CheckBox info="Máy Biến Áp Hộp" />
            <CheckBox info="Thiết bị Chuyển Mạch" />
            <CheckBox info="Bộ Tối Ưu Hóa Công Suất" />
            <CheckBox info="ABC" />
          </div>
        </div>
      </div>
    </div>

  );
}
