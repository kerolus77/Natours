/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId, date) => {
  try {
    if (typeof Stripe !== 'function') {
      throw new Error('Payment service is unavailable. Please try again.');
    }

    const stripe = Stripe('pk_test_51OuIzJLOfyi5EFl5SBfLCRMj2gSnXjkJjddnkqXQlhvutoKCT8QiZbEvSuXiwCJwovXcSj3swYlz4bbkZD4BA9xj00PnzP5gsS');

    // 1) Get checkout session from API
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}?date=${encodeURIComponent(date)}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.response?.data?.message || err.message);
  }
};

const bookTourButton = document.getElementById('book-tour');
const tourDate = document.getElementById('tour-date');

if (bookTourButton) {
  bookTourButton.addEventListener('click', () => {
    if (!tourDate || !tourDate.value) {
      showAlert('error', 'Please select a tour date.');
      return;
    }
    bookTour(bookTourButton.dataset.tourId, tourDate.value);
  });
}