import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://seoblog.com"
  : publicRuntimeConfig.API;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
         ? publicRuntimeConfig.DOMAIN_PRODUCTION
         : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;