export type SiteConfig = {
  /**
   * Allow additional user defined properties.
   */
  [key: string]: unknown;

  /**
   * Name of the site.
   */
  name: string;

  /**
   * The host name of the incoming url. May include wildcards (ex. www.site.net, *.site.net, *.net, pda.*, print.*.net)
   * It's possible to set more than one mask by using '|' symbol as a separator (ex. pda.*|print.*.net)
   */
  hostName: string;

  /**
   * The host name of the incoming url. May include wildcards (ex. www.site.net, *.site.net, *.net, pda.*, print.*.net)
   * It's possible to set more than one mask by using '|' symbol as a separator (ex. pda.*|print.*.net)
   */
  targetHostName: string;

  /**
   *  Disables the use of trailing wildcards when resolving the name of a website.
   * For example, when set to true, 'test.com' is not be matched to '*test.c'. Default value: false.
   */
  disableTrailingWildcard: boolean;
};
