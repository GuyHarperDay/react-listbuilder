import React from 'react';
import UnitRow from 'components/UnitRow';
import Button from 'components/common/Button';

const UnitsIndex = ({ army, goToDisplay, selectUnit, selectArmy, fromArmyList }) => {

  function handleClickAdd(unit) {
    selectUnit(unit);
    selectArmy(army.name);
    goToDisplay('unitSelect');
  }

  return <section className="units-index">
    <Button text="Select other army" onClick={() => goToDisplay('armiesIndex')} />
    { army.units.map(unit => {
        return <UnitRow
          unit={unit}
          displayAddButton={true}
          handleClickAdd={() => handleClickAdd(unit)}
          key={unit.name}
        />
      })
    }
    <Button text="Cancel" onClick={() => goToDisplay(fromArmyList ? 'armyList' : 'armiesIndex')} />
  </section>
};

export default UnitsIndex;