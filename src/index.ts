import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { CodeMirrorEditor } from '@jupyterlab/codemirror';

import { IEditorTracker } from '@jupyterlab/fileeditor';

import * as Y from 'yjs';

import { WebsocketProvider } from 'y-websocket';

import { CodemirrorBinding } from 'y-codemirror';

/**
 * Custom prefix for the websocket provider
 */
const WEBSOCKET_PROVIDER_PREFIX = 'jupyterlab-yjs-example';

/**
 * Support for collaborative editing with file editors.
 */
const editors: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-yjs-example:editors',
  optional: [IEditorTracker],
  autoStart: true,
  activate: (app: JupyterFrontEnd, tracker: IEditorTracker | null) => {
    if (tracker) {
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
    }
  }
};

const plugins: JupyterFrontEndPlugin<any>[] = [editors];
export default plugins;
