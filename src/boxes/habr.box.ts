import * as blessed from 'blessed';

export const habrBox = blessed.box({
  name: 'habr',
  top: '50%',
  left: '0',
  width: '50%',
  height: '50%',
  content: '',
  tags: true,
  label: 'Habrahabr',
  border: {
    type: 'line'
  },
  style: {
    fg: '#fff',
    border: {
      fg: '#555'
    },
    focus: { border: { fg: '#f00' } },
  }
});