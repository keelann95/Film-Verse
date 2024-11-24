import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

export const showSuccessToast = (message) => {
  return Toast.fire({
    icon: 'success',
    title: message
  });
};

export const showSuccessAlert = (message, timer = 2000) => {
  return Swal.fire({
    title: 'Success!',
    text: message,
    icon: 'success',
    confirmButtonColor: '#9333ea',
    timer,
    timerProgressBar: true,
    showConfirmButton: timer > 3000
  });
};

export const showErrorAlert = (message) => {
  return Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonColor: '#9333ea'
  });
};

export const showWarningAlert = (message) => {
  return Swal.fire({
    title: 'Authentication Required',
    text: message,
    icon: 'warning',
    confirmButtonColor: '#9333ea'
  });
};

export const showInfoAlert = (message) => {
  return Swal.fire({
    title: 'Information',
    text: message,
    icon: 'info',
    confirmButtonColor: '#9333ea'
  });
};

export const showLoginSuccess = (username) => {
  return showSuccessAlert(`Welcome back, ${username}!`, 2000);
};

export const showSignupSuccess = () => {
  return Swal.fire({
    title: 'Welcome to Film Verse!',
    text: 'Your account has been created successfully.',
    icon: 'success',
    confirmButtonColor: '#9333ea',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true
  });
};

export const showLoginError = (message = 'Invalid credentials') => {
  return Swal.fire({
    title: 'Login Failed',
    text: message,
    icon: 'error',
    confirmButtonColor: '#9333ea'
  });
};

export const showSignupError = (message) => {
  return Swal.fire({
    title: 'Signup Failed',
    text: message,
    icon: 'error',
    confirmButtonColor: '#9333ea'
  });
};

export const showLogoutSuccess = () => {
  return showSuccessToast('You have been logged out successfully');
};

export const showFollowSuccess = (username) => {
  return showSuccessToast(`You are now following ${username}`);
};

export const showFollowError = () => {
  return showErrorAlert('Unable to follow user. Please try again later.');
};

export const showMovieUnavailable = () => {
  return showInfoAlert('Video link not available for this movie');
};

export const showAuthRequired = () => {
  return showWarningAlert('Please log in to access this feature');
};