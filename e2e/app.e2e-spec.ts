import { SdSquaredDemoAppPage } from './app.po';

describe('sd-squared-demo-app App', () => {
  let page: SdSquaredDemoAppPage;

  beforeEach(() => {
    page = new SdSquaredDemoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
