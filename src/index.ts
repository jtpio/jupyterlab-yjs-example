import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  Clipboard,
  Dialog,
  ICommandPalette,
  showDialog
} from '@jupyterlab/apputils';

import { CodeMirrorEditor } from '@jupyterlab/codemirror';

import { PageConfig, URLExt } from '@jupyterlab/coreutils';

import { IEditorTracker } from '@jupyterlab/fileeditor';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import * as Y from 'yjs';

import { WebsocketProvider } from 'y-websocket';

import { CodemirrorBinding } from 'y-codemirror';

/**
 * Custom prefix for the websocket provider
 */
const WEBSOCKET_PROVIDER_PREFIX = 'jupyterlab-yjs-example';

/**
 * The command IDs used by the plugin.
 */
namespace CommandIDs {
  export const share = 'jupyterlab-yjs-example:share';
}

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

/**
 * Plugin to share the URL of the running Jupyter Server
 */
const share: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-yjs-example:share',
  autoStart: true,
  optional: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette | null,
    menu: IMainMenu | null
  ) => {
    const { commands } = app;

    commands.addCommand(CommandIDs.share, {
      label: 'Share Jupyter Server Link',
      execute: async () => {
        const link = URLExt.normalize(
          `${PageConfig.getUrl({
            workspace: PageConfig.defaultWorkspace
          })}?token=${PageConfig.getToken()}`
        );
        const result = await showDialog({
          title: 'Share Jupyter Server Link',
          body: link,
          buttons: [
            Dialog.cancelButton({ label: 'Cancel' }),
            Dialog.okButton({
              label: 'Copy',
              caption: 'Copy the link to the Jupyter Server'
            })
          ]
        });
        if (result.button.accept) {
          Clipboard.copyToSystem(link);
        }
      }
    });

    if (palette) {
      palette.addItem({ command: CommandIDs.share, category: 'Server' });
    }

    if (menu) {
      // Create a menu
      const shareMenu: Menu = new Menu({ commands });
      shareMenu.title.label = 'Share';
      menu.addMenu(shareMenu, { rank: 10000 });

      // Add the command to the menu
      shareMenu.addItem({ command: CommandIDs.share });
    }
  }
};

const plugins: JupyterFrontEndPlugin<any>[] = [editors, share];
export default plugins;
