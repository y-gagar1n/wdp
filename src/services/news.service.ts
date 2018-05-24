declare var Promise;
import fetch from 'node-fetch';
import * as Parser from 'rss-parser';

export interface NewsArticle {
  title: string;
  description: string;
  author: string;
  url: string;
}

export interface Crypto {
  title: string;
  x: string[];
  y: string[];
}

async function getArticles(type: 'thenextweb' | 'verge'): Promise<NewsArticle[]> {
  const vergeAPI = `https://newsapi.org/v2/everything?sources=the-verge&sortBy=publishedAt&apiKey=ee582714b32645c8a48b8601e7267063`;
  const techAPI = `https://newsapi.org/v2/everything?sources=the-next-web&sortBy=publishedAt&apiKey=ee582714b32645c8a48b8601e7267063`

  let req = type === 'verge' ? await fetch(vergeAPI) : await fetch(techAPI);
  let data = await (await req.json());
  return data.articles.map(article => ({
    title: article.title,
    description: article.description,
    author: article.author,
    url: article.url
  }));
}

export class NewsService {


  async thenextweb(): Promise<NewsArticle[]> {
    return getArticles('thenextweb');
  }

  async verge(): Promise<NewsArticle[]> {
    return getArticles('verge');
  }

  async hackerNews(): Promise<NewsArticle[]> {
    let hhListAPI = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
    let hhItemAPIprefix = `https://hacker-news.firebaseio.com/v0/item/`
    let hhItemAPIpostfix = `.json?print=pretty`;
    let data: Array<number> = await (await fetch(hhListAPI)).json();
    return await Promise.all(data.slice(0, 20).map(async id => {
      const itemUrl: string = hhItemAPIprefix + id + hhItemAPIpostfix;
      const item = await (await fetch(itemUrl)).json();
      return {
        title: item.title,
        description: item.title,
        author: item.by,
        url: item.url
      };
    }));
  }

  async reddit(): Promise<NewsArticle[]> {
    let redditAPI = `https://www.reddit.com/user/gagar1n/m/1_programming.json`;
    let res = await (await fetch(redditAPI)).json();
    return res.data.children.map(article => ({
      title: `(${article.data.score} | ${article.data.num_comments}) ${article.data.title}`,
      url: article.data.url,
      author: article.data.author,
      description: ``
    }));
  }

  async habr(): Promise<NewsArticle[]> {
    const parser = new Parser();
    const habrFeed = await parser.parseURL('https://habr.com/rss/best/');
    return habrFeed.items.map(item => ({
      title: item.title,
      url: item.link,
      author: item.creator,
      description: ``
    }));

  }
}
