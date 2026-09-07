import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password'
      ? '/api/v1/users/update-password'
      : '/api/v1/users/update-me';

    const config = data instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};

    const res = await axios.patch(url, data, config);

    if (res.data.status === 'success') {
      showAlert(
        'success',
        type === 'password'
          ? 'Password updated successfully'
          : 'User data updated successfully'
      );

      if (type !== 'password') {
        window.setTimeout(() => location.reload(), 1500);
      }
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || err.message);
  }
};
