import React from 'react';
import Button from 'components/common/Button.js';

const UnitsIndex = ({ unit, displayAddButton, displayEditButton, handleClickAdd, handleClickEdit }) => {

  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  return <div className="unit-row">
    <table>
      <tbody>
        <tr>
          <td>{unitDetails.name}</td>
        </tr>
      </tbody>
    </table>
    {displayAddButton ? <Button text='Add' onClick={() => handleClickAdd(unit)} /> : null}
    {displayEditButton ? <Button text='Edit' onClick={() => handleClickEdit(unit)} /> : null}
  </div>
};

export default UnitsIndex;