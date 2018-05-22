import * as blessed from 'blessed';

export const newsBox = blessed.box({
  name: 'news',
  top: '50%',
  left: '0',
  width: '50%',
  height: '50%',
  label: 'The Verge',
  scrollable: true,
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
