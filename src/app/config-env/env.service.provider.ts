import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService();

  // Read environment variables from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow[<any>'__env'] || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    // eslint-disable-next-line no-prototype-builtins
    if (browserWindowEnv.hasOwnProperty(key)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      env[key] = window.__env[key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
