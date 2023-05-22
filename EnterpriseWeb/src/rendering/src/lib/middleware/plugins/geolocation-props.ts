import { NextRequest, NextResponse } from 'next/server';
import { APIs } from 'lib/constants';
import {
  AffiliateGeolocationProps,
  defaultAffiliateGeolocationProps,
} from 'lib/utils/get-geolocation';

export class GeolocationProps {
  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const response = res || NextResponse.next();
    // immediately bail out if not relevant
    if (
      !req.headers.get('host')?.includes('renewalbyandersen') ||
      req.cookies.has(`${APIs.RBA.Geolocation.Cookie}`)
    ) {
      return response;
    }

    try {
      const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0];
      const geo = await fetch(`${APIs.RBA.Geolocation.Endpoint}?ip=${ip}`);
      const data: AffiliateGeolocationProps = await geo.json();
      if (data?.postalCode) {
        response.cookies.set(`${APIs.RBA.Geolocation.Cookie}`, JSON.stringify(data), {
          httpOnly: false,
        }); // reroute once we have affiliate data
      } else {
        throw `No geolocation data for ${ip}`;
      }
    } catch (e) {
      console.error(e);
      response.cookies.set(
        `${APIs.RBA.Geolocation.Cookie}`,
        JSON.stringify(defaultAffiliateGeolocationProps),
        {
          httpOnly: false,
        }
      );
    }
    return response;
  }
}

export const geolocationPropsPlugin = new GeolocationProps();
