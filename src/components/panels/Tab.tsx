import React from 'react';
import { observer } from 'mobx-react';
import './Tab.css';

export interface TabProps {
    tabs: {id: string, header: string, content: React.ReactNode}[];
    onChange: (tabId: string) => void;
    activeTabId: string;
    onAddNewTab?: () => void
}

@observer
export class Tab extends React.Component<TabProps> {
    render() {
        return <div className="tabs">
            <div className="tab-header">
                {this.props.tabs.map((tab) => {
                    return <button className={"tab-button" + (tab.id === this.props.activeTabId ? " active" : "")} onClick={() => this.props.onChange(tab.id)}>{tab.header}</button>
                })}
                {this.props.onAddNewTab && <button className="tab-button add" onClick={() => this.props.onAddNewTab && this.props.onAddNewTab()}>+</button>}
            </div>
            <div className="tab-content">
                {this.props.tabs.find((tab) => tab.id === this.props.activeTabId)?.content}
            </div>
           
        </div>
    }
}