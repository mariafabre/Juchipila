import React from 'react';
import Dialog, { DialogProps } from './Dialog';
import { observable, action } from 'mobx';
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
    @observable dialogs: Map<string,React.ReactNode> = new Map();

    private constructor() {
    }

    public static getManager(): DialogManager {
        if (!DialogManager.manager) {
            DialogManager.manager = new DialogManager();
        }
        return DialogManager.manager;
    }

    @action
    openDialog(props: DialogProps) {
        this.dialogs.set(props.key, <Dialog {...props}/>);
    }

    @action
    closeDialog(key: string) {
        this.dialogs.delete(key);
    }
}

export default AppOverlay;