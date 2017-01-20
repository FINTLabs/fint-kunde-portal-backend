import { FintKundeportalPage } from './app.po';

describe('fint-kundeportal App', function() {
  let page: FintKundeportalPage;

  beforeEach(() => {
    page = new FintKundeportalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
