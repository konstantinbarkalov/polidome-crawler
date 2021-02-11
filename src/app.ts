import { ForecaCrawledData, ForecaCrawler, GidrometCrawledData, GidrometCrawler, OpenWeatherCrawledData, OpenWeatherCrawler, YandexCrawledData, YandexCrawler } from './crawler';
import { KeyUdb, Udb } from './udb';

class App {
  private udb: Udb = new Udb({
    openWeatherCrawledData: new KeyUdb<OpenWeatherCrawledData>('udb', 'openWeatherCrawledData'),
    forecaCrawledData: new KeyUdb<ForecaCrawledData>('udb', 'forecaCrawledData'),
    yandexCrawledData: new KeyUdb<YandexCrawledData>('udb', 'yandexCrawledData'),
    gidrometCrawledData: new KeyUdb<GidrometCrawledData>('udb', 'gidrometCrawledData'),
  });
  private openWeatherCrawler: OpenWeatherCrawler = new OpenWeatherCrawler();
  private forecaCrawler: ForecaCrawler = new ForecaCrawler();
  private yandexCrawler: YandexCrawler = new YandexCrawler();
  private gidrometCrawler: GidrometCrawler = new GidrometCrawler();
  constructor() {
    this.openWeatherCrawler.ee.on('crawled', (openWeatherCrawledData) => {
      this.onOpenWeatherCrawl(openWeatherCrawledData);
    });
    this.forecaCrawler.ee.on('crawled', (forecaCrawledData) => {
      this.onForecaCrawl(forecaCrawledData);
    });
    this.yandexCrawler.ee.on('crawled', (yandexCrawledData) => {
      this.onYandexCrawl(yandexCrawledData);
    });
    this.gidrometCrawler.ee.on('crawled', (gidrometCrawledData) => {
      this.onGidrometCrawl(gidrometCrawledData);
    });
  }
  public onOpenWeatherCrawl(openWeatherCrawledData: OpenWeatherCrawledData): void {
    console.info('app get data from openWeatherCrawler', openWeatherCrawledData);
    this.udb.keymap.openWeatherCrawledData.addValue(openWeatherCrawledData);
  }
  public onForecaCrawl(forecaCrawledData: ForecaCrawledData): void {
    console.info('app get data from forecaCrawler', forecaCrawledData);
    this.udb.keymap.forecaCrawledData.addValue(forecaCrawledData);
  }
  public onYandexCrawl(yandexCrawledData: YandexCrawledData): void {
    console.info('app get data from yandexCrawler', yandexCrawledData);
    this.udb.keymap.yandexCrawledData.addValue(yandexCrawledData);
  }
  public onGidrometCrawl(gidrometCrawledData: GidrometCrawledData): void {
    console.info('app get data from gidrometCrawler', gidrometCrawledData);
    this.udb.keymap.gidrometCrawledData.addValue(gidrometCrawledData);
  }
  async init(): Promise<void> {
    console.info('app init started...');
    await this.udb.init();
    this.udb.reloadFromDisk();
    await this.openWeatherCrawler.init();
    await this.forecaCrawler.init();
    await this.yandexCrawler.init();
    await this.gidrometCrawler.init();
    console.info('app init done!');
  }
}
const app = new App();
app.init();