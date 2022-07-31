import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const [newWage, setNewWage] = useState(0);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      // access endpoint
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("Sucess!");
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
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

  return (
    <div className="App">
      <div className="pageHeader">Employee Database Management System</div>
      <div className="UI">
        <div className="addEmployeeDiv">
          <h2>Add New Employee</h2>
          <label>Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Age:</label>
          <input
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <label>Country:</label>
          <input
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
          <label>Position:</label>
          <input
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
          <label>Wage (year):</label>
          <input
            type="number"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          />
          <button onClick={addEmployee} className="addButton">
            Add
          </button>
          <button onClick={getEmployees} className="showEmployeesButton">
            Show Employees
          </button>
        </div>
        <div className="employees">
          <div>
            <input type="text" placeholder="Search..." />
            <button>Show 3</button>
            <button>Show 5</button>
            <button>Show All</button>
          </div>
          <table>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
              <th>Position</th>
              <th>Wage</th>
              <th>Update Wage</th>
              <th>Delete Employee</th>
            </tr>
            {employeeList.map((val, key) => {
              return (
                <tr>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>{val.country}</td>
                  <td>{val.position}</td>
                  <td>{val.wage}</td>
                  <td>
                    <div>
                      <input
                        className="editEmployeeWage"
                        type="number"
                        onChange={(event) => {
                          setNewWage(event.target.value);
                        }}
                      />
                      <button
                        className="employeeButton"
                        onClick={() => {
                          updateEmployeeWage(val.id);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="deleteEmployeeButton"
                      onClick={() => {
                        deleteEmployee(val.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
