const defaultEnv = {
  googleApiKey: '//add your api key'
};
const devEnv = {};

const prodEnv = {};

const env =
  process.env.NODE_ENV === 'production'
    ? { ...defaultEnv, ...prodEnv }
    : { ...defaultEnv, ...devEnv };

export default env;
