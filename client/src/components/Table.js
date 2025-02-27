import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import "../css/Table.css";
import Axios from "axios";
import EmployeeItem from "./EmployeeItem";

function Table() {
  const { dispatch } = useContext(Context);
  const [employeeList, setEmployeeList] = useState([]);

  const [search, setSearch] = useState("");

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const get3Employees = () => {
    Axios.get("http://localhost:3001/employees3").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const get5Employees = () => {
    Axios.get("http://localhost:3001/employees5").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          // filter will delete what gets returned
          return val.id !== id;
        })
      );
    });
  };

  const getSearch = (search) => {
    Axios.get(`http://localhost:3001/search${search}`).then((response) => {
      // access endpoint
      setEmployeeList(response.data);
      setSearch("");
    });
  };

  const confirmDeletionOf = (val) => {
    let confirmAction = window.confirm(
      `Are you sure you want to delete ${val.name} from your records?`
    );
    if (confirmAction) {
      deleteEmployee(val.id);
    }
  };

  const updateContextValues = (val) => {
    dispatch({
      type: "UPDATE_EMPLOYEE",
      payload: {
        editName: val.name,
        editPosition: val.position,
        editTask: val.task,
        editWage: val.wage,
        editId: val.id,
      },
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="table_component">
      <div className="employees">
        <div className="tableSortOptions">
          <div className="searchWIcon">
            <span
              className="iconify"
              data-icon="material-symbols:search"
            ></span>
            <input
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              value={search}
            />
          </div>
          <button
            onClick={() => {
              getSearch(search);
            }}
            className="sortButtons"
          >
            Search
          </button>
          {/* <button onClick={get3Employees} className="sortButtons">
            Show 3
          </button>
          <button onClick={get5Employees} className="sortButtons">
            Show 5
          </button> */}
          <button onClick={getEmployees} className="sortButtons">
            Show All
          </button>
        </div>
      </div>
      {employeeList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>POSITION</th>
                <th>TASK</th>
                <th>WAGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((val, key) => 
                <EmployeeItem
                val={val}
                key={key}
                updateContextValues={updateContextValues}
                confirmDeletionOf={confirmDeletionOf}/>
              )}
            </tbody>
          </table>
      ) : (
        <>
          {/* Conditional if no data to be seen */}
          <p className="conditional">
            Sorry, we couldn't find any results for your search. Please try
            again with a different search term or check your spelling.
          </p>
        </>
      )}
    </div>
  );
}

export default Table;
