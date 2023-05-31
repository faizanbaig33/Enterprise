import { useExternalScript } from 'lib/utils/use-external-script';

export const useBVScript = () => {
  const bazaarvoiceScriptUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'Production'
      ? 'https://apps.bazaarvoice.com/deployments/andersenwindows/main_website_dxp/production/en_US/bv.js'
      : 'https://apps.bazaarvoice.com/deployments/andersenwindows/main_website_dxp/staging/en_US/bv.js';

  const bazaarvoiceScriptState = useExternalScript(bazaarvoiceScriptUrl);

  return bazaarvoiceScriptState;
};
