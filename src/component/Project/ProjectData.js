import React, { useEffect, useState } from "react";
import "./Project.scss";
import AddGateway, { crudtype, raiseBoxState } from "./AddGateway";
import { Empty, plantState, projectData, deviceData, Logger, Inverter, popupState } from "./Project";
import { isMobile } from "../Navigation/Navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

import { IoIosArrowDown, IoIosArrowForward, IoIosCloud } from "react-icons/io";
import { IoArrowForward, IoCalendarOutline, IoMenu } from "react-icons/io5";
import { MdOutlineError, MdPermDataSetting } from "react-icons/md";
import { FaCheckCircle, FaTree } from "react-icons/fa";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsMenuButtonWide, BsThreeDotsVertical } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";

import { signal } from "@preact/signals-react";
import DataTable from "react-data-table-component";
import moment from "moment-timezone";
import Weather from "./Weather";
import AddSubsystem from "./AddSubsystem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { callApi } from "../Api/Api";
import { host } from "../Lang/Contant";
import { set } from "lodash";
import RaiseBox from "./RaiseBox";
import { Token } from "../../App";
import axios from "axios";
import { alertDispatch } from "../Alert/Alert";
import Popup from "./Popup";

export const dropState = signal(false);
export const popupAddGateway = signal(false);
export const popupAddSubsystem = signal(false);
export const temp = signal([]);
export const coalsave = signal({
  value: 1,
  ef: 0.7221,
  avr: 0.517,
  tree: 0.054
});

const tabMobile = signal(false);
const tabLable = signal("");
const tab = signal("logger");
const tabMobileAlert = signal(false);
const tabLableAlert = signal("");
const tabAlert = signal("all");
const open = signal([]);
const close = signal([]);

const dataMeter = [
  // {
  //   id: 1,
  //   SN: "M0000223",
  //   name: "Meter 01",
  //   plant: "Năng lượng DAT 02",
  //   status: true,
  //   production: "66",
  //   dailyproduction: "895.4",
  //   updated: "12/30/2023 12:07:12",
  // },
  // {
  //   id: 2,
  //   SN: "M0000009",
  //   name: "Meter 02",
  //   plant: "Năng lượng DAT 02",
  //   status: true,
  //   production: "18",
  //   dailyproduction: "1238.4",
  //   updated: "12/30/2023 12:07:12",
  // },
  // {
  //   id: 3,
  //   SN: "M0000327",
  //   name: "Meter 03",
  //   plant: "Năng lượng DAT 02",
  //   status: true,
  //   production: "45",
  //   dailyproduction: "1024.4",
  //   updated: "12/30/2023 12:07:12",
  // },
];

const dataAlert = [
  {
    id: 1,
    name: "Input UV",
    status: true,
    importance: "Cao",
    device: "Inverter 01",
    SN: "I0000145",
    openedtime: "12/30/2023 12:07:12",
    closedtime: "12/30/2023 15:07:12",
  },
  {
    id: 2,
    name: "Cmd Shut",
    status: false,
    importance: "Thấp",
    device: "Inverter 01",
    SN: "I0000145",
    openedtime: "12/30/2023 12:07:12",
    closedtime: "12/30/2023 15:07:12",
  },
];

const dbDay = [
  {
    date: "19/02/2024",
    name: "Sản lượng ngày",
    data: [
      { time: "00:00", val: 1.234 },
      { time: "01:00", val: 2.345 },
      { time: "02:00", val: 3.456 },
      { time: "03:00", val: 4.567 },
      { time: "04:00", val: 5.678 },
      { time: "05:00", val: 6.789 },
      { time: "06:00", val: 7.89 },
      { time: "07:00", val: 8.901 },
      { time: "08:00", val: 9.012 },
      { time: "09:00", val: 1.013 },
      { time: "10:00", val: 1.124 },
      { time: "11:00", val: 1.235 },
      { time: "12:00", val: 1.346 },
      { time: "13:00", val: 1.457 },
      { time: "14:00", val: 1.568 },
      { time: "15:00", val: 1.679 },
      { time: "16:00", val: 1.78 },
      { time: "17:00", val: 1.891 },
      { time: "18:00", val: 1.902 },
      { time: "19:00", val: 2.013 },
      { time: "20:00", val: 2.124 },
      { time: "21:00", val: 2.235 },
      { time: "22:00", val: 2.346 },
      { time: "23:00", val: 2.457 },
    ],
  },
  {
    date: "20/02/2024",
    name: "Sản lượng ngày",
    data: [
      { time: "00:00", val: 9.234 },
      { time: "01:00", val: 8.345 },
      { time: "02:00", val: 7.456 },
      { time: "03:00", val: 6.567 },
      { time: "04:00", val: 5.678 },
      { time: "05:00", val: 4.789 },
      { time: "06:00", val: 3.89 },
      { time: "07:00", val: 2.901 },
      { time: "08:00", val: 1.012 },
      { time: "09:00", val: 1.013 },
      { time: "10:00", val: 3.124 },
      { time: "11:00", val: 5.235 },
      { time: "12:00", val: 7.346 },
      { time: "13:00", val: 8.457 },
      { time: "14:00", val: 1.568 },
      { time: "15:00", val: 1.679 },
      { time: "16:00", val: 2.78 },
      { time: "17:00", val: 3.891 },
      { time: "18:00", val: 4.902 },
      { time: "19:00", val: 5.013 },
      { time: "20:00", val: 6.124 },
      { time: "21:00", val: 7.235 },
      { time: "22:00", val: 8.346 },
      { time: "23:00", val: 9.457 },
    ],
  },
];

const dbMonth = [
  {
    month: "01/2024",
    name: "Sản lượng tháng",
    data: [
      { time: "1", val: 21.69 },
      { time: "2", val: 22.31 },
      { time: "3", val: 23.45 },
      { time: "4", val: 24.56 },
      { time: "5", val: 25.67 },
      { time: "6", val: 26.78 },
      { time: "7", val: 27.89 },
      { time: "8", val: 28.9 },
      { time: "9", val: 29.01 },
      { time: "10", val: 22.12 },
      { time: "11", val: 23.23 },
      { time: "12", val: 22.34 },
      { time: "13", val: 24.45 },
      { time: "14", val: 23.56 },
      { time: "15", val: 22.67 },
      { time: "16", val: 24.78 },
      { time: "17", val: 21.89 },
      { time: "18", val: 21.9 },
      { time: "19", val: 22.01 },
      { time: "20", val: 20.12 },
      { time: "21", val: 21.23 },
      { time: "22", val: 22.34 },
      { time: "23", val: 23.45 },
      { time: "24", val: 24.56 },
      { time: "25", val: 25.67 },
      { time: "26", val: 24.78 },
      { time: "27", val: 23.89 },
      { time: "28", val: 22.9 },
      { time: "29", val: 23.01 },
      { time: "30", val: 21.12 },
      { time: "31", val: 21.23 },
    ],
  },
  {
    month: "02/2024",
    name: "Sản lượng tháng",
    data: [
      { time: "1", val: 24.78 },
      { time: "2", val: 21.89 },
      { time: "3", val: 22.9 },
      { time: "4", val: 21.9 },
      { time: "5", val: 22.01 },
      { time: "6", val: 20.12 },
      { time: "7", val: 27.89 },
      { time: "8", val: 28.9 },
      { time: "9", val: 29.01 },
      { time: "10", val: 21.23 },
      { time: "11", val: 23.23 },
      { time: "12", val: 22.34 },
      { time: "13", val: 24.45 },
      { time: "14", val: 23.56 },
      { time: "15", val: 22.67 },
      { time: "16", val: 24.78 },
      { time: "17", val: 21.89 },
      { time: "18", val: 21.9 },
      { time: "19", val: 22.01 },
      { time: "20", val: 20.12 },
      { time: "21", val: 21.23 },
      { time: "22", val: 22.34 },
      { time: "23", val: 23.45 },
      { time: "24", val: 24.56 },
      { time: "25", val: 25.67 },
      { time: "26", val: 24.78 },
      { time: "27", val: 23.89 },
      { time: "28", val: 22.9 },
      { time: "29", val: 23.01 },
      { time: "30", val: 21.12 },
      { time: "31", val: 21.23 },
    ],
  },
];

