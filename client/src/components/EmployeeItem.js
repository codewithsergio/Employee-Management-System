import React from 'react'
import { NavLink } from "react-router-dom";
import '../css/EmployeeItem.css';

function EmployeeItem({ val, key, updateContextValues, confirmDeletionOf }) {
    const formattedWage = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val.wage);
  return (
    <tr>
      <td>{val.id}</td>
      <td>{val.name}</td>
      <td>{val.position}</td>
      <td>{val.task}</td>
      <td>{formattedWage}</td>
      <td>
        <div className="actionsButtons">
          <NavLink
            className="editButton action"
            onClick={() => updateContextValues(val)}
            to="updateemployee"
          >
            <span
              className="iconify"
              data-icon="material-symbols:edit-square-outline-sharp"
            ></span>
          </NavLink>
          <button
            className="deleteButton action"
            onClick={() => {
              confirmDeletionOf(val);
            }}
          >
            <span
              className="iconify"
              data-icon="material-symbols:delete-forever"
            ></span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeItem;