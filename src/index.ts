import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-yjs-example extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-yjs-example:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-yjs-example is activated!');
  }
};

export default extension;
