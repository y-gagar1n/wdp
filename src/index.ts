declare var Promise;
import * as blessed from 'blessed';
let screen = blessed.screen({smartCSR: true});
import * as contrib from 'blessed-contrib';
import * as opn from 'opn';
import { NewsArticle, NewsService } from './services/news.service';
import {
  redditBox,
  hnBox,
  newsBox,
  techBox
} from './boxes/';


const ns = new NewsService();
const boxes = [
  { name: 'reddit', box: redditBox, data: ns.reddit, },
  { name: 'hackernews', box: hnBox, data: ns.hackerNews, },
  { name: 'thenextweb', box: techBox, data: ns.thenextweb, },
  { name: 'verge', box: newsBox, data: ns.verge, },
]

async function initialRender (): Promise<any> {
  for (let box of boxes) {
    screen.append(box.box);
    box.data().then(d => {
      renderBox(d, box.box, box.name);
    });
  }
}

function renderBox(items: NewsArticle[], box: blessed.Widgets.BoxElement, name: string) {
  let list = blessed.list({
    items: items.map(article => article.title),
    mouse: true,
    style: {
      selected: {bg: `#0f0`, fg: `#000`},
    },
    name: name
  });
  list.on('select', (item) => {
    let article = items[list.getItemIndex(item)];
    try {
      opn(article.url);
    } catch (e) {
      /**
       * Could not get url for this list item.. weird.. 
       */
    }
  });
  box.append(list);
  screen.render();
}

screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.render();
initialRender();
