# For development purposes, note Next.js supports a .env.local
# file, which is already configured to be git ignored.
# Read more about Next.js support of environment variables here:
# https://nextjs.org/docs/basic-features/environment-variables

# The public URL to use for absolute URLs, which are required when
# the Next.js app is run within Sitecore editors.
# This should match the `serverSideRenderingEngineApplicationUrl`
# in your Sitecore configuration (see \sitecore\config\enterprise-web.config).
# Be sure to update these values accordingly as your public endpoint changes.
# See https://jss.sitecore.com/docs/fundamentals/services/view-engine
PUBLIC_URL=http://www.local.andersenwindows.com

# To secure the Sitecore editor endpoint exposed by your Next.js app
# (`/api/editing/render` by default), a secret token is used. This (client-side)
# value must match your server-side value (see \sitecore\config\enterprise-web.config).
# We recommend an alphanumeric value of at least 16 characters.
JSS_EDITING_SECRET=

# Your Sitecore API key is needed to build the app. Typically, the API key is
# defined in `scjssconfig.json` (as `sitecore.apiKey`). This file may not exist
# when building locally (if you've never run `jss setup`), or when building in a
# higher environment (since `scjssconfig.json` is ignored from source control).
# In this case, use this environment variable to provide the value at build time.
SITECORE_API_KEY={DD72A7B9-3B27-4785-A327-05F797D156F7}

# Your Sitecore API hostname is needed to build the app. Typically, the API host is
# defined in `scjssconfig.json` (as `sitecore.layoutServiceHost`). This file may
# not exist when building locally (if you've never run `jss setup`), or when building
# in a higher environment (since `scjssconfig.json` is ignored from source control).
# In this case, use this environment variable to provide the value at build time.
SITECORE_API_HOST=

# Your GraphQL Edge endpoint. This is required for Sitecore Experience Edge.
# For Sitecore XM, this is typically optional. By default, the endpoint is calculated using
# the resolved Sitecore API hostname + the `graphQLEndpointPath` defined in your `package.json`.
GRAPH_QL_ENDPOINT=

# The way in which layout and dictionary data is fetched from Sitecore
FETCH_WITH=GraphQL

# Sitecore JSS npm packages utilize the debug module for debug logging.
# https://www.npmjs.com/package/debug
# Set the DEBUG environment variable to 'sitecore-jss:*' to see all logs:
#DEBUG=sitecore-jss:*
# Or be selective and show for example only layout service logs:
#DEBUG=sitecore-jss:layout
# Or everything BUT layout service logs:
#DEBUG=sitecore-jss:*,-sitecore-jss:layout
