import { sp } from '@pnp/sp-commonjs';
import { SPFetchClient } from '@pnp/nodejs-commonjs';
import config from '../config';

const SITE_URL = config.SITE_URL ?? '';
const CLIENT_ID = config.CLIENT_ID ?? '';
const CLIENT_SECRET =  config.CLIENT_SECRET ?? '';

export function setupSpfxConnection() {
  sp.setup({
    sp: {
      fetchClientFactory: () => new SPFetchClient(
        SITE_URL,
        CLIENT_ID ,
        CLIENT_SECRET,
      ),
    },
  });
}
