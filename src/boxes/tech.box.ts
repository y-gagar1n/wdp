import * as blessed from 'blessed';

export const techBox = blessed.box({
  name: 'tech',
  top: '50%',
  left: '50%',
  width: '50%',
  height: '50%',
  label: 'The Next Web',
  border: {
    type: 'line'
  },
  style: {
    fg: '#fff',
    border: {
      fg: '#555'
    },
    focus: {border: {fg: '#f00'}},
  }
});
