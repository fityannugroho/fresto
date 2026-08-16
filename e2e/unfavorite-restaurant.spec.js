/* eslint-disable no-undef */

Feature('Unfavorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
  I.waitForResponse('https://restaurant-api.dicoding.dev/list', 10);
  I.waitForElement('restaurant-item');
  I.seeElement('restaurant-item');

  I.click(locate('restaurant-item').first());
  I.waitForElement('#favoriteButton');
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');
  I.amOnPage('/#/favorites');
});

Scenario('showing a favorited restaurant', ({ I }) => {
  I.seeElement('restaurant-item');
});

Scenario('unfavorite a restaurant', async ({ I }) => {
  I.seeElement('restaurant-item');
  I.click(locate('restaurant-item').first());
  I.waitForElement('#favoriteButton');
  I.seeElement('#favoriteButton[aria-label="Unfavorite this restaurant"]');
  I.click('#favoriteButton');
  I.amOnPage('/#/favorites');
  I.see('You don\'t favorite any restaurant yet.', 'restaurant-list');
});
