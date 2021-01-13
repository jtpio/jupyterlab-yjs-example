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
 * Initialization data for the jupyterlab-yjs-example extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-yjs-example:plugin',
  optional: [IEditorTracker],
  autoStart: true,
  activate: (app: JupyterFrontEnd, tracker: IEditorTracker | null) => {
    tracker.widgetAdded.connect((sender, widget) => {
      const ydoc = new Y.Doc();
      const provider = new WebsocketProvider(
        'wss://demos.yjs.dev',
        widget.context.path,
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

export default extension;
