export function analyticsLogger(
  message: string, error?: Error
) {

  // ...

  mockAnalyticsEndpoint(
    message,
    error,
  );
}

function mockAnalyticsEndpoint(
  message: string,
  error?: Error
) {
  return new Promise<void>((
    resolve, reject
  ) => {
    if (error !== undefined && message !== undefined) {
      resolve();
      return;
    }
    reject();
  })
}
