import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('MovieCruiserCapsuleFrontend');
  });

  it('should be redirected to /login route on openning application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should register test6 user', () => {
    browser.element(by.css('[href="#collapse2"]')).click();
    browser.element(by.id('rUserid')).sendKeys('test6');
    browser.element(by.id('rFirstName')).sendKeys('test');
    browser.element(by.id('rLastName')).sendKeys('6');
    browser.element(by.id('rPassword')).sendKeys('123');
    browser.element(by.id('rConfirmPassword')).sendKeys('123');
    browser.pause();
    browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    browser.element(by.id('registerButton')).click();
    browser.element(by.css('[href="#collapse1"]')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should login with the registered user', () => {
    browser.executeScript('window.scrollTo(0, 0)');
    browser.element(by.id('userid')).sendKeys('test5');
    browser.element(by.id('password')).sendKeys('123');
    browser.pause();
    browser.element(by.id('loginButton')).click();
  });

  it('should navigate to /popular page on logging in', () => {
    expect(browser.getCurrentUrl()).toContain('/popular');
    browser.driver.manage().window().maximize();
    browser.sleep(2000);
  });

  it('should navigate to /top-rated page on clicking on Top Rated menu button', () => {
    browser.element(by.id('topRatedButton')).click();
    expect(browser.getCurrentUrl()).toContain('/top_rated');
    browser.sleep(2000);
  });

  it('should navigate to /watchlist page on clicking on Watchlist menu button', () => {
    browser.element(by.id('watchlistButton')).click();
    expect(browser.getCurrentUrl()).toContain('/watchlist');
    browser.sleep(2000);
  });

  it('should search for the movies containing iron', () => {
    browser.element(by.id('movieSearchInput')).sendKeys('iron');
    browser.element(by.id('movieSearchButton')).click();
    expect(browser.getCurrentUrl()).toContain('/searchlist');
    browser.sleep(2000);
  });

  it('should navigate to /popular page on clicking on Popular menu button', () => {
    browser.element(by.id('popularButton')).click();
    expect(browser.getCurrentUrl()).toContain('/popular');
    browser.sleep(2000);
  });

  it('should be able to add movie to watchlist', () => {
    const movies = element.all(by.css('.movie-thumbnail'));
    expect(movies.count()).toBe(20);
    movies.get(0).click();
    expect(browser.getCurrentUrl()).toContain('/movieDetails');
    browser.element(by.id('addToWatchlistButton')).click();
    browser.sleep(2000);
  });

  it('should be able to add the comment', () => {
    browser.element(by.id('commentField')).sendKeys('typed the comment');
    browser.element(by.id('updateCommentButton')).click();
    expect(browser.getCurrentUrl()).toContain('/movieDetails');
    browser.sleep(2000);
  });

  it('should be able to remove from the watchlist', () => {
    browser.element(by.id('popularButton')).click();
    browser.element(by.id('watchlistButton')).click();
    expect(browser.getCurrentUrl()).toContain('/watchlist');
    const movies = element.all(by.css('.movie-thumbnail'));
    expect(movies.count()).toBe(1);
    movies.get(0).click();
    expect(browser.getCurrentUrl()).toContain('/movieDetails');
    browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    browser.sleep(2000);
    browser.element(by.id('removeFromWatchlistButton')).click();
    browser.sleep(2000);
    browser.element(by.id('popularButton')).click();
    browser.element(by.id('watchlistButton')).click();
  });

  it('should navigate to /login page on clicking logout', () => {
    browser.element(by.id('logOutButton')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
    browser.sleep(2000);
  });

});
