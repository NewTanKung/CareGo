export default function FeedbackMessages({ errorMessage, successMessage, variant = 'light' }) {
  if (!errorMessage && !successMessage) {
    return null;
  }

  const isDark = variant === 'dark';

  return (
    <div className={isDark ? 'mt-6 space-y-2' : 'space-y-2'}>
      {errorMessage && (
        <p
          className={
            isDark
              ? 'text-center text-sm text-red-100 font-medium'
              : 'text-center text-sm text-red-600'
          }
          role="alert"
        >
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p
          className={
            isDark
              ? 'text-center text-sm text-emerald-100 font-medium'
              : 'text-center text-sm text-green-600'
          }
          role="status"
        >
          {successMessage}
        </p>
      )}
    </div>
  );
}
