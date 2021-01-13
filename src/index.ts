import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { CodeMirrorEditor } from '@jupyterlab/codemirror';

import { IEditorTracker } from '@jupyterlab/fileeditor';

import * as Y from 'yjs';

import { WebsocketProvider } from 'y-websocket';

import { CodemirrorBinding } from 'y-codemirror';

import { requestAPI } from './handler';

/**
 * Custom prefix for the websocket provider
 */
const WEBSOCKET_PROVIDER_PREFIX = 'jupyterlab-yjs-example';

/**
 * Initialization data for the jupyterlab-yjs-example extension.
 */
const editors: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-yjs-example:editors',
  optional: [IEditorTracker],
  autoStart: true,
  activate: (app: JupyterFrontEnd, tracker: IEditorTracker | null) => {
    tracker.widgetAdded.connect((sender, widget) => {
      const ydoc = new Y.Doc();
      const provider = new WebsocketProvider(
        'wss://demos.yjs.dev',
        `${WEBSOCKET_PROVIDER_PREFIX}-${widget.context.path}`,
        ydoc
      );
      const ytext = ydoc.getText('codemirror');
      const editor = widget.content.editor;
      const cmEditor = editor as CodeMirrorEditor;
      const cm = cmEditor.editor;

      const binding = new CodemirrorBinding(ytext, cm, provider.awareness);
      console.log(binding);
    });

    console.log('JupyterLab extension jupyterlab-yjs-example is activated!');
  }
};

const share: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-yjs-example:share',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('ready');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyterlab-yjs-example server extension appears to be missing.\n${reason}`
        );
      });
  }
};

const plugins: JupyterFrontEndPlugin<any>[] = [editors, share];
export default plugins;
