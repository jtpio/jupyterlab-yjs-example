# jupyterlab-yjs-example

![Github Actions Status](https://github.com/jtpio/jupyterlab-yjs-example/workflows/Build/badge.svg)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jtpio/jupyterlab-yjs-example/main?urlpath=/lab)

Example of using Yjs in JupyterLab for collaborative editing.

## Try it on Binder

This example can be tested on Binder with several people:

1. Open a file
2. Click on `Share > Share Jupyter Server Link`
3. Copy the link
4. Send the link

![binder-demo](https://user-images.githubusercontent.com/591645/104510621-b5c20900-55eb-11eb-840f-9ecaf4ccd0ad.gif)

It is also possible to use [JupyterLab Classic](https://github.com/jtpio/jupyterlab-classic) to edit the file:

![jupyterlab-classic](https://user-images.githubusercontent.com/591645/104511017-5fa19580-55ec-11eb-8b79-0820f59c21de.png)

## Requirements

* JupyterLab >= 3.0

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab-yjs-example directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```
