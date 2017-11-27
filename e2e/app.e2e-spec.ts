import { HotelPage } from './app.po';

describe('hotel App', () => {
  let page: HotelPage;

  beforeEach(() => {
    page = new HotelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
