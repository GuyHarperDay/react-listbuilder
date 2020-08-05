import React, { useState, useEffect, useReducer } from 'react';
import Button from 'components/common/Button';
import UnitsIndex from 'components/views/UnitsIndex';
import UnitSelect from 'components/views/UnitSelect';
import ArmyList from 'components/views/ArmyList';
import { v4 as uuidv4 } from 'uuid';

const ArmiesIndex = () => {
  const [armies, setArmies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [display, setDisplay] = useState('armiesIndex');
  const [selectedArmy, setSelectedArmy] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [fromArmyList, setFromArmyList] = useState(null);

  const initialArmyListState = [
      // // what an armyList might look like:

      // {
      //   name: 'Test army',
      //   armyCost: 90,
      //   units: [
      //     {
      //       unitId: 1,
      //       unitDetails: {
      //         name: 'Some unit',
      //         Qua: '4+',
      //         Def: '5+',
      //         Equipment: 'Some equipment',
      //         possibleUpgradeGroups: [1],
      //         cost: 40,
      //       },
      //       selectedUpgrades: [
      //         {
      //           upgradeId: 1,
      //           text: 'Replace X with Y',
      //           cost: 10,
      //         },
      //       ],
      //       unitCost: 50
      //     }
      //   ]
      // },
      // {
      //   name: 'Other army',
      //   armyCost: 120,
      //   units: [
      //     {
      //       unitId: 2,
      //       unitDetails: {
      //         name: 'Some second unit',
      //         Qua: '3+',
      //         Def: '5+',
      //         Equipment: 'Some second equipment',
      //         possibleUpgradeGroups: [1, 2],
      //         cost: 70,
      //       },
      //       selectedUpgrades: [
      //         {
      //           upgradeId: 1,
      //           text: 'Replace X with Y',
      //           cost: 10,
      //         },
      //       ],
      //       unitCost: 50
      //     }
      //   ]
      // }
  ];
  const [armyListState, dispatch] = useReducer(reducer, initialArmyListState);


  function reducer(armyListState, action) {
    switch (action.type) {
      case 'addUnitToList':
        return addUnitToListDispatchFunction(armyListState, action);
      case 'editUnit':
        return editUnitDispatchFunction(armyListState, action);
      case 'deleteUnit':
        return deleteUnitDispatchFunction(armyListState, action);
      default:
        throw new Error();
    }
  }

  function addUnitToListDispatchFunction(armyListState, action) {
    const armyListIndex = armyListState.findIndex(armyList => armyList.name === action.armyName);
    const selectedUnit = {
      unitId: uuidv4(),
      unitDetails: action.unit,
      selectedUpgrades: [],
      unitCost: action.unit.cost,
      armyName: action.armyName,
    }
    if (armyListIndex === -1) {
      return [...armyListState, { name: action.armyName, units: [selectedUnit] }];
    } else {
      return armyListState.map((army, index) => {
        if (index !== armyListIndex) return army;
        return { ...army, units: [...army.units, selectedUnit] };
      });
    }
    // still need to update points values
  }

  function editUnitDispatchFunction(armyListState, action) {
    const armyListIndex = armyListState.findIndex(armyList => armyList.name === action.unit.armyName);
    return armyListState.map((army, index) => {
      if (index !== armyListIndex) return army;
      return {
        ...army, units: army.units.map(unit => {
          if (unit.id !== action.unit.id) return unit;
          return action.unit;
        })
      };
    })
    // still need to update points values
  }

  function deleteUnitDispatchFunction(armyListState, action) {
    console.log('action in deleteDispatch - ', action);
    const armyListIndex = armyListState.findIndex(armyList => armyList.name === action.unit.armyName);
    return armyListState.map((army, index) => {
      if (index !== armyListIndex) return army;
      return {
        ...army, units: army.units.filter(unit => unit.unitId !== action.unit.unitId)
      };
    })
        // if last unit in army section, delete army section
        // if last unit in list, setFromArmyList to false
  }

  const config = {
    game: 'Some game',
    unitValues: [
      'Name [size]',
      'Qua',
      'Def',
      'Equipment',
    ],
    specialRules: [
      {
        name: 'Some special rule',
        description: 'Some special rule description',
      }
    ]
  }

  const dummyArmiesData = [
    {
      name: 'Test army',
      version: '1.1',
      units: [
        {
          name: 'Some unit',
          Qua: '4+',
          Def: '5+',
          Equipment: 'Some equipment',
          possibleUpgradeGroups: [ 1 ],
          cost: 40,
        },
        {
          name: 'Some second unit',
          Qua: '3+',
          Def: '5+',
          Equipment: 'Some second equipment',
          possibleUpgradeGroups: [ 1, 2 ],
          cost: 70,
        }
      ],
      upgradeGroups: {
        1: [
          {
            upgradeId: 1,
            text: 'Replace X with Y',
            cost: 10,
          },
          {
            upgradeId: 2,
            text: 'Replace X with Z',
            cost: 20,
          }
        ],
        2: [
          {
            upgradeId: 3,
            text: 'Upgrade with something',
            cost: 10,
            specialRules: [
              'Some special rule',
              'Another special rule',
            ]
          }
        ]
      },
      detachments: [
        {
          name: 'Some detachment',

        }
      ]
    },
    {
      name: 'Test army 2',
      version: '1.3',
      units: [
        {
          name: 'Some second army unit',
          Qua: '4+',
          Def: '5+',
          Equipment: 'Some equipment',
          possibleUpgradeGroups: [1],
          cost: 40,
        },
        {
          name: 'Some second second army unit',
          Qua: '3+',
          Def: '5+',
          Equipment: 'Some second equipment',
          possibleUpgradeGroups: [1, 2],
          cost: 70,
        }
      ],
      upgradeGroups: {
        1: [
          {
            upgradeId: 1,
            text: 'Replace X with Y',
            cost: 10,
          },
          {
            upgradeId: 2,
            text: 'Replace X with Z',
            cost: 20,
          }
        ],
        2: [
          {
            upgradeId: 3,
            text: 'Upgrade with something',
            cost: 10,
            specialRules: [
              'Some special rule',
              'Another special rule',
            ]
          }
        ]
      },
      detachments: [
        {
          name: 'Some detachment',
        }
      ]
    },
  ]

  function init() {
    setIsLoaded(true);
    setArmies(dummyArmiesData);
    setDisplay('armiesIndex');
  }

  useEffect(init, []);

  function handleArmyButtonClick(armyName) {
    setSelectedArmy(armyName);
    setDisplay('unitsIndex');
  }

  function handleAddUnitToListWithArmyAndUnit(armyName, unit) {
    dispatch({ type: 'addUnitToList', armyName, unit });
    setDisplay('armyList');
    // then go to army list display
  }

  function handleEditUnit(unit) {
    dispatch({ type: 'editUnit', unit });
    setDisplay('armyList');
  }

  function handleDeleteUnit(unit) {
    dispatch({ type: 'deleteUnit', unit });
    setDisplay('armyList');
    // setDisplay to armyList or armiesIndex
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (display === 'armiesIndex') {
     // if flag is set that this view should be displayed
    return <main>
      { armies.map((army, i) => {
        return <Button text={army.name} onClick={() => handleArmyButtonClick(army.name)} key={i}/>
      })}
    </main>
  } else if (display === 'unitsIndex') {
    return <main>
      <UnitsIndex
        army={armies.find(army => army.name === selectedArmy)}
        goToDisplay={setDisplay}
        selectUnit={setSelectedUnit}
        selectArmy={setSelectedArmy}
        fromArmyList={fromArmyList}
      />
    </main>
  } else if (display === 'unitSelect' || display === 'deleteConfirm') {
    return <main>
      <UnitSelect
        armyName={selectedArmy}
        unit={selectedUnit}
        goToDisplay={setDisplay}
        handleAddUnitToListWithArmyAndUnit={handleAddUnitToListWithArmyAndUnit}
        editingUnit={!!selectedUnit.unitId}
        handleEditUnit={handleEditUnit}
        handleDeleteUnit={handleDeleteUnit}
        deleteConfirm={display === 'deleteConfirm'}
      />
    </main>
  } else if (display === 'armyList') {
    return <main>
      <ArmyList
        armyList={armyListState}
        goToDisplay={setDisplay}
        setFromArmyList={setFromArmyList}
        selectUnit={setSelectedUnit}
      />
    </main>
  }
};

export default ArmiesIndex;