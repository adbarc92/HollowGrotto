import React from 'react';
import Header from './components/Header';
import ReactCanvas from './components/ReactCanvas';
import UnitDetails, { Unit } from './components/UnitDetails';
import ActionMenu from './components/ActionMenu';
import { createUnit } from './utils/Unit';

const App = (): JSX.Element => {
  // let imageLoaded = Canvas();
  const units: Unit[] = [];
  units.push(createUnit('Gary', 80, 100, 0, 0));
  units.push(createUnit('Jimmy', 80, 100, 0, 0));
  units.push(createUnit('Ruth', 80, 100, 0, 0));
  units.push(createUnit('Linus', 80, 100, 0, 0));
  const actions = ['Strike', 'Charge', 'Defend', 'Heal', 'Item', 'Flee'];
  return (
    <div>
      <Header />
      <div>
        <ReactCanvas />
        <UnitDetails units={units} />
        <ActionMenu actions={actions} />
      </div>
    </div>
  );
};

export default App;
