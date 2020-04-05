import React from 'react';
import Dialog, { DialogProps } from './Dialog';
import { observable, action, computed } from 'mobx';
import { Observer } from 'mobx-react';

function AppOverlay() {
    return <Observer>
        {() => <div id="AppOverlay" className="AppOverlay"
            onDragOver={(event) => event.preventDefault()}>
                {DialogManager.getManager().dialogs}
                </div>}
    </Observer>;
}

export class DialogManager {
    private static manager: DialogManager;
    @observable private _dialogs: Map<string,React.ReactNode> = new Map();

    private constructor() {
    }

    @computed
    get dialogs(): React.ReactNode[] {
        return Array.from(this._dialogs.values());
    }

    public static getManager(): DialogManager {
        if (!DialogManager.manager) {
            DialogManager.manager = new DialogManager();
        }
        return DialogManager.manager;
    }

    @action
    openDialog(props: DialogProps) {
        this._dialogs.set(props.key, <Dialog {...props}/>);
    }

    @action
    closeDialog(key: string) {
        this._dialogs.delete(key);
    }
}

export default AppOverlay;