import React, { useEffect, useState } from "react";
import "./Project.scss";
import { plantState } from "./Project";
import GoogleMap from "google-maps-react-markers";

import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { isMobile } from "../Navigation/Navigation";

const BasicInfo = (props) => {
  const [state, setState] = useState(true);
  const defaultProps = {
    center: {
      lat: 16.054083398111068,
      lng: 108.20361013247235,
    },
    zoom: 7.0,
  };

  return (
    <div className="DAT_AddProject_BasicInfo">
      <div className="DAT_AddProject_BasicInfo_Tit">
        <div className="DAT_AddProject_BasicInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_BasicInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_AddProject_BasicInfo_Body">
            <div className="DAT_AddProject_BasicInfo_Body_Left">
              <div className="DAT_AddProject_BasicInfo_Body_Left_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên dự án:</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_AddProject_BasicInfo_Body_Left_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Địa chỉ:</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_AddProject_BasicInfo_Body_Left_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tọa độ:</span>
                </div>
                <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi">
                  <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content">
                    <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content_Tit">
                      Kinh độ
                    </div>
                    <input></input>
                  </div>
                  <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content">
                    <div className="DAT_AddProject_BasicInfo_Body_Left_Item_Posi_Content_Tit">
                      Vĩ độ
                    </div>
                    <input></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="DAT_AddProject_BasicInfo_Body_Right">
              <div className="DAT_AddProject_BasicInfo_Body_Right_Item">
                <div className="DAT_AddProject_BasicInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Vị trí:</span>
                </div>
                <div className="DAT_AddProject_BasicInfo_Body_Right_Item_Content">
                  <GoogleMap
                    apiKey={process.env.REACT_APP_GGKEY}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    //onGoogleApiLoaded={onGoogleApiLoaded}
                  ></GoogleMap>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const SystemInfo = (props) => {
  const [state, setState] = useState(true);

  return (
    <div className="DAT_AddProject_SystemInfo">
      <div className="DAT_AddProject_SystemInfo_Tit">
        <div className="DAT_AddProject_SystemInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_SystemInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_AddProject_SystemInfo_Body">
            <div className="DAT_AddProject_SystemInfo_Body_Left">
              <div className="DAT_AddProject_SystemInfo_Body_Left_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại dự án:</span>
                </div>
                <select>
                  <option>Hộ dân</option>
                  <option>Nhà máy</option>
                </select>
              </div>

              <div className="DAT_AddProject_SystemInfo_Body_Left_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Loại hệ thống điện:</span>
                </div>
                <select>
                  <option>Hệ thống hòa lưới</option>
                  <option>Hệ thống hòa lưới bám tải</option>
                  <option>Hệ thống lưu trữ hybrid</option>
                  <option>Hệ thống lưu trữ năng lượng ESS</option>
                  <option>Hệ thống solar pump</option>
                </select>
              </div>
            </div>

            <div className="DAT_AddProject_SystemInfo_Body_Center">
              <div className="DAT_AddProject_SystemInfo_Body_Center_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dung lượng(kWp):</span>
                </div>
                <input></input>
              </div>

              <div className="DAT_AddProject_SystemInfo_Body_Center_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Dữ liệu trên lưới:</span>
                </div>
                <input type="date"></input>
              </div>
            </div>

            <div className="DAT_AddProject_SystemInfo_Body_Right">
              <div className="DAT_AddProject_SystemInfo_Body_Right_Item">
                <div className="DAT_AddProject_SystemInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Góc nghiêng:</span>
                </div>
                <input placeholder="0~90"></input>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const YieldInfo = (props) => {
  const [state, setState] = useState(true);
  return (
    <div className="DAT_AddProject_YieldInfo">
      <div className="DAT_AddProject_YieldInfo_Tit">
        <div className="DAT_AddProject_YieldInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_YieldInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_AddProject_YieldInfo_Body">
            <div className="DAT_AddProject_YieldInfo_Body_Left">
              <div className="DAT_AddProject_YieldInfo_Body_Left_Item">
                <div className="DAT_AddProject_YieldInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tiền tệ:</span>
                </div>
                <select>
                  <option>VND</option>
                  <option>USD</option>
                </select>
              </div>
            </div>

            <div className="DAT_AddProject_YieldInfo_Body_Center">
              <div className="DAT_AddProject_YieldInfo_Body_Center_Item">
                <div className="DAT_AddProject_YieldInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Đơn giá(VND/kWh):</span>
                </div>
                <input></input>
              </div>
            </div>

            <div className="DAT_AddProject_YieldInfo_Body_Right"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const OwnerInfo = (props) => {
  const [state, setState] = useState(true);
  return (
    <div className="DAT_AddProject_OwnerInfo">
      <div className="DAT_AddProject_OwnerInfo_Tit">
        <div className="DAT_AddProject_OwnerInfo_Tit_Left">{props.tit}</div>

        <div
          className="DAT_AddProject_OwnerInfo_Tit_Right"
          onClick={() => setState(!state)}
        >
          <IoIosArrowDown
            size={20}
            style={{
              transform: state ? "rotate(0deg)" : "rotate(180deg)",
              transition: "0.5s",
            }}
          />
        </div>
      </div>

      <div
        style={{
          height: state ? props.height : "0px",
          transition: "0.5s",
          overflow: "hidden",
        }}
      >
        {state ? (
          <div className="DAT_AddProject_OwnerInfo_Body">
            <div className="DAT_AddProject_OwnerInfo_Body_Left">
              <div className="DAT_AddProject_OwnerInfo_Body_Left_Item">
                <div className="DAT_AddProject_OwnerInfo_Body_Left_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Người liên hệ:</span>
                </div>
                <input></input>
              </div>
            </div>

            <div className="DAT_AddProject_OwnerInfo_Body_Center">
              <div className="DAT_AddProject_OwnerInfo_Body_Center_Item">
                <div className="DAT_AddProject_OwnerInfo_Body_Center_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Số điện thoại:</span>
                </div>
                <input></input>
              </div>
            </div>

            <div className="DAT_AddProject_OwnerInfo_Body_Right">
              <div className="DAT_AddProject_OwnerInfo_Body_Right_Item">
                <div className="DAT_AddProject_OwnerInfo_Body_Right_Item_Tit">
                  <span style={{ color: "red" }}>* </span>
                  <span style={{ color: "grey" }}>Tên doanh nghiệp:</span>
                </div>
                <input></input>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

function AddProject(props) {
  return (
    <div className="DAT_AddProject">
      <div className="DAT_AddProject_Header">
        <div className="DAT_AddProject_Header_Left">Thêm Dự Án</div>

        <div className="DAT_AddProject_Header_Right">
          <div className="DAT_AddProject_Header_Right_Save">
            <FaSave size={20} color="white" />
            <span>Lưu</span>
          </div>
          <div className="DAT_AddProject_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (plantState.value = "default")}
            />
          </div>
        </div>
      </div>

      <BasicInfo
        tit={"Thông tin cơ bản"}
        height={isMobile.value ? "700px" : "350px"}
      />

      <SystemInfo
        tit={"Thông tin hệ thống"}
        height={isMobile.value ? "530px" : "220px"}
      />

      <YieldInfo
        tit={"Thông tin sản lượng"}
        height={isMobile.value ? "220px" : "120px"}
      />

      <OwnerInfo
        tit={"Thông tin người sở hữu"}
        height={isMobile.value ? "320px" : "120px"}
      />
    </div>
  );
}

export default AddProject;