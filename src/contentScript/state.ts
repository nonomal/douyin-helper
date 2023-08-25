import { Aweme } from '../base/model';

class AwemeUrlMatcher {
  private data: Record<string, Aweme> = {};

  add(url: string, aweme: Aweme) {
    this.data[this.toKey(url)] = aweme;
  }

  find(url: string): Aweme | undefined {
    return this.data[this.toKey(url)];
  }

  private toKey(url: string): string {
    return url.replace(/^(.+:)?\/\//, '').replace(/\?.*$/, '');
  }
}

const state: {
  awemes: Record<string, Aweme>;
  awemeUrlMatcher: AwemeUrlMatcher;
} = {
  awemes: {},
  awemeUrlMatcher: new AwemeUrlMatcher(),
};

export default state;
