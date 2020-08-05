import React from 'react';
import UnitRow from 'components/UnitRow';
import Button from 'components/common/Button';

const UnitSelect = ({
  unit,
  armyName,
  goToDisplay,
  handleAddUnitToListWithArmyAndUnit,
  editingUnit,
  handleEditUnit,
  handleDeleteUnit,
  deleteConfirm,
}) => {

  function handleCancelClick() {
    goToDisplay(editingUnit ? 'armyList' : 'unitsIndex');
  }

  function handleSaveClick() {
    editingUnit ? handleEditUnit(unit) : handleAddUnitToListWithArmyAndUnit(armyName, unit);
  }

  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  if (!deleteConfirm) {
    return <section className="unit-select">
      <UnitRow
        unit={unit}
        displayAddButton={false}
      />
      <Button text="Save" onClick={handleSaveClick} />
      {editingUnit ? <Button text="Delete" onClick={() => goToDisplay('deleteConfirm')} /> : null}
      <Button text="Cancel" onClick={handleCancelClick} />
    </section>
  } else {
    return <section className="delete-confirm">
      <p>Delete this unit?</p>
      <p>{unitDetails.name}</p>
      <Button text="Delete" onClick={() => handleDeleteUnit(unit)} />
      <Button text="Cancel" onClick={() => goToDisplay('unitSelect')} />
    </section>
  }

};

export default UnitSelect;