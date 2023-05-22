import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

type AppInfoType = {
  url: string;
  appName: string;
  theme: string;
};

const notFound = {
  url: '',
  appName: 'AndersenWindows',
  theme: 'aw',
};

const domains = [
  {
    url: 'renewalbyandersen.com',
    appName: 'RenewalbyAndersen',
    theme: 'rba',
  },
  {
    url: 'renewalbyandersen.ca',
    appName: 'RenewalbyAndersen',
    theme: 'rba',
  },
  {
    url: 'andersenwindows.com',
    appName: 'AndersenWindows',
    theme: 'aw',
  },
  {
    url: 'localhost',
    appName: 'AndersenWindows',
    theme: 'aw',
  },
];

export const getAppFromDomain = (): AppInfoType => {
  const publicUrl = getPublicUrl();
  const dom = domains.find((d) => publicUrl.includes(d.url));

  if (dom) {
    return dom;
  } else {
    return notFound;
  }
};
