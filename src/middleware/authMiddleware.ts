export const validateLogin = (email: string, password: string): string | null => {
  if (!email.includes('@')) {
    return 'Invalid email format.'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.'
  }
  if (email === 'blocked@example.com') {
    return 'This email is blocked.'
  }

  return null
}
