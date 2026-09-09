const bookingButton = document.getElementById('book-tour-date');
const tourDate = document.getElementById('tour-date');

if (bookingButton && tourDate) {
  bookingButton.addEventListener('click', async () => {
    if (!tourDate.value) {
      window.alert('Please select a tour date.');
      return;
    }
 
    try {
      const response = await fetch(
        `/api/v1/bookings/checkout-session/${bookingButton.dataset.tourId}?date=${encodeURIComponent(tourDate.value)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to start checkout.');
      }

      if (!data.session?.url) {
        throw new Error('Checkout session URL was not returned.');
      }

      window.location.assign(data.session.url);
    } catch (error) {
      window.alert(error.message);
    }
  });
}
