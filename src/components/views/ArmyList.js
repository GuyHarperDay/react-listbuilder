import React from 'react';
import UnitRow from 'components/UnitRow';
import Button from 'components/common/Button';

const ArmyList = ({ armyList, goToDisplay, setFromArmyList, selectUnit  }) => {;

  function handleAddUnitClick() {
    goToDisplay('unitsIndex');
    setFromArmyList(true);
  }

  function handleEditUnitClick(unit) {
    selectUnit(unit);
    goToDisplay('unitSelect');
    setFromArmyList(true);
  }

  return <section className="army-list">
    {armyList.map(armySection => {
      return <div>
        <h2 class="army-list__section-heading">{armySection.name}</h2>
        <p>{armySection.cost}</p>
        {armySection.units.map(unit => {
          return <UnitRow
            unit={unit}
            key={unit.id}
            displayAddButton={false}
            displayEditButton={true}
            handleClickEdit={() => handleEditUnitClick(unit)}
          />
        })}
      </div>
    })}
    <Button text="Add another unit" onClick={handleAddUnitClick}/>
  </section>
};

export default ArmyList;