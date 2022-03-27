import config from '../../base/config';

export default abstract class Func {

  async init() {
    if (!(await this.isEnabled())) {
      return;
    }
    await this.start();
    const loop = async () => {
      await this.execute();
      setTimeout(loop, this.getExecuteInterval());
    };
    loop();
  }

  protected abstract isEnabled();

  protected getExecuteInterval() {
    return 1000;
  }

  protected start() {
    // do nothing
  }

  protected execute() {
    // do nothing
  }

  protected isInPages(name: string) {
    const patterns = config.get<string[]>(['paths', name]) || [];
    for (const pattern of patterns) {
      const reg = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$')
      if (reg.test(location.pathname)) {
        return true;
      }
    }
  }

  removeProtocol(url: string | undefined): string {
    return url?.replace(/^.*?\/\//, '') || '';
  }

}
