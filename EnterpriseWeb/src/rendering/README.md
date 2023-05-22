# JSS Training

[JSS Training](https://horizontal.atlassian.net/wiki/spaces/HFEOS/pages/7273468756642/JSS+Training)

This is the practice space for our crash course on JSS on the frontend. If you haven't yet completed the `react-training` or `nextjs-training` section, please do so before moving on to this.

## Development Modes

### Connected

Uses an external Sitecore instance as a backend. Runs locally in NextJS development environment.

```
jss start:connected
```

### Connected Tunnel

Creates a localtunnel instance that can be used by an external Sitecore instance as a rendering source. Useful for debugging Experience Editor specific issues.

```
jss start:connected-tunnel
```
