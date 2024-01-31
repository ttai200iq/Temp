import React from "react";
import "./Project.scss";
import { plantState, projectData } from "./Project";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineError, MdPermDataSetting } from "react-icons/md";
import { IoIosCloud } from "react-icons/io";
import { FaCheckCircle, FaTree } from "react-icons/fa";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function ProjectData(props) {
  const v = 'Sản lượng tháng'

  const data = [
    {
      name: '1',
      [v]: 1.69,

    },
    {
      name: '2',
      [v]: 2.3,

    },
    {
      name: '3',
      [v]: 2.5,

    },
    {
      name: '4',
      [v]: 5.6,

    },
    {
      name: '5',
      [v]: 7.3,

    },
    {
      name: '6',
      [v]: 9.9,

    },
    {
      name: '7',
      [v]: 0.3,

    },
    {
      name: '8',
      [v]: 8.3,

    },
    {
      name: '9',
      [v]: 7.3,

    },
    {
      name: '10',
      [v]: 1.79,

    },
    {
      name: '11',
      [v]: 6.1,

    },
    {
      name: '12',
      [v]: 4.5,

    },
  ];



  return (
    <div className="DAT_ProjectData">
      <div className="DAT_ProjectData_Header">
        <div className="DAT_ProjectData_Header_Left">
          <div style={{ fontSize: 22, paddingBottom: 5 }}>
            {projectData.value.name}
          </div>

          <div style={{ color: "grey", fontSize: 14 }}>
            Cập nhật lần cuối {projectData.value.lastupdate}
          </div>
        </div>

        <div className="DAT_ProjectData_Header_Right">
          <div className="DAT_ProjectData_Header_Right_Close">
            <RxCross2
              size={20}
              color="white"
              onClick={() => (plantState.value = "default")}
            />
          </div>
        </div>
      </div>

      <div className="DAT_ProjectData_Body">
        <div className="DAT_ProjectData_Body_Data">
          <div className="DAT_ProjectData_Body_Data_Left">
            <div className="DAT_ProjectData_Body_Data_Left_Img">
              <img src="/dat_picture/solar_panel.png" alt="" />
            </div>

            <div className="DAT_ProjectData_Body_Data_Left_Info">
              <div
                className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                style={{ marginBottom: "16px" }}
              >
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                  Địa chỉ
                </div>
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content">
                  {projectData.value.addr}
                </div>
              </div>

              <div
                className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                style={{ marginBottom: "16px" }}
              >
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                  Trạng thái
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                  style={{ textAlign: "right" }}
                >
                  {projectData.value.status ? (
                    <>
                      <FaCheckCircle size={20} color="green" />
                    </>
                  ) : (
                    <>
                      <MdOutlineError size={20} color="red" />
                    </>
                  )}
                </div>
              </div>

              <div
                className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                style={{ marginBottom: "16px" }}
              >
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                  Loại Dự Án
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                  style={{ textAlign: "right" }}
                >
                  --
                </div>
              </div>

              {/* <div
                className="DAT_ProjectData_Body_Data_Left_Info_Addr"
                style={{ marginBottom: "16px" }}
              >
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                  Loại Hệ Thống
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                  style={{ textAlign: "right" }}
                >
                  --
                </div>
              </div> */}

              <div className="DAT_ProjectData_Body_Data_Left_Info_Addr">
                <div className="DAT_ProjectData_Body_Data_Left_Info_Addr_Title">
                  Số Điện Thoại
                </div>
                <div
                  className="DAT_ProjectData_Body_Data_Left_Info_Addr_Content"
                  style={{ textAlign: "right" }}
                >
                  --
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Body_Data_Center">
            <div className="DAT_ProjectData_Body_Data_Center_Tit">
              Năng suất
            </div>

            <div className="DAT_ProjectData_Body_Data_Center_Data">
              <div className="DAT_ProjectData_Body_Data_Center_Data_Chart">
                <div
                  className="DAT_ProjectData_Body_Data_Center_Data_Chart_Data"
                  style={{ fontSize: "32px" }}
                >
                  0%
                </div>
              </div>

              <div className="DAT_ProjectData_Body_Data_Center_Data_Detail">
                <div style={{ marginBottom: "8px", color: "grey" }}>
                  Năng suất
                </div>
                <div style={{ marginBottom: "8px" }}>
                  {projectData.value.production}
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    kW
                  </span>
                </div>
                <div
                  style={{
                    borderBottom: "solid 1px rgb(199, 199, 199)",
                    width: "50%",
                    marginBottom: "8px",
                  }}
                />
                <div style={{ marginBottom: "8px", color: "grey" }}>
                  Dung lượng
                </div>
                <div>
                  {projectData.value.capacity}
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    kWp
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                borderBottom: "solid 1px rgb(199, 199, 199)",
                height: "16px",
                marginBottom: "16px",
              }}
            />

            <div className="DAT_ProjectData_Body_Data_Center_Total">
              <div
                className="DAT_ProjectData_Body_Data_Center_Total_Item"
                style={{ backgroundColor: "rgb(245, 251, 255)" }}
              >
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Tit">
                  Năng suất ngày
                </div>
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Data">
                  --
                </div>
              </div>

              <div
                className="DAT_ProjectData_Body_Data_Center_Total_Item"
                style={{ backgroundColor: "rgb(255, 248, 247)" }}
              >
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Tit">
                  Năng suất tháng
                </div>
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Data">
                  --
                </div>
              </div>

              <div
                className="DAT_ProjectData_Body_Data_Center_Total_Item"
                style={{ backgroundColor: "rgb(246, 245, 255)" }}
              >
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Tit">
                  Năng suất năm
                </div>
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Data">
                  --
                </div>
              </div>

              <div
                className="DAT_ProjectData_Body_Data_Center_Total_Item"
                style={{ backgroundColor: "rgb(245, 250, 246)" }}
              >
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Tit">
                  Tổng năng suất
                </div>
                <div className="DAT_ProjectData_Body_Data_Center_Total_Item_Data">
                  --
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Body_Data_Right">
              <div className="DAT_ProjectData_Body_Data_Right_wheather"></div>
          </div>
        </div>

        <div className="DAT_ProjectData_Body_History">
          <div className="DAT_ProjectData_Body_History_Tit">
            <div className="DAT_ProjectData_Body_History_Tit_Left">Lịch sử</div>

            <div className="DAT_ProjectData_Body_History_Tit_Right">
              <div className="DAT_ProjectData_Body_History_Tit_Right_Date">
                <div
                  className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                  style={{ borderRight: "solid 1px rgb(199, 199, 199)" }}
                >
                  Ngày
                </div>
                <div
                  className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                  style={{ borderRight: "solid 1px rgb(199, 199, 199)" }}
                >
                  Tháng
                </div>
                <div
                  className="DAT_ProjectData_Body_History_Tit_Right_Date_Item"
                  style={{ borderRight: "solid 1px rgb(199, 199, 199)" }}
                >
                  Năm
                </div>
                <div className="DAT_ProjectData_Body_History_Tit_Right_Date_Item">
                  Tổng
                </div>
              </div>
              <div>
                <button>Chọn Thông Số</button>
              </div>
              <div className="DAT_ProjectData_Body_History_Tit_Right_Export">
                <button>Xuất Báo Cáo</button>
              </div>
              <input type="date"></input>
            </div>
          </div>

          <div className="DAT_ProjectData_Body_History_Content">

            <div className='DAT_ProjectData_Body_History_Content_Tit'>
              <div className='DAT_ProjectData_Body_History_Content_Tit-Unit'>MWh</div>
              <div className='DAT_ProjectData_Body_History_Content_Tit-Label'>Sản lượng năm: 1.69 MWh</div>
            </div>
            <div className="DAT_ProjectData_Body_History_Content_Chart">

            <ResponsiveContainer style={{ width: "100%", height: "100%", marginLeft: "-20px" }}>
              <BarChart width={150} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={v} fill="#6495ed" barSize={15} legendType='circle' style={{ fill: "#6495ed" }} />
              </BarChart>
            </ResponsiveContainer>
            </div>


          </div>
        </div>

        <div className="DAT_ProjectData_Body_More">
          <div className="DAT_ProjectData_Body_More_Left">
            <div className="DAT_ProjectData_Body_More_Left_Tit">
              <span>Trình Tự Công Việc</span>
              <div className="DAT_ProjectData_Body_More_Left_Tit_Button">
                <IoArrowForward />
              </div>
            </div>

            <div className="DAT_ProjectData_Body_More_Left_Content">
              <div className="DAT_ProjectData_Body_More_Left_Content_Item">
                <div
                  className="DAT_ProjectData_Body_More_Left_Content_Item_Value"
                  style={{
                    textAlign: "center",
                    fontSize: "32px",
                    color: "#048FFF",
                  }}
                >
                  0
                </div>

                <div
                  className="DAT_ProjectData_Body_More_Left_Content_Item_Detail"
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "grey",
                    marginTop: "8px",
                  }}
                >
                  Đang Thực Hiện
                </div>
              </div>

              <div className="DAT_ProjectData_Body_More_Left_Content_Item">
                <div
                  className="DAT_ProjectData_Body_More_Left_Content_Item_Value"
                  style={{
                    textAlign: "center",
                    fontSize: "32px",
                    color: "#41D068",
                  }}
                >
                  0
                </div>

                <div
                  className="DAT_ProjectData_Body_More_Left_Content_Item_Detail"
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "grey",
                    marginTop: "8px",
                  }}
                >
                  Hoàn Tất
                </div>
              </div>
            </div>
          </div>

          <div className="DAT_ProjectData_Body_More_Right">
            <div className="DAT_ProjectData_Body_More_Right_Tit">
              Lợi ích môi trường và kinh tế
            </div>

            <div className="DAT_ProjectData_Body_More_Right_Content">
              <div className="DAT_ProjectData_Body_More_Right_Content_Col">
                <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                    <MdPermDataSetting size={24} color="#6495ed" />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "grey" }}>
                      Thang đo tiêu chuẩn
                    </div>
                    <div>--</div>
                  </div>
                </div>
                <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                    <FaTree size={24} color="#6495ed" />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "grey" }}>
                      Sản lượng cây trồng
                    </div>
                    <div>--</div>
                  </div>
                </div>
              </div>

              <div className="DAT_ProjectData_Body_More_Right_Content_Col">
                <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                    <IoIosCloud size={24} color="#6495ed" />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "grey" }}>
                      Giảm khí thải CO₂
                    </div>
                    <div>--</div>
                  </div>
                </div>
                <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item">
                  <div className="DAT_ProjectData_Body_More_Right_Content_Col_Item_Icon">
                    <RiMoneyCnyCircleFill size={24} color="#6495ed" />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "grey" }}>
                      Tổng sản lượng
                    </div>
                    <div>--</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectData;