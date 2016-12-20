import { FintKundeportalMockupsPage } from './app.po';

describe('fint-kundeportal-mockups App', function() {
  let page: FintKundeportalMockupsPage;

  beforeEach(() => {
    page = new FintKundeportalMockupsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
