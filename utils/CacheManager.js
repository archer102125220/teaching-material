import { LRUCache } from 'lru-cache';

export class CacheManagerConstructor {
  constructor() {
    this.useCache = true;
    this.maxAge = 600;
    if (process.env.NODE_ENV === 'production') {
      this.useCache = true;
    }

    this.cacheStore = new LRUCache({
      max: 64000000,
      maxAge: this.maxAge * 1000
    });
    this.queues = Object.create(null);

    this.globalCache = this.globalCache.bind(this);
    this.pageCache = this.pageCache.bind(this);
    this.addCache = this.addCache.bind(this);
    this.removeCache = this.removeCache.bind(this);
    this.queryParsing = this.queryParsing.bind(this);
    this.drainQueue = this.drainQueue.bind(this);
  }

  globalCache(req, res) {
    console.log('handle globalCache');

    res.setHeader('Cache-Control', 'public, max-age=' + this.maxAge);
    res.setHeader('Pragma', 'Public');
  }

  pageCache(req, res, next) {
    if (this.useCache === false) {
      return;
    }
    console.log('handle pageCache');

    const parsedUrl = req._parsedOriginalUrl || req._parsedUrl;
    const { query, pathname } = parsedUrl;
    const { clearCache } = this.queryParsing(query || '');

    const key = '__nuxt__' + pathname;
    if (clearCache !== undefined && clearCache === 'all') {
      this.removeAllCache();
      next();
    } else if (clearCache !== undefined) {
      this.removeCache(key);
      next();
    } else {
      const value = this.cacheStore.get(key);
      if (value !== undefined) {
        console.log('has cache key:' + key);
        return res.end(value);
      }
      this.addCache(res, next, key);
    }
  }

  addCache(res, key = '') {
    if (Array.isArray(this.queues[key]) === false) {
      this.queues[key] = [];
    }

    if (this.queues[key].length === 0) {
      res.original_end = res.end;
      res.end = (data) => {
        if (res.statusCode === 200) {
          this.cacheStore.set(key, data);
        }
        this.drainQueue(key);
        res.original_end(data);
      };
    } else {
      this.queues[key].push(() => {
        const value = this.cacheStore.get(key) || {};
        res.end(value);
      });
    }

    console.log('add cache key:' + key);
  }

  removeCache(key = '') {
    const value = this.cacheStore.get(key);
    if (value !== undefined) {
      this.cacheStore.del(key);
      console.log('remove cache key:' + key);
    }
  }

  removeAllCache() {
    this.cacheStore.reset();
    console.log('remove all cache');
  }

  queryParsing(query = '') {
    return query
      .split('&')
      .map((query) => query.split('='))
      .reduce((accumulator, currentValue) => {
        if (currentValue.length >= 1) {
          return { ...accumulator, [currentValue[0]]: currentValue[1] };
        } else if (currentValue.length >= 0) {
          return { ...accumulator, [currentValue[0]]: true };
        }
        return { ...accumulator };
      }, {});
  }

  drainQueue(key = '') {
    let subscriber = null;

    while (this.queues[key] && this.queues[key].length > 0) {
      subscriber = this.queues[key].shift();
      console.log({ subscriber, queuesKey: key });
      process.nextTick(subscriber);
    }

    delete this.queues[key];
  }
}

const Manager = new CacheManagerConstructor();

export default Manager;
