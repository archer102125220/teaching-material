export function checkPasswordLength(passwordValue) {
  if (passwordValue.length < 8 || passwordValue.length > 16) {
    return false;
  }
  return true;
}
export function checkPasswordHasEnglishWord(passwordValue) {
  const pwdRegex = /(?=.*[a-zA-Z]){1,}/i;
  if (pwdRegex.test(passwordValue) === false) {
    return false;
  }
  return true;
}
export function checkPasswordInvalidWordError(passwordValue) {
  const pwdRegex = /^[A-Z]|[a-z]|[\d]|[\W]$/i;
  // console.log(pwdRegex.test(passwordValue));
  if (pwdRegex.test(passwordValue) === false) {
    return false;
  }
  return true;
}
