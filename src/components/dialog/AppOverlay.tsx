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
    @observable dialogs: React.ReactNode[] = [];

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
        this.dialogs.push(<Dialog {...props}/>);
    }
}

export default AppOverlay;