const dbYear = [
  {
    year: "2024",
    name: "Sản lượng năm",
    data: [
      { time: "1", val: 21.69 },
      { time: "2", val: 22.31 },
      { time: "3", val: 23.45 },
      { time: "4", val: 24.56 },
      { time: "5", val: 25.67 },
      { time: "6", val: 26.78 },
      { time: "7", val: 27.89 },
      { time: "8", val: 28.9 },
      { time: "9", val: 29.01 },
      { time: "10", val: 22.12 },
      { time: "11", val: 23.23 },
      { time: "12", val: 22.34 },
    ],
  },
  {
    year: "2023",
    name: "Sản lượng năm",
    data: [
      { time: "1", val: 24.78 },
      { time: "2", val: 21.89 },
      { time: "3", val: 22.9 },
      { time: "4", val: 24.56 },
      { time: "5", val: 25.67 },
      { time: "6", val: 26.78 },
      { time: "7", val: 27.89 },
      { time: "8", val: 28.9 },
      { time: "9", val: 29.01 },
      { time: "10", val: 22.12 },
      { time: "11", val: 23.23 },
      { time: "12", val: 22.34 },
    ],
  },
];

const dbTotal = [
  {
    name: "Sản lượng năm",
    data: [
      { time: "2018", val: 21.69 },
      { time: "2019", val: 22.31 },
      { time: "2020", val: 23.45 },
      { time: "2021", val: 24.56 },
      { time: "2022", val: 25.67 },
      { time: "2023", val: 26.78 },
      { time: "2024", val: 27.89 },
    ],
  },
]

