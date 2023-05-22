import { getCookie } from 'cookies-next';
import { APIs } from 'lib/constants';

export type AffiliateGeolocationProps = {
  city: string;
  stateOrProvince: string;
  postalCode: string;
  affiliateName: string;
  affiliateNumber: number;
  affiliateRoute: string;
};

export const defaultAffiliateGeolocationProps: Readonly<AffiliateGeolocationProps> = {
  city: 'Cottage Grove',
  stateOrProvince: 'MN',
  postalCode: '55016',
  affiliateName: 'Renewal by Andersen',
  affiliateNumber: 0,
  affiliateRoute: '',
};

export const getAffiliateGeolocationData = () => {
  const geo: AffiliateGeolocationProps = JSON.parse(
    getCookie(`${APIs.RBA.Geolocation.Cookie}`)?.toString() || '{}'
  );
  return geo;
};
