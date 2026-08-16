/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.see('You don\'t favorite any restaurant yet.', 'restaurant-list');
});

Scenario('favorite a restaurant', async ({ I }) => {
  I.see('You don\'t favorite any restaurant yet.', 'restaurant-list');
  I.amOnPage('/');
  I.waitForResponse('https://restaurant-api.dicoding.dev/list', 10);
  I.waitForElement('restaurant-item');
  I.seeElement('restaurant-item');

  const firstRestaurant = locate('restaurant-item').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant.find('.restaurant-item__content__name'));
  I.click(firstRestaurant);

  I.waitForElement('#favoriteButton');
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorites');
  I.seeElement('restaurant-item');

  const favoritedRestaurantName = await I.grabTextFrom(locate('restaurant-item').first().find('.restaurant-item__content__name'));
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});
