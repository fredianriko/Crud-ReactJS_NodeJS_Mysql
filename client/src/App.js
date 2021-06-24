import React, { useState, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import "./App.css";
import Axios from "axios";

function App() {
  // all the function starts from here

  const [namaKaryawan, setNameKaryawan] = useState("");
  const [hpKaryawan, setHpKaryawan] = useState("");
  const [limitReimburse, setLimitReimburse] = useState("");
  const [tanggalMasukKerja, setTanggalMasukKerja] = useState(new Date().toISOString());
  const [inputDate, setInputDate] = useState(new Date().toLocaleString("en-US"));
  const [updateDate, setUpdateDate] = useState(new Date().toLocaleString("en-US"));
  // const [idKaryawan, setIdKaryawan] = useState("");
  const [updateKarya, setUpdateKaryawan] = useState("");
  const [listKaryawan, setKaryawan] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setKaryawan(response.data);
      // console.log(response.data[0].tanggal_masuk_kerja);
    });
  });

  const submitKaryawan = () => {
    Axios.post("http://localhost:3001/api/insert", {
      nameKaryawan: namaKaryawan,
      noKaryawan: hpKaryawan,
      tanggalMasukKerja: tanggalMasukKerja,
      limitReimburse: limitReimburse,
      inputDate: inputDate,
      updateDate: updateDate,
      // tanggalMasukKerja: tanggalMasukKerja,
    });
    setKaryawan([...listKaryawan, { nameKaryawan: namaKaryawan, noKaryawan: hpKaryawan, tanggalMasukKerja: tanggalMasukKerja, limitReimburse: limitReimburse, inputDate: inputDate, updateDate: updateDate }]);
  };

  const deleteKaryawan = (karyawan) => {
    Axios.delete(`http://localhost:3001/api/delete/${karyawan}`);
  };

  const updateKaryawan = (karyawan) => {
    Axios.put("http://localhost:3001/api/update", {
      nameKaryawan: namaKaryawan,
      idKaryawan: updateKarya,
    });
    setUpdateKaryawan("");
  };

  // const updateKaryawan = (karyawab) => {};

  // all the function ends here
  // -------------------------------------------------------------------------------------------------------------------------------
  //rendering the UI as table for the input data of karyawan
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="searching">
        <div className="header">
          <p>
            <FiGlobe />
            Browse
          </p>
          <button className="addagain">
            <MdAddCircle className="addicon" /> Add Karyawan
          </button>
        </div>
        <h2 className="findUser">
          <FaSearch />
          Find User
        </h2>

        <div className="searcinput">
          <div className="nama">
            <label>Nama Karyawan</label>
            <input type="text" placeholder="Enter Nama karyawan" />
          </div>
          <div className="tanggalmasuk">
            <label htmlFor="">Tanggal Masuk Karyawan</label>
            <input type="text" placeholder="Tanggal Masuk Karyawan" />
          </div>
          <div className="nohp">
            <label htmlFor="">Nomor Hp Karyawan</label>
            <input type="text" placeholder="Enter Nomor Hp" />
          </div>
          <button className="cari">
            <FaSearch />
            Search
          </button>
        </div>
      </div>

      <div className="view">
        <div className="view-header">
          <div className="col">Kode Karyawan</div>
          <div className="col">Nama Karyawan</div>
          <div className="col">Nomor Hp</div>
          <div className="col">Tanggal Masuk Kerja</div>
          <div className="col">Limit Reimbursement</div>
          <div className="col">Tanggal Input</div>
          <div className="col">Tanggal Update</div>
          <div className="col">Update Field</div>
          <div className="col">Actions</div>
        </div>
        <div className="listkaryawan">
          {" "}
          {listKaryawan.map((val) => {
            return (
              <div className="table-container">
                <div className="col">
                  <div className="kodeKaryawan"></div>
                  {val.id_karyawan}
                </div>
                <div className="col">
                  <div className="namaKaryawan" key={namaKaryawan.toString()}>
                    {val.name_karyawan}
                  </div>
                </div>
                <div className="col">
                  <div className="hpKaryawan" key={hpKaryawan.toString()}>
                    {val.no_hp}
                  </div>
                </div>
                <div className="col">
                  <div className="tanggalKerja" key={tanggalMasukKerja.toLocaleString("en-US")}>
                    {val.tanggal_masuk_kerja}
                  </div>
                </div>
                <div className="col">
                  <div className="limit">{val.limit_reimburse}</div>
                </div>
                <div className="col">
                  <div className="limit">{val.input_date}</div>
                </div>
                <div className="col">
                  <div className="limit">{val.update_date}</div>
                </div>
                <div className="col">
                  <div className="updating">
                    <input
                      type="text"
                      onChange={(e) => {
                        setUpdateKaryawan(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="updateDelete">
                  <button id="delete" onClick={() => deleteKaryawan(val.id_karyawan)}>
                    delete
                  </button>
                  <button id="update" onClick={() => updateKaryawan(val.name_karyawan)}>
                    update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="form">
        <div className="header-form">
          <div className="header-form-text">
            <MdAddCircle className="addicon" />
            <h1>Add User</h1>
          </div>
        </div>
        <div className="inputField">
          <h1>Fields with * are mandatory!</h1>

          <div className="namaKaryawan">
            <label>Nama Karyawan *</label>
            <input
              type="text"
              name="namaKaryawan"
              onChange={(e) => {
                setNameKaryawan(e.target.value);
              }}
            />
          </div>
          <div className="tanggalMasuk">
            <label>Tanggal Masuk Kerja *</label>
            <br />
            <input
              type="date"
              name="tanggalMasukKerja"
              onChange={(e) => {
                setTanggalMasukKerja(e.target.value);
              }}
            />
          </div>
          <div className="nohpkaryawan">
            <label>No.HP *</label>
            <input
              type="text"
              name="noHp"
              onChange={(e) => {
                setHpKaryawan(e.target.value);
              }}
            />
          </div>
          <div className="limit">
            <label>Limit Reimbursement</label>
            <input
              type="text"
              name="limitReimburse"
              onChange={(e) => {
                setLimitReimburse(e.target.value);
              }}
            />
          </div>
          <div className="dateInput">
            <label>Input Date *</label>
            <input
              type="date"
              name="createDate"
              onChange={(e) => {
                setInputDate(e.target.value);
              }}
            />
          </div>
          <div className="updateDate">
            <label>Update Date *</label>
            <input
              type="date"
              name="createDate"
              onChange={(e) => {
                setUpdateDate(e.target.value);
              }}
            />
          </div>
          <button onClick={submitKaryawan} type="submit" className="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