function ProjectData(props) {
  const [nav, setNav] = useState("graph");
  const [dateType, setDateType] = useState("date");
  const [view, setView] = useState("dashboard");

  const [configname, setConfigname] = useState("Chọn thông số");
  const [dropConfig, setDropConfig] = useState(false);

  // const [temp, setTemp] = useState([]);
  const [tempInverter, setTempInverter] = useState({});

  const [dataDay, setDataDay] = useState([]);
  const [vDay, setVDay] = useState("--");
  const [dataMonth, setDataMonth] = useState([]);
  const [vMonth, setVMonth] = useState("--");
  const [dataYear, setDataYear] = useState([]);
  const [vYear, setVYear] = useState("--");
  const [dataTotal, setDataTotal] = useState([]);
  const [vTotal, setVTotal] = useState("--");

  const [d, setD] = useState({
    date: moment(new Date()).format("YYYY-MM-DD"),
    month: moment(new Date()).format("YYYY-MM"),
    year: moment(new Date()).format("YYYY"),
    total: "Tổng",
  });

  const navigate = useNavigate();

  const [invt, setInvt] = useState({})

  const color = {
    cur: "blue",
    pre: "black",
  };

  const tit = {
    dashboard: projectData.value.plantname,
    device: "Thiết bị",
    alert: "Cảnh báo",
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Số hàng",
    rangeSeparatorText: "đến",
    selectAllRowsItem: true,
    selectAllRowsItemText: "tất cả",
  };

  const listDeviceTab = [
    { id: "inverter", name: "Inverter" },
    // { id: "meter", name: "Meter" },
    { id: "logger", name: "Logger" },
  ];

  const columnInverter = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Sản lượng(kW)",
      selector: (row) => row.production,
      sortable: true,
      // width: "140px",
    },
    {
      name: "SL tức thời(kWh)",
      selector: (row) => row.dailyproduction,
      sortable: true,
      // width: "150px",
    },
    {
      name: "Hiệu suất",
      selector: (row) => "--",
      sortable: true,
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      // width: "180px",
    },
  ];

  const columnMeter = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Sản lượng(kW)",
      selector: (row) => row.production,
      sortable: true,
      // width: "140px",
    },
    {
      name: "SL tức thời(kWh)",
      selector: (row) => row.dailyproduction,
      sortable: true,
      // width: "150px",
    },
    {
      name: "Hiệu suất",
      selector: (row) => "--",
      sortable: true,
    },
    {
      name: "Lần cập nhật cuối",
      selector: (row) => row.updated,
      sortable: true,
      // width: "180px",
    },
  ];

  const columnLogger = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
          <div style={{ color: "grey" }}>{row.sn}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.state === 1 ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Loại logger",
      selector: (row) => row.type,
      sortable: true,
      // width: "180px",
    },
    {
      name: "Tùy chỉnh",
      selector: (row) => (
        <>
          <div className="DAT_TableEdit">
            <span
              id={row.sn + "_MORE"}
              onMouseEnter={(e) => handleModify(e, "block")}
            >
              ...
            </span>
          </div>

          <div
            className="DAT_ModifyBox"
            id={row.sn + "_Modify"}
            style={{ display: "none" }}
            onMouseLeave={(e) => handleModify(e, "none")}
          >
            <div
              className="DAT_ModifyBox_Fix"
              id={row.sn}
              onClick={(e) => handleEdit(e)}
            >
              Chỉnh sửa
            </div>
            <div
              className="DAT_ModifyBox_Remove"
              id={row.sn}
              onClick={(e) => handleDelete(e)}
            >
              Gỡ
            </div>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

  const listAlertTab = [
    { id: "all", name: "Tất cả" },
    { id: "open", name: "Mở" },
    { id: "closed", name: "Đóng" },
  ];

  const columnAlert = [
    {
      name: "Tên",
      selector: (row) => (
        <div>
          <div>{row.name}</div>
        </div>
      ),
      sortable: true,
      // minWidth: "350px",
      style: {
        justifyContent: "left",
      },
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <>
          {row.status ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <MdOutlineError size={22} color="red" />
          )}
        </>
      ),
      // width: "110px",
    },
    {
      name: "Mức quan trọng",
      selector: (row) => row.importance,
      sortable: true,
      // width: "140px",
    },
    {
      name: "Thiết bị",
      selector: (row) => (
        <div>
          <div>{row.device}</div>
          <div>{row.SN}</div>
        </div>
      ),
      sortable: true,
      // width: "150px",
    },
    {
      name: "Giờ mở",
      selector: (row) => row.openedtime,
      sortable: true,
    },
    {
      name: "Giờ đóng",
      selector: (row) => row.closedtime,
      sortable: true,
      // width: "180px",
    },
  ];

  const invtCloud = async (data, token) => {
    var reqData = {
      "data": data,
      "token": token
    };

    try {
      const response = await axios({
        url: host.CLOUD,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Object.keys(reqData).map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]) }).join('&'),
      });

      return response.data
    } catch (e) {
      return ({ ret: 1, msg: "cloud err" })
    }
  }

  const handleWarn = () => {
    navigate('/Warn');
    window.location.reload();
  }

  const handleNav = (e) => {
    var id = e.currentTarget.id;
    setNav(id);
  };

  const handleDate = (e) => {
    var id = e.currentTarget.id;
    setDateType(id);
  };

  const handleView = (e) => {
    var id = e.currentTarget.id;
    setView(id);
    if (id === "dashboard") {
      setNav("graph");
    }
    dropState.value = !dropState.value
  };

  const handleShowConfig = (e) => {
    if (configname === "Chọn thông số") {
      setConfigname("Thu gọn");
    } else if (configname === "Thu gọn") {
      setConfigname("Chọn thông số");
    }
  };

  const handleTabMobileDevice = (e) => {
    const id = e.currentTarget.id;
    tab.value = id;
    const newLabel = listDeviceTab.find((item) => item.id == id);
    tabLable.value = newLabel.name;
  };

  const handleTabMobileAlert = (e) => {
    const id = e.currentTarget.id;
    tabAlert.value = id;
    const newLabel = listAlertTab.find((item) => item.id == id);
    tabLableAlert.value = newLabel.name;
  };

  const handleChart = (date) => {
    if (dateType === "date") {
      setD({ ...d, date: moment(date).format("DD/MM/YYYY") });

      const newData = dbDay.find((item) => item.date === moment(date).format("DD/MM/YYYY"));
      if (newData) {
        let vDay = newData.name;
        setDataDay([]);
        newData.data.map((item) => {
          setDataDay((old) => [...old, { time: item.time, [vDay]: item.val }]);
        });
        setVDay(newData.name);
      } else {
        setDataDay([]);
        setVDay("--");
      }
    } else if (dateType === "month") {
      setD({ ...d, month: moment(date).format("MM/YYYY") });

      const newData = dbMonth.find((item) => item.month === moment(date).format("MM/YYYY"));
      if (newData) {
        let vMonth = newData.name;
        setDataMonth([]);
        newData.data.map((item) => {
          setDataMonth((old) => [...old, { time: item.time, [vMonth]: item.val }]);
        });
        setVMonth(newData.name);
      } else {
        setDataMonth([]);
        setVMonth("--");
      }
    } else if (dateType === "year") {
      setD({ ...d, year: moment(date).format("YYYY") });

      const year = moment(date).format("YYYY");
      const year_ = year.split("-")[0];

      const newData = dbYear.find((item) => item.year === year_);
      if (newData) {
        let vYear = newData.name;
        setDataYear([]);
        newData.data.map((item) => {
          setDataYear((old) => [...old, { time: item.time, [vYear]: item.val }]);
        });
        setVYear(newData.name);
      } else {
        setDataYear([]);
        setVYear("--");
      }
    }
  };

  const handleModify = (e, type) => {
    const id = e.currentTarget.id;
    var arr = id.split("_");
    const mod = document.getElementById(arr[0] + "_Modify");
    mod.style.display = type;
  };

  const handleEdit = (e) => { console.log("sua") };

  const [snlogger, setSnlogger] = useState("");

  const handleDelete = (e) => {
    popupState.value = true;
    setSnlogger(e.currentTarget.id);
  };

  useEffect(() => {
    // filter data AlertTable
    open.value = dataAlert.filter((item) => item.status == true);
    close.value = dataAlert.filter((item) => item.status == false);
    tabLableAlert.value = listAlertTab[0].name;

    // data InverterTable
    setTempInverter([]);
    deviceData.value.map((item) => {
      const db = Inverter.value.find((data) => data.SN == item.inverterSN);
      setTempInverter((old) => [...old, db]);
    });

    // data Day
    const newDataDay = dbDay.find((item) => item.date === moment(new Date()).format("DD/MM/YYYY"));
    if (newDataDay) {
      let vDay = newDataDay.name;
      setDataDay([]);
      newDataDay.data.map((item) => {
        setDataDay((old) => [...old, { time: item.time, [vDay]: item.val }]);
      });
      setVDay(newDataDay.name);
    }

    //data Month
    const newDataMonth = dbMonth.find((item) => item.month === moment(new Date()).format("MM/YYYY"));
    if (newDataMonth) {
      let vMonth = newDataMonth.name;
      setDataMonth([]);
      newDataMonth.data.map((item) => {
        setDataMonth((old) => [...old, { time: item.time, [vMonth]: item.val }]);
      });
      setVMonth(newDataMonth.name);
    }

    //data Year
    const newData = dbYear.find((item) => item.year === moment(new Date()).format("YYYY"));
    if (newData) {
      let vYear = newData.name;
      setDataYear([]);
      newData.data.map((item) => {
        setDataYear((old) => [...old, { time: item.time, [vYear]: item.val }]);
      });
      setVYear(newData.name);
    }

    //data Total
    dbTotal.map((item) => {
      let vTotal = item.name;
      setDataTotal([]);
      item.data.map((item) => {
        setDataTotal((old) => [...old, { time: item.time, [vTotal]: item.val }]);
      });
      setVTotal(item.name);
    });

    //data Logger
    const getLogger = async (plantid) => {
      let d = await callApi('post', host.DATA + '/getLogger', { plantid: plantid })
      // setTemp(d)
      temp.value = d;
      console.log(d)
      let _invt = {}
      d.map(async (item) => {

        const res = await invtCloud('{"deviceCode":"' + item.sn + '"}', Token.value.token);
        console.log(res)
        if (res.ret === 0) {
          //console.log(res.data)
          setInvt(pre => ({ ...pre, [item.sn]: res.data }))

        } else {
          setInvt(pre => ({ ...pre, [item.sn]: {} }))
        }

      })
      //setInvt(_invt)
    };


    getLogger(projectData.value.plantid);

    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    console.log("Invt", invt)
    coalsave.value.value = 0;
    temp.value.map(async (item) => {
      const type = (item.data.pro_3.type);
      const cal = JSON.parse(item.data.pro_3.cal);
      let num = [];


      let d = JSON.parse(item.data.pro_3.register);
      let e = [invt[item.sn]?.[d[0]] || 0, invt[item.sn]?.[d[1]] || 0];

      const convertToDoublewordAndFloat = (word, type) => {
        var doubleword = ((word[1]) << 16) | (word[0]);
        var buffer = new ArrayBuffer(4);
        var intView = new Int32Array(buffer);
        var floatView = new Float32Array(buffer);
        intView[0] = doubleword;
        var float_value = floatView[0];

        return type === "int" ? parseFloat(doubleword * cal).toFixed(2) : parseFloat(float_value * cal).toFixed(2) || 0;
      }

      let view32bit = convertToDoublewordAndFloat(e, "int");
      //let result = parseFloat(Number(coalsave.value.value) + Number(view32bit)).toFixed(2)
      coalsave.value  ={ 
        ...coalsave.value,
        value: parseFloat(Number(coalsave.value.value) + Number(view32bit)).toFixed(2)
      }
      

    })
  }, [invt]);

  return (
    <>
      <div className="DAT_ProjectData">
        {isMobile.value ? (
          <div className="DAT_ProjectData_Header">
            {(() => {
              switch (view) {
                case "dashboard":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDashboard">
                      <div style={{ fontSize: 22, paddingBottom: 5 }}>
                        {tit[view]}
                      </div>

                      <div style={{ color: "grey", fontSize: 14 }}>
                        Cập nhật lần cuối {projectData.value.lastupdate}
                      </div>
                    </div>
                  );
                case "device":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDevice">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                case "alert":
                  return (
                    <div className="DAT_ProjectData_Header_LeftAlert">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                default:
                  <></>;
              }
            })()}

            <div className="DAT_ProjectData_Header_Right">
              <div className="DAT_ProjectData_Header_Right_More"
                onClick={() => (dropState.value = !dropState.value)}
              >
                <IoMenu size={20} color="white" />
              </div>
              <div className="DAT_ProjectData_Header_Right_Close">
                <RxCross2
                  size={20}
                  color="white"
                  onClick={() => (plantState.value = "default")}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="DAT_ProjectData_Header">
            {(() => {
              switch (view) {
                case "dashboard":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDashboard">
                      <div style={{ fontSize: 22, marginBottom: "8px" }}>
                        {tit[view]}
                      </div>

                      <div style={{ color: "grey", fontSize: 14 }}>
                        Cập nhật lần cuối {projectData.value.lastupdate}
                      </div>
                    </div>
                  );
                case "device":
                  return (
                    <div className="DAT_ProjectData_Header_LeftDevice">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                case "alert":
                  return (
                    <div className="DAT_ProjectData_Header_LeftAlert">
                      <div style={{ fontSize: 22 }}>{tit[view]}</div>
                    </div>
                  );
                default:
                  <></>;
              }
            })()}

            <div className="DAT_ProjectData_Header_Right">
              <div className="DAT_ProjectData_Header_Right_Add" style={{ display: view === "device" ? "block" : "none" }}>
                <button
                  id="add"
                  onClick={() => popupAddGateway.value = true}
                >
                  Thêm
                </button>
              </div>
              <div className="DAT_ProjectData_Header_Right_More">
                <BsThreeDotsVertical
                  size={20}
                  color="#9e9e9e"
                  onClick={() => (dropState.value = !dropState.value)}
                />
              </div>
              <div className="DAT_ProjectData_Header_Right_Close">
                <RxCross2
                  size={20}
                  color="white"
                  onClick={() => (plantState.value = "default")}
                />
              </div>
            </div>
          </div>
        )}

        {(() => {
          switch (view) {
            case "dashboard":
              return (
                <div className="DAT_ProjectData_Dashboard">
                  <div className="DAT_ProjectData_Dashboard_Data">
                    <div className="DAT_ProjectData_Dashboard_Data_Left">
                      <div className="DAT_ProjectData_Dashboard_Data_Left_Img">
                        <img src="/dat_picture/solar_panel.png" alt="" />
                      </div>

                      <div className="DAT_ProjectData_Dashboard_Data_Left_Info">
                        <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Địa chỉ
                          </div>
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content">
                            {projectData.value.addr}
                          </div>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Trạng thái
                          </div>
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                            style={{ textAlign: "right" }}
                          >
                            {projectData.value.state === 1 ? (
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

                        <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                          style={{ marginBottom: "16px" }}
                        >
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Loại dự án
                          </div>
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                            style={{ textAlign: "right" }}
                          >
                            {projectData.value.planttype === "industry" ? (
                              <>Nhà máy</>
                            ) : (
                              <>Hộ dân</>
                            )}
                          </div>
                        </div>

                        {/* <div
                    className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr"
                    style={{ marginBottom: "16px" }}
                  >
                    <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                      Loại Hệ Thống
                    </div>
                    <div
                      className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                      style={{ textAlign: "right" }}
                    >
                      --
                    </div>
                  </div> */}

                        <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr">
                          <div className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Title">
                            Số điện thoại
                          </div>
                          <div
                            className="DAT_ProjectData_Dashboard_Data_Left_Info_Addr_Content"
                            style={{ textAlign: "right" }}
                          >
                            {projectData.value.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_ProjectData_Dashboard_Data_Center">
                      <div className="DAT_ProjectData_Dashboard_Data_Center_Tit">
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="graph"
                          style={{
                            color: nav === "graph" ? color.cur : color.pre,
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Đồ thị
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="production"
                          style={{
                            color: nav === "production" ? color.cur : color.pre,
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Sản lượng phát điện
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="consumption"
                          style={{
                            color:
                              nav === "consumption" ? color.cur : color.pre,
                            display:
                              projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Điện năng tiêu thụ
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="grid"
                          style={{
                            color: nav === "grid" ? color.cur : color.pre,
                            display:
                              projectData.value.plantmode === "grid"
                                ? "none"
                                : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Lưới điện
                        </div>
                        <div className="DAT_ProjectData_Dashboard_Data_Center_Tit_Item"
                          id="battery"
                          style={{
                            color: nav === "battery" ? color.cur : color.pre,
                            display:
                              projectData.value.plantmode === "grid" ||
                                projectData.value.plantmode === "consumption"
                                ? "none"
                                : "block",
                          }}
                          onClick={(e) => handleNav(e)}
                        >
                          Ắc quy
                        </div>
                      </div>

                      {(() => {
                        switch (nav) {
                          case "graph":
                            return <Graph type={projectData.value.plantmode} />;
                          case "production":
                            return <Production data={temp.value} invt={invt} />;
                          case "consumption":
                            return <Consumption data={temp.value} invt={invt} />;
                          case "grid":
                            return <Grid data={temp.value} invt={invt} />;
                          case "battery":
                            return <Battery data={temp.value} invt={invt} />;
                          default:
                            <></>;
                        }
                      })()}
                    </div>

                    <div className="DAT_ProjectData_Dashboard_Data_Right">
                      <div className="DAT_ProjectData_Dashboard_Data_Right_Weather">
                        <Weather />
                      </div>
                    </div>
                  </div>

                  <div className="DAT_ProjectData_Dashboard_History">
                    <div className="DAT_ProjectData_Dashboard_History_Tit">
                      <div className="DAT_ProjectData_Dashboard_History_Tit_Left">
                        Lịch sử phát điện
                      </div>

                      <div className="DAT_ProjectData_Dashboard_History_Tit_Right">
                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date">
                          <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="date"
                            style={{
                              borderRight: "solid 1px rgb(199, 199, 199)",
                              color:
                                dateType === "date" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            Ngày
                          </div>
                          <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="month"
                            style={{
                              borderRight: "solid 1px rgb(199, 199, 199)",
                              color:
                                dateType === "month" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            Tháng
                          </div>
                          <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="year"
                            style={{
                              borderRight: "solid 1px rgb(199, 199, 199)",
                              color:
                                dateType === "year" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            Năm
                          </div>
                          <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Date_Item"
                            id="total"
                            style={{
                              color:
                                dateType === "total" ? color.cur : color.pre,
                            }}
                            onClick={(e) => handleDate(e)}
                          >
                            Tổng
                          </div>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Config">
                          <button
                            onClick={(e) => {
                              handleShowConfig(e);
                              setDropConfig(!dropConfig);
                            }}
                          >
                            {configname}
                          </button>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_History_Tit_Right_Export">
                          <button>Xuất Báo Cáo</button>
                        </div>

                        <DatePicker
                          onChange={(date) => handleChart(date)}
                          showMonthYearPicker={
                            dateType === "date" ? false : true
                          }
                          showYearPicker={
                            dateType === "date" || dateType === "month"
                              ? false
                              : true
                          }
                          disabled={dateType === "total" ? true : false}
                          customInput={
                            <button className="DAT_CustomPicker">
                              <span>{d[dateType]}</span>
                              <IoCalendarOutline color="gray" />
                            </button>
                          }
                        />
                      </div>
                    </div>

                    {(() => {
                      switch (dateType) {
                        case "date":
                          return <Day data={dataDay} v={vDay} />;
                        case "month":
                          return <Month data={dataMonth} v={vMonth} />;
                        case "year":
                          return <Year data={dataYear} v={vYear} />;
                        case "total":
                          return <Total data={dataTotal} v={vTotal} />;
                        default:
                          <></>;
                      }
                    })()}

                    <div className="DAT_ProjectData_Dashboard_History_SubConfig"
                      style={{
                        height: dropConfig ? "500px" : "0px",
                        transition: "0.5s",
                      }}
                    >
                      {dropConfig ? (
                        <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown"
                          style={{
                            height: dropConfig ? "200px" : "0px",
                            transition: "0.5s",
                          }}
                        >
                          <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Search">
                            <input
                              type="text"
                              placeholder="Search by parameter name"
                            />
                            <CiSearch size={20} />
                          </div>
                          <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item">
                            <table className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table">
                              <tbody>
                                <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                    Production
                                  </th>
                                  <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input id="Production" type="checkbox" />
                                      <label htmlFor="Production">
                                        Production
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr">
                                  <th className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Th">
                                    Environment
                                  </th>
                                  <td className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td">
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input id="Weather" type="checkbox" />
                                      <label htmlFor="Weather">Weather</label>
                                    </div>
                                    <div className="DAT_ProjectData_Dashboard_History_SubConfig_Dropdown_Item_Table_Tr_Td_Checkbox">
                                      <input id="Temperature" type="checkbox" />
                                      <label htmlFor="Temperature">
                                        Temperature
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="DAT_ProjectData_Dashboard_More">
                    <div className="DAT_ProjectData_Dashboard_More_Left">
                      <div className="DAT_ProjectData_Dashboard_More_Left_Tit">
                        <span>Trình tự công việc</span>
                        <div className="DAT_ProjectData_Dashboard_More_Left_Tit_Button">
                          <IoArrowForward />
                        </div>
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Left_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item">
                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Value"
                            style={{ textAlign: "center", fontSize: "32px", color: "#048FFF" }}
                          >
                            0
                          </div>

                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Detail"
                            style={{ textAlign: "center", fontSize: "14px", color: "grey", marginTop: "8px" }}
                          >
                            Đang Thực Hiện
                          </div>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item">
                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Value"
                            style={{ textAlign: "center", fontSize: "32px", color: "#41D068" }}
                          >
                            0
                          </div>

                          <div className="DAT_ProjectData_Dashboard_More_Left_Content_Item_Detail"
                            style={{ textAlign: "center", fontSize: "14px", color: "grey", marginTop: "8px" }}
                          >
                            Hoàn Tất
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="DAT_ProjectData_Dashboard_More_Right">
                      <div className="DAT_ProjectData_Dashboard_More_Right_Tit">
                        Môi trường và lợi ích kinh tế
                      </div>

                      <div className="DAT_ProjectData_Dashboard_More_Right_Content">
                        <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col">
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <MdPermDataSetting size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                Lượng than tiết kiệm
                              </div>
                              <div>{parseFloat(coalsave.value.value * coalsave.value.ef).toFixed(2)}
                                &nbsp;
                                <span style={{ color: "grey", fontSize: "12px" }}>
                                  t
                                </span></div>
                            </div>
                          </div>
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <FaTree size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                Sản lượng cây trồng
                              </div>
                              <div>{parseFloat(coalsave.value.value * coalsave.value.tree).toFixed(2)}
                                &nbsp;
                                <span style={{ color: "grey", fontSize: "12px" }}>
                                  Cây
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col">
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <IoIosCloud size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                Lượng CO₂ tiết giảm
                              </div>
                              <div>{parseFloat(coalsave.value.value * coalsave.value.avr).toFixed(2)}
                                &nbsp;
                                <span style={{ color: "grey", fontSize: "12px" }}>
                                  t
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item">
                            <div className="DAT_ProjectData_Dashboard_More_Right_Content_Col_Item_Icon">
                              <RiMoneyCnyCircleFill size={24} color="#6495ed" />
                            </div>
                            <div>
                              <div style={{ fontSize: "14px", color: "grey" }}>
                                Tổng doanh thu
                              </div>
                              <div>{parseFloat((coalsave.value.value * projectData.value.price) / 1000).toFixed(2)}
                                &nbsp;
                                <span style={{ color: "grey", fontSize: "12px" }}>
                                  k{projectData.value.currency}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            case "device":
              return (
                <div className="DAT_ProjectData_Device">
                  <div className="DAT_ProjectData_Device_Analysis">
                    {/* <div className="DAT_ProjectData_Device_Analysis_Func">
                      <div className="DAT_ProjectData_Device_Analysis_Func_Select">
                        <select>
                          <option hidden>Trạng thái</option>
                          <option>Tất cả</option>
                          <option>Online</option>
                          <option>Cảnh báo</option>
                          <option>Offline</option>
                        </select>
                        <select>
                          <option hidden>Hiệu suất</option>
                          <option>Tắt</option>
                          <option>Rất thấp</option>
                          <option>Thấp</option>
                          <option>Bình thường</option>
                        </select>
                      </div>
                      <button
                        id="add"
                        onClick={() => {popupAddGateway.value = true}}
                      >
                        Thêm
                      </button>
                    </div> */}

                    <div className="DAT_ProjectData_Device_Analysis_Table">
                      {isMobile.value ? (
                        <div className="DAT_Toollist_Tab_Mobile">
                          <button className="DAT_Toollist_Tab_Mobile_content"
                            onClick={() => (tabMobile.value = !tabMobile.value)}
                          >
                            <span> {tabLable.value}</span>
                            {tabMobile.value ? (
                              <IoIosArrowDown />
                            ) : (
                              <IoIosArrowForward />
                            )}
                          </button>
                          <div className="DAT_Toollist_Tab_Mobile_list">
                            {listDeviceTab.map((item, i) => {
                              return (
                                <div className="DAT_Toollist_Tab_Mobile_list_item"
                                  style={{ display: tabMobile.value ? "block" : "none" }}
                                  key={"tabmobile_" + i}
                                  id={item.id}
                                  onClick={(e) => handleTabMobileDevice(e)}
                                >
                                  {i + 1}: {item.name}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="DAT_Toollist_Tab">
                          {listDeviceTab.map((item, i) => {
                            return tab.value === item.id ? (
                              <div className="DAT_Toollist_Tab_main"
                                key={"tab_" + i}
                              >
                                <p className="DAT_Toollist_Tab_main_left"></p>
                                <span className="DAT_Toollist_Tab_main_content1"
                                  id={item.id}
                                  style={{ backgroundColor: "White", color: "black", borderRadius: "10px 10px 0 0" }}
                                  onClick={(e) => (tab.value = item.id)}
                                >
                                  {item.name}
                                </span>
                                <p className="DAT_Toollist_Tab_main_right"></p>
                              </div>
                            ) : (
                              <span className="DAT_Toollist_Tab_main_content2"
                                key={"tab_" + i}
                                id={item.id}
                                style={{ backgroundColor: "#dadada" }}
                                onClick={(e) => (tab.value = item.id)}
                              >
                                {item.name}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="DAT_ProjectData_Device_Analysis_Table_Content">
                        {(() => {
                          switch (tab.value) {
                            case "inverter":
                              return (
                                <DataTable className="DAT_Table_Device"
                                  columns={columnInverter}
                                  data={tempInverter}
                                  pagination
                                  paginationComponentOptions={paginationComponentOptions}
                                  fixedHeader={true}
                                  noDataComponent={<Empty />}
                                />
                              );
                            case "meter":
                              return (
                                <DataTable className="DAT_Table_Device"
                                  columns={columnMeter}
                                  data={dataMeter}
                                  pagination
                                  paginationComponentOptions={paginationComponentOptions}
                                  fixedHeader={true}
                                  noDataComponent={<Empty />}
                                />
                              );
                            case "logger":
                              return (
                                <DataTable className="DAT_Table_Device"
                                  columns={columnLogger}
                                  data={temp.value}
                                  pagination
                                  paginationComponentOptions={paginationComponentOptions}
                                  fixedHeader={true}
                                  noDataComponent={<Empty />}
                                />
                              );
                            default:
                              return <></>;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            case "alert":
              return (
                <div className="DAT_ProjectData_Alert">
                  <div className="DAT_ProjectData_Alert_Data">
                    {isMobile.value ? (
                      <div className="DAT_Toollist_Tab_Mobile">
                        <button
                          className="DAT_Toollist_Tab_Mobile_content"
                          onClick={() =>
                            (tabMobileAlert.value = !tabMobileAlert.value)
                          }
                        >
                          <span> {tabLableAlert.value}</span>
                          {tabMobileAlert.value ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowForward />
                          )}
                        </button>
                        <div className="DAT_Toollist_Tab_Mobile_list">
                          {listAlertTab.map((item, i) => {
                            return (
                              <div
                                className="DAT_Toollist_Tab_Mobile_list_item"
                                style={{
                                  display: tabMobileAlert.value
                                    ? "block"
                                    : "none",
                                }}
                                key={"tabmobile_" + i}
                                id={item.id}
                                onClick={(e) => handleTabMobileAlert(e)}
                              >
                                {i + 1}: {item.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="DAT_Toollist_Tab">
                        {listAlertTab.map((item, i) => {
                          return tabAlert.value === item.id ? (
                            <div
                              className="DAT_Toollist_Tab_main"
                              key={"tab_" + i}
                            >
                              <p className="DAT_Toollist_Tab_main_left"></p>
                              <span
                                className="DAT_Toollist_Tab_main_content1"
                                id={item.id}
                                style={{
                                  backgroundColor: "White",
                                  color: "black",
                                  borderRadius: "10px 10px 0 0",
                                }}
                                onClick={(e) => (tabAlert.value = item.id)}
                              >
                                {item.name}
                              </span>
                              <p className="DAT_Toollist_Tab_main_right"></p>
                            </div>
                          ) : (
                            <span
                              className="DAT_Toollist_Tab_main_content2"
                              key={"tab_" + i}
                              id={item.id}
                              style={{ backgroundColor: "#dadada" }}
                              onClick={(e) => (tabAlert.value = item.id)}
                            >
                              {item.name}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div className="DAT_ProjectData_Alert_Data_Table">
                      {(() => {
                        switch (tabAlert.value) {
                          case "all":
                            return (
                              <DataTable
                                className="DAT_Table_Alert"
                                columns={columnAlert}
                                data={dataAlert}
                                pagination
                                paginationComponentOptions={
                                  paginationComponentOptions
                                }
                                fixedHeader={true}
                                noDataComponent={<Empty />}
                              />
                            );
                          case "open":
                            return (
                              <DataTable
                                className="DAT_Table_Alert"
                                columns={columnAlert}
                                data={open.value}
                                pagination
                                paginationComponentOptions={
                                  paginationComponentOptions
                                }
                                fixedHeader={true}
                                noDataComponent={<Empty />}
                              />
                            );
                          case "closed":
                            return (
                              <DataTable
                                className="DAT_Table_Alert"
                                columns={columnAlert}
                                data={close.value}
                                pagination
                                paginationComponentOptions={
                                  paginationComponentOptions
                                }
                                fixedHeader={true}
                                noDataComponent={<Empty />}
                              />
                            );
                          default:
                            return <></>;
                        }
                      })()}
                    </div>
                  </div>
                </div>
              );
            default:
              <></>;
          }
        })()}
      </div >

      {
        popupAddGateway.value ? (
          <div className="DAT_AddGatewayPopup">
            <AddGateway data={temp.value} />
          </div>
        ) : (
          <></>
        )
      }

      {
        popupState.value ? (
          <div className="DAT_DevicePopup">
            <Popup plantid={projectData.value.plantid} type="logger" sn={snlogger} data={temp.value} />
          </div>
        ) : (<> </>)
      }

      {/* {raiseBoxState.value.status ? (
        <div className="DAT_RaiseBoxPopup">
          <RaiseBox state={raiseBoxState.value.text} />
        </div>
      ) : (
        <></>
      )} */}

      {
        isMobile.value ? (
          <>
            {dropState.value ? (
              <div className="DAT_ProjectDataDrop">
                <div className="DAT_ProjectDataDrop_Dashboard"
                  id="dashboard"
                  onClick={(e) => handleView(e)}
                >
                  <AiOutlineDashboard size={20} color="white" />
                </div>
                <div className="DAT_ProjectDataDrop_Device"
                  id="device"
                  onClick={(e) => handleView(e)}
                >
                  <BsMenuButtonWide size={20} color="white" />
                </div>
                <div className="DAT_ProjectDataDrop_Alert"
                  id="alert"
                  onClick={(e) => handleView(e)}
                >
                  <GoAlertFill size={20} color="white" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {dropState.value ? (
              <div className="DAT_ProjectDataDrop">
                <div className="DAT_ProjectDataDrop_Item"
                  id="dashboard"
                  style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                  onClick={(e) => handleView(e)}
                >
                  Giám sát
                </div>
                <div className="DAT_ProjectDataDrop_Item"
                  id="device"
                  style={{ borderBottom: "solid 1px rgb(199, 199, 199)" }}
                  onClick={(e) => handleView(e)}
                >
                  Thiết bị
                </div>
                {/* <div className="DAT_ProjectDataDrop_Item"
                id="alert"
                onClick={() => handleWarn()}
              >
                Cảnh báo
              </div> */}
              </div>
            ) : (
              <></>
            )}
          </>
        )
      }
    </>
  );
}

export default ProjectData;

// Thẻ Data
const Graph = (props) => {
  const path = document.querySelector(".infinity");
  const circle = document.querySelector(".circle");
  const val = { distance: 0 };

  useEffect(() => {
    console.log(props.type);
  }, []);

  // Create an object that gsap can animate
  // Create a tween
  // gsap.to(val, {
  //   // Animate from distance 0 to the total distance
  //   distance: path.getTotalLength(),
  //   // Loop the animation
  //   repeat: -1,
  //   // Make the animation lasts 5 seconds
  //   duration: 5,
  //   // Function call on each frame of the animation
  //   onUpdate: () => {
  //     // Query a point at the new distance value
  //     const point = path.getPointAtLength(val.distance);
  //     // Update the circle coordinates
  //     circle.setAttribute('cx', point.x);
  //     circle.setAttribute('cy', point.y);
  //   }
  // });

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Graph">
      {/* <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_Solar">
        <img src="/dat_picture/solar.png"></img>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_Load">
        <img src="/dat_picture/load.png"></img>
</div> */}
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P1">
          <svg width="120px" height="160px" version="1.1">
            <linearGradient
              id="style-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              className="path"
              d="M 105 7 L 25 7 C 14 7 7 14 7 25 L 7 155"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 105 7 L 25 7 C 14 7 7 14 7 25 L 7 155"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>
          {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line1_Ball"></div> */}
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2_Solar">
            <img src="/dat_picture/solar.png"></img>
          </div>
          <svg width="70px" height="40px" version="1.1">
            <linearGradient
              id="style-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              d="M 35 7 L 35 35"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 35 7 L 35 35"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P2_Load">
            <img src="/dat_picture/load.png"></img>
          </div>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineTop_P3">
          <svg width="120px" height="160px" version="1.1">
            <linearGradient
              id="style-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              d="M 10 7 L 90 7 C 101 7 109 14 109 25 L 109 155"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-2')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 10 7 L 90 7 C 101 7 109 14 109 25 L 109 155"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>
          {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line2_Ball"></div> */}
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_Pin">
          <img src="/dat_picture/battery.png"></img>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_T">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_P1">
              <svg width="120px" height="45px" version="1.1">
                <linearGradient
                  id="style-1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
                  <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
                </linearGradient>
                <path
                  className="path"
                  d="M 15 36 L 90 36 C 101 36 109 29 109 22 L 109 7"
                  style={{
                    width: "100%",
                    height: "100%",
                    fill: "none",
                    stroke: "url('#style-1')",
                    strokeWidth: "3",
                  }}
                ></path>
                <circle
                  r={5}
                  style={{
                    fill: "none",
                    stroke: "url('#style-1')",
                    strokeWidth: "3",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                >
                  <animateMotion
                    path="M 10 36 L 90 36 C 101 36 109 29 109 22 L 109 7"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animateMotion>
                </circle>
              </svg>
              {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line1_Ball"></div> */}
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_G_P2">
              <svg width="110px" height="45px" version="1.1">
                <linearGradient
                  id="style-2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
                  <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
                </linearGradient>
                <path
                  d="M 100 36 L 25 36 C 14 36 7 28 7 23 L 7 7"
                  style={{
                    width: "100%",
                    height: "100%",
                    fill: "none",
                    stroke: "url('#style-2')",
                    strokeWidth: "3",
                  }}
                ></path>
                <circle
                  r={5}
                  style={{
                    fill: "none",
                    stroke: "url('#style-2')",
                    strokeWidth: "3",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                >
                  <animateMotion
                    path="M 105 36 L 25 36 C 14 36 7 28 7 23 L 7 7"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animateMotion>
                </circle>
              </svg>
              {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line2_Ball"></div> */}
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom_G_B">
            <svg width="220px" height="25px" verssion="1.1">
              <linearGradient
                id="style-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
                <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
              </linearGradient>
              <path
                className="path"
                d="M 220 7 L 14 7"
                style={{
                  width: "100%",
                  height: "100%",
                  fill: "none",
                  stroke: "url('#style-1')",
                  strokeWidth: "3",
                }}
              ></path>
              <circle
                r={5}
                style={{
                  fill: "none",
                  stroke: "url('#style-1')",
                  strokeWidth: "3",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              >
                <animateMotion
                  path="M 220 7 L 14 7"
                  dur="2s"
                  repeatCount="indefinite"
                ></animateMotion>
              </circle>
            </svg>
            {/* <div className="DAT_ProjectData_Body_Data_Center_Graph_Line1_Ball"></div> */}
          </div>
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineMid_Grid">
          <img src="/dat_picture/grid.png"></img>
        </div>
      </div>
      {/* <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Graph_LineBottom_P">

          <svg width="250px" height="45px" verssion="1.1">
            <linearGradient
              id="style-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgb(65, 109, 228)"></stop>
              <stop offset="100%" stopColor="rgb(247, 162, 25)"></stop>
            </linearGradient>
            <path
              className="path"
              d="M 230 7 L 14 7"
              style={{
                width: "100%",
                height: "100%",
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
              }}
            ></path>
            <circle
              r={5}
              style={{
                fill: "none",
                stroke: "url('#style-1')",
                strokeWidth: "3",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <animateMotion
                path="M 230.229 8 L 10.117 8"
                dur="2s"
                repeatCount="indefinite"
              ></animateMotion>
            </circle>
          </svg>

        </div>
      </div> */}
    </div>
  );
};

const Production = (props) => {
  const [data, setData] = useState(props.invt);
  const [production, setProduction] = useState(0);
  const [dailyproduction, setDailyproduction] = useState(0);
  const [totalproduction, setTotalproduction] = useState(0);
  const result = getDaysInCurrentMonth();


  useEffect(() => {
    setProduction(0);
    props.data.map((item) => {
      const type = (item.data.pro_1.type);
      const cal = JSON.parse(item.data.pro_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.pro_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setProduction((old) => parseFloat(old + sum / 1000).toFixed(2));
          break;
        case "word":
          let d = JSON.parse(item.data.pro_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setProduction((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn][item.data.pro_1.register]) * parseFloat(item.data.pro_1.cal);
          setProduction((old) => old + num);
          break;
      }
    });

    setDailyproduction(0);
    props.data.map((item) => {
      const type = (item.data.pro_2.type);
      const cal = JSON.parse(item.data.pro_2.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.pro_2.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setDailyproduction((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.pro_2.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setDailyproduction((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.pro_2.register] || 0) * parseFloat(item.data.pro_2.cal);
          setDailyproduction((old) => parseFloat(old + num).toFixed(2));
          break;
      }
    });

    setTotalproduction(0);
    props.data.map((item) => {
      const type = (item.data.pro_3.type);
      const cal = JSON.parse(item.data.pro_3.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.pro_3.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setTotalproduction((old) => parseFloat(old + sum / 1000).toFixed(2));
          break;
        case "word":
          let d = JSON.parse(item.data.pro_3.register);
          let e = [data[item.sn]?.[d[0]] || 0, data[item.sn]?.[d[1]] || 0];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? parseFloat(doubleword * cal).toFixed(2) : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "int");
          setTotalproduction((old) => parseFloat(old + view32bit).toFixed(2));

          break;
        default:
          num = parseFloat(data[item.sn][item.data.pro_3.register]) * parseFloat(item.data.pro_3.cal);
          setTotalproduction((old) => old + num);
          break;
      }
    });

  }, [props.data]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Production">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data"
            style={{ fontSize: "28px" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value">
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value_num">
                {parseFloat((production / projectData.value.capacity) * 100).toFixed(2)}
              </div>
              <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Chart_Data_value_unit">%</div>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Data_Detail">
          <div style={{ marginBottom: "8px", color: "grey" }}>
            Công suất tức thời
          </div>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {production}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              kW
            </span>
          </div>
          <div style={{ borderBottom: "solid 1px rgb(199, 199, 199)", width: "50%", marginBottom: "8px" }} />
          <div style={{ marginBottom: "8px", color: "grey" }}>
            Công suất lắp đặt
          </div>
          <div>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {projectData.value.capacity}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }} >
              kWp
            </span>
          </div>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgba(68, 186, 255, 0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Sản lượng ngày
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {dailyproduction}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              kWh
            </span>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgb(255, 68, 68,0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Sản lượng tháng
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {/* {parseFloat(dailyproduction * result).toFixed(2)} */}?
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              kWh
            </span>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgba(87, 250, 46, 0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Sản lượng năm
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {/* {parseFloat((dailyproduction * result) * 12).toFixed(2)} */}?
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              kWh
            </span>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item"
          style={{ backgroundColor: "rgba(255, 248, 51, 0.2)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Tit">
            Tổng sản lượng
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Production_Total_Item_Data">
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {totalproduction}
            </span>
            &nbsp;
            <span style={{ fontSize: "12px", color: "grey" }}>
              kWh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Consumption = (props) => {
  const [data, setData] = useState(props.invt);
  const [consumption, setConsumption] = useState(0);
  const [dailyconsumption, setDailyconsumption] = useState(0);
  const result = getDaysInCurrentMonth();

  useEffect(() => {
    setConsumption(0);
    props.data.map((item) => {
      const type = (item.data.con_1.type);
      const cal = JSON.parse(item.data.con_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.con_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setConsumption((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.con_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setConsumption((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.con_1.register] || 0) * parseFloat(item.data.con_1.cal);
          setConsumption((old) => old + num);
          break;
      }
    });

    setDailyconsumption(0);
    props.data.map((item) => {
      const type = (item.data.con_2.type);
      const cal = JSON.parse(item.data.con_2.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.con_2.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setDailyconsumption((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.con_2.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setDailyconsumption((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.con_2.register] || 0) * parseFloat(item.data.con_2.cal);
          setDailyconsumption((old) => old + num);
          break;
      }
    });
  }, [props.data]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Img">
          <img src="/dat_picture/load.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Data_Data">
          <span>
            Tiêu thụ
          </span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{consumption}</span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>
            kW
          </span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "rgb(245, 251, 255)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
              Tiêu thụ ngày
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {dailyconsumption}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item"
            style={{ backgroundColor: "rgb(246, 245, 255)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Tit">
              Tiêu thụ năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Left_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat((dailyconsumption * result) * 12).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right">
          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "rgb(255, 248, 247)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
              Tiêu thụ tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat(dailyconsumption * result).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>

          <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item"
            style={{ backgroundColor: "rgb(245, 250, 246)" }}
          >
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Tit">
              Tổng tiêu thụ
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Consumption_Total_Right_Item_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                ?
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Grid = (props) => {
  const [data, setData] = useState(props.invt);
  const [grid, setGrid] = useState(0);
  const [feedindailygrid, setFeedindailygrid] = useState(0);
  const [feedintotalgrid, setFeedintotalgrid] = useState(0);
  const [purchaseddailygrid, setPurchaseddailygrid] = useState(0);
  const [purchasedtotalgrid, setPurchasedtotalgrid] = useState(0);
  const result = getDaysInCurrentMonth();

  useEffect(() => {
    setGrid(0);
    props.data.map((item) => {
      const type = (item.data.grid_1.type);
      const cal = JSON.parse(item.data.grid_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.grid_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setGrid((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.grid_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setGrid((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.grid_1.register] || 0) * parseFloat(item.data.grid_1.cal);
          setGrid((old) => old + num);
          break;
      }
    });

    setFeedindailygrid(0);
    props.data.map((item) => {
      const type = (item.data.grid_in_1.type);
      const cal = JSON.parse(item.data.grid_in_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.grid_in_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setFeedindailygrid((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.grid_in_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setFeedindailygrid((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.grid_in_1.register] || 0) * parseFloat(item.data.grid_in_1.cal);
          setFeedindailygrid((old) => old + num);
          break;
      }
    });

    setFeedintotalgrid(0);
    props.data.map((item) => {
      const type = (item.data.grid_in_2.type);
      const cal = JSON.parse(item.data.grid_in_2.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.grid_in_2.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setFeedintotalgrid((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.grid_in_2.register);
          let e = [data[item.sn]?.[d[0]] || 0, data[item.sn]?.[d[1]] || 0];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setFeedintotalgrid((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.grid_in_2.register] || 0) * parseFloat(item.data.grid_in_2.cal);
          setFeedintotalgrid((old) => old + num);
          break;
      }
    });

    setPurchaseddailygrid(0);
    props.data.map((item) => {
      const type = (item.data.grid_out_1.type);
      const cal = JSON.parse(item.data.grid_out_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.grid_out_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setPurchaseddailygrid((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.grid_out_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setPurchaseddailygrid((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.grid_out_1.register] || 0) * parseFloat(item.data.grid_out_1.cal);
          setPurchaseddailygrid((old) => old + num);
          break;
      }
    });

    setPurchasedtotalgrid(0);
    props.data.map((item) => {
      const type = (item.data.grid_out_2.type);
      const cal = JSON.parse(item.data.grid_out_2.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.grid_out_2.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setPurchasedtotalgrid((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.grid_out_2.register);
          let e = [data[item.sn]?.[d[0]] || 0, data[item.sn]?.[d[1]] || 0];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setPurchasedtotalgrid((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.grid_out_2.register] || 0) * parseFloat(item.data.grid_out_2.cal);
          setPurchasedtotalgrid((old) => old + num);
          break;
      }
    });
  }, [props.data]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Grid">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Img">
          <img src="/dat_picture/grid.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Data_Data">
          <span>
            Lưới
          </span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
            {grid}
          </span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>
            W
          </span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit">
            Nạp vào
          </div>
          <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {feedindailygrid}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat(feedindailygrid * result).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat((feedindailygrid * result) * 12).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {feedintotalgrid}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Tit">
            Bán ra
          </div>
          <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {purchaseddailygrid}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat(purchaseddailygrid * result).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat((purchaseddailygrid * result) * 12).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Grid_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {purchasedtotalgrid}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Battery = (props) => {
  const [data, setData] = useState(props.invt);
  const [battery, setBattery] = useState(0);
  const [percent, setPercent] = useState(0);
  const [chargedailybattery, setChargedailybattery] = useState(0);
  const [dischargedailybattery, setDischargedailybattery] = useState(0);
  const result = getDaysInCurrentMonth();

  useEffect(() => {
    setBattery(0);
    props.data.map((item) => {
      const type = (item.data.bat_1.type);
      const cal = JSON.parse(item.data.bat_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.bat_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setBattery((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.bat_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setBattery((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.bat_1.register] || 0) * parseFloat(item.data.bat_1.cal);
          setBattery((old) => old + num);
          break;
      }
    });

    setPercent(0);
    props.data.map((item) => {
      const type = (item.data.bat_2.type);
      const cal = JSON.parse(item.data.bat_2.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.bat_2.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setPercent((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.bat_2.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setPercent((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.bat_2.register] || 0) * parseFloat(item.data.bat_2.cal);
          setPercent((old) => old + num);
          break;
      }
    });

    setChargedailybattery(0);
    props.data.map((item) => {
      const type = (item.data.bat_in_1.type);
      const cal = JSON.parse(item.data.bat_in_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.bat_in_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setChargedailybattery((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.bat_in_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setChargedailybattery((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.bat_in_1.register] || 0) * parseFloat(item.data.bat_in_1.cal);
          setChargedailybattery((old) => old + num);
          break;
      }
    });

    setDischargedailybattery(0);
    props.data.map((item) => {
      const type = (item.data.bat_out_1.type);
      const cal = JSON.parse(item.data.bat_out_1.cal);
      let num = [];

      switch (type) {
        case "sum":
          Object.entries(item.data.bat_out_1.register).map(([key, value]) => {
            let n = JSON.parse(value)
            num[key] = parseFloat(data[item.sn]?.[n[0]] || 0) * parseFloat(cal[0]) * parseFloat(data[item.sn]?.[n[1]] || 0) * parseFloat(cal[1]);
          });

          var sum = num.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0);

          setDischargedailybattery((old) => old + sum);
          break;
        case "word":
          let d = JSON.parse(item.data.bat_out_1.register);
          let e = [data[item.sn][d[0]], data[item.sn][d[1]]];

          const convertToDoublewordAndFloat = (word, type) => {
            var doubleword = ((word[1]) << 16) | (word[0]);
            var buffer = new ArrayBuffer(4);
            var intView = new Int32Array(buffer);
            var floatView = new Float32Array(buffer);
            intView[0] = doubleword;
            var float_value = floatView[0];

            return type === "int" ? doubleword * cal : parseFloat(float_value * cal).toFixed(2) || 0;
          }

          let view32bit = convertToDoublewordAndFloat(e, "float");
          setDischargedailybattery((old) => parseFloat(old) + parseFloat(view32bit));
          break;
        default:
          num = parseFloat(data[item.sn]?.[item.data.bat_out_1.register] || 0) * parseFloat(item.data.bat_out_1.cal);
          setDischargedailybattery((old) => old + num);
          break;
      }
    });
  }, [props.data]);

  return (
    <div className="DAT_ProjectData_Dashboard_Data_Center_Battery">
      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Img">
          <img src="/dat_picture/battery.png" alt="" />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Status">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "4px" }}>
            <span>
              Sạc
            </span>
            <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
              {percent}
            </span>
            <span style={{ fontSize: "12px", color: "grey" }}>
              %
            </span>
          </div>
          <LiaLongArrowAltLeftSolid size={30} />
        </div>
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Data_Data">
          <span>
            Pin
          </span>
          &nbsp;
          <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>{battery}</span>
          &nbsp;
          <span style={{ fontSize: "12px", color: "grey" }}>
            W
          </span>
        </div>
      </div>

      <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row">
        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit">
            Sạc điện
          </div>
          <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {chargedailybattery}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat(chargedailybattery * result).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat((chargedailybattery * result) * 12).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                ?
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
        </div>

        <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left"
          style={{ backgroundColor: "rgb(245, 251, 255)" }}
        >
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Tit">
            Phóng điện
          </div>
          <div style={{ borderLeft: "solid 1px rgb(231, 231, 231)" }} />
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Hôm nay
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {dischargedailybattery}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tháng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat(dischargedailybattery * result).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Năm
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                {parseFloat((dischargedailybattery * result) * 12).toFixed(2)}
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
          <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data">
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Tit">
              Tổng
            </div>
            <div className="DAT_ProjectData_Dashboard_Data_Center_Battery_Row_Left_Data_Data">
              <span style={{ fontWeight: "650", fontFamily: "sans-serif" }}>
                ?
              </span>
              &nbsp;
              <span style={{ fontSize: "12px", color: "grey" }}>
                kWh
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Thẻ Chart
const Day = (props) => {
  const [data, setData] = useState([]);
  const [v, setV] = useState("--");

  useEffect(() => {
    setData(props.data);
    setV(props.v);
  }, [props.data, props.v]);

  return (
    <div className="DAT_ProjectData_Dashboard_History_Day">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng ngày: 24.3 kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        <ResponsiveContainer style={{ width: "100%", height: "100%", marginLeft: "-20px" }}>
          <AreaChart width={100} height={300} data={data}>
            <defs>
              <linearGradient id="colorday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Area type="monotone" dataKey={v} stroke="#8884d8" fillOpacity={1} fill="url(#colorday)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Month = (props) => {
  const [data, setData] = useState([]);
  const [v, setV] = useState("--");

  useEffect(() => {
    setData(props.data);
    setV(props.v);
  }, [props.data, props.v]);

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <rect x={x} y={y} width={width} height={height} fill={"rgb(4,143,255)"} rx="3" ry="3" opacity="1" />
    );
  };

  return (
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          kWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng tháng: 775.327 kWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        <ResponsiveContainer style={{ width: "100%", height: "100%", marginLeft: "-20px" }}>
          <BarChart width={150} height={200} data={data}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Legend />
            <Bar shape={<TriangleBar />} dataKey={v} fill="#6495ed" barSize={15} legendType="circle" style={{ fill: "#6495ed" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Year = (props) => {
  const [data, setData] = useState([]);
  const [v, setV] = useState("--");

  useEffect(() => {
    setData(props.data);
    setV(props.v);
  }, [props.data, props.v]);

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <rect x={x} y={y} width={width} height={height} fill={"rgb(4,143,255)"} rx="3" ry="3" opacity="1" />
    );
  };

  return (
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          MWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng năm: 1.69 MWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        <ResponsiveContainer style={{ width: "100%", height: "100%", marginLeft: "-20px" }}>
          <BarChart width={150} height={200} data={data}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Legend />
            <Bar shape={<TriangleBar />} dataKey={v} fill="#6495ed" barSize={15} legendType="circle" style={{ fill: "#6495ed" }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Total = (props) => {
  const [data, setData] = useState([]);
  const [v, setV] = useState("--");

  useEffect(() => {
    setData(props.data);
    setV(props.v);
  }, [props.data, props.v]);

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <rect x={x} y={y} width={width} height={height} fill={"rgb(4,143,255)"} rx="3" ry="3" opacity="1" />
    );
  };

  return (
    <div className="DAT_ProjectData_Dashboard_History_Year">
      <div className="DAT_ProjectData_Dashboard_History_Year_Tit">
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Unit">
          MWh
        </div>
        <div className="DAT_ProjectData_Dashboard_History_Year_Tit-Label">
          Sản lượng tổng: 13.69 MWh
        </div>
      </div>
      <div className="DAT_ProjectData_Dashboard_History_Year_Chart">
        <ResponsiveContainer style={{ width: "100%", height: "100%", marginLeft: "-20px" }}>
          <BarChart width={150} height={200} data={data}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Legend />
            <Bar shape={<TriangleBar />} dataKey={v} fill="#6495ed" barSize={15} legendType="circle" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const getDaysInCurrentMonth = () => {
  const date = new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
}