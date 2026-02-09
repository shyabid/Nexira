const authErrorMessages = {
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/user-not-found": "No account found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential":
    "Invalid login credentials. Please check your email and password.",
  "auth/email-already-in-use":
    "This email is already registered. Please use a different email or try logging in.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection and try again.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/internal-error": "Server error. Please try again in a moment.",
  "auth/invalid-user-token": "Session expired. Please log in again.",
  "auth/user-token-expired": "Your session has expired. Please log in again.",

  default: "An unexpected error occurred. Please try again.",
};

const getAuthErrorMessage = (errorCode) => {
  return authErrorMessages[errorCode] || authErrorMessages.default;
};

export default getAuthErrorMessage;
