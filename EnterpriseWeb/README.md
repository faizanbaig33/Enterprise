# Andersen Corporation EnterpriseWeb Documentation

## About this Solution
This solution is designed for the Andersen Corporation Sitecore solution.  The Visual Studio
solution EnterpriseWeb.sln lives at the root of the project with the code living under /src.

### Frontend Apps
All sites will use a single repo for the multisite architecture that will live under the /src/rendering folder.


## Configured for Sitecore first workflow
It is intended that you work directly in Sitecore to define templates and renderings, instead of using the code-first approach. This is also known as "Sitecore-first" JSS workflow. To support this:

* The JSS content workflow is disabled
* Imported items will not be marked as 'protected'
* JSS import warnings in the Content Editor and Experience Editor have been disabled

## Prerequisites
* NodeJs 16.x
* .NET 6.0 SDK
* .NET Framework 4.8 SDK
* Visual Studio 2022
* Docker for Windows, with Windows Containers enabled

See Sitecore Containers documentation for more information on system requirements.

See the [Workstation Setup](https://andersenwindows.atlassian.net/wiki/spaces/EW/pages/2816835585/Workstation+Setup) guide for more information.

## Running this Solution
See the [Getting Started](https://andersenwindows.atlassian.net/wiki/spaces/EW/pages/2822045700/Getting+Started) guide for more information.

## Using the Solution
* A Visual Studio / MSBuild publish of the `Platform` project will update the running `cm` service.
* Review README's found in the projects and throughout the solution for additional information.

## Troubleshooting

### Using a Standalone Git Client/App with Husky

Using a standalone Git client like Sourcetree with Husky may require some additional setup as the Terminal session internal to the client may not use the incorrect version of Node. To resolve the issue, create and add a `.huskyrc` to your user home directory (`~/`) and add the following:

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Error Starting Containers
If you get random SQL or Solr errors when you attempt to start your containers.

To do a full reset of cached content:
```
.\down.ps1
iisreset /stop
cd docker
.\clean.ps1
cd ..
.\up.ps1
```

### Custom ports
If you have multiple local environments running, you can update the ports for HTTPS, API, SQL and SOLR.

Edit .env.local with the following:
```
# Configure service ports for local development
HTTPS_PORT_LOCAL=443
API_PORT_LOCAL=8079
SOLR_PORT_LOCAL=8984
SQL_PORT_LOCAL=14330
```
