import React from 'react';
import { render } from 'react-dom';
import { Select, MultiSelect, Spinner } from '../';

const levelOptions = [
  { label: '全部', value: '' },
  { label: '高危', value: 3 },
  { label: '重点关注', value: 2 },
  { label: '关注', value: 1 },
];

let level = levelOptions[0];

function renderApp() {
  const mountNode = document.getElementById('app');
  render(<div>
    <Select
      placeholder=""
      options={levelOptions}
      onChange={e => { }}
      value={level}
    />
    {/* <MultiSelect
      value={level}
      options={levelOptions}
      onChange={() => { }}
    /> */}
    <Spinner height={120} />
  </div>, mountNode);
}

renderApp();