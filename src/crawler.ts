import { AbstractAlignedAutoCrawler } from './abstractCrawler';
import fetch from 'node-fetch';
import { Secret } from './secret';

export class OpenWeatherCrawledData {
  constructor(public timestamp: number,
              public rawResponse: any) {
  }
};
export class OpenWeatherCrawler extends AbstractAlignedAutoCrawler<OpenWeatherCrawledData> {
  private readonly apiKey: string = Secret.openWeaterApiKey;
  public async init(): Promise<void> {
    super.init();
    console.info('openWeather crawler init started...');
    console.info('openWeather crawler init done!');
  }
  public async crawl(): Promise<OpenWeatherCrawledData> {
    const cityName = 'krasnoyarsk';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`);
    const json = await response.json();
    return json as OpenWeatherCrawledData;
  }
}
export class ForecaCrawledData {
  constructor(public timestamp: number,
              public rawResponse: any) {
  }
};
export class ForecaCrawler extends AbstractAlignedAutoCrawler<ForecaCrawledData> {
  public async init(): Promise<void> {
    super.init();
    console.info('foreca crawler init started...');
    console.info('foreca crawler init done!');
  }
  public async crawl(): Promise<ForecaCrawledData> {
    // throw new Error('Method not implemented.');
    return { timestamp: Date.now(), rawResponse: 'TODO'};
  }
}
export class YandexCrawledData {
  constructor(public timestamp: number,
              public rawResponse: any) {
  }
};
export class YandexCrawler extends AbstractAlignedAutoCrawler<YandexCrawledData> {
  private readonly apiKey: string = Secret.yandexApiKey;
  public async init(): Promise<void> {
    super.init();
    console.info('yandex crawler init started...');
    console.info('yandex crawler init done!');
  }

  public async crawl(): Promise<YandexCrawledData> {
    //const cityName = 'krasnoyarsk';
    //const response = await fetch(`https://api.weather.yandex.ru/v2/informers?lat=55.75396&lon=37.620393`, { headers: {
      const response = await fetch(`https://api.weather.yandex.ru/v2/forecast?lat=55.75396&lon=37.620393`, { headers: {
      'X-Yandex-API-Key': this.apiKey,
    }});
    const json = await response.json();
    return json as YandexCrawledData;
  }
}

export class GidrometCrawledData {
  constructor(public timestamp: number,
              public rawResponse: any) {
  }
};
export class GidrometCrawler extends AbstractAlignedAutoCrawler<GidrometCrawledData> {
  public async init(): Promise<void> {
    super.init();
    console.info('gidromet crawler init started...');
    console.info('gidromet crawler init done!');
  }
  public async crawl(): Promise<GidrometCrawledData> {
    // throw new Error('Method not implemented.');
    return { timestamp: Date.now(), rawResponse: 'TODO'};
  }
}