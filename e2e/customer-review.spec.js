/* eslint-disable no-undef */
const assert = require('assert');

Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/');
  I.waitForResponse('https://restaurant-api.dicoding.dev/list', 10);
  I.waitForElement('restaurant-item');
});

Scenario('adding a review', async ({ I }) => {
  const inputNameValue = 'John Doe';
  const inputReviewValue = `This is a test review. ${new Date().toISOString()}`;

  const firstRestaurant = locate('restaurant-item').first();
  I.waitForElement(firstRestaurant);
  I.click(firstRestaurant);

  const reviewForm = locate('#reviewForm');
  I.seeElement(reviewForm);
  I.waitForElement('#name');
  I.seeElement('#name');
  I.waitForElement('#review');
  I.seeElement('#review');
  I.fillField('#name', inputNameValue);
  I.fillField('#review', inputReviewValue);
  I.pressKey('Enter');

  I.refreshPage();
  I.waitForElement('#reviews');
  I.seeElement('#reviews');
  I.refreshPage();
  I.waitForElement('#reviews');
  I.seeElement('#reviews');

  const myReviewItem = locate('.review-item').last();
  I.waitForElement(myReviewItem);
  I.seeElement(myReviewItem);
  const myReviewName = await I.grabTextFrom(myReviewItem.find('.review-item__name'));
  const myReviewReview = await I.grabTextFrom(myReviewItem.find('.review-item__content'));
  assert.strictEqual(myReviewName, inputNameValue);
  assert.strictEqual(myReviewReview, inputReviewValue);
});
