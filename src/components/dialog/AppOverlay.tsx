import React from 'react';
import ReactDOM from 'react-dom';
import Dialog, { DialogProps } from './Dialog';

function AppOverlay() {
    return <div id="AppOverlay" className="AppOverlay" 
    onDragOver={(event) => event.preventDefault()}/>;
}

export class DialogManager {
    static openDialog(props: DialogProps) {
        ReactDOM.render(<Dialog {...props}/>, document.getElementById('AppOverlay'));
    }
}

export default AppOverlay;