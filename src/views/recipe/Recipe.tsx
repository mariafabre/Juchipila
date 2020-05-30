import React from 'react';
import { Tab } from '../../components/panels/Tab';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { VersionView } from './VersionView';
import { Recipe as RecipeModel, Version, Cookbook } from '../../services/TresLechesModels';
import './Recipe.css';
import { TresLechesSession } from '../../services/TresLechesSession';

export interface RecipeProps {
  recipe: RecipeModel;
  cookbook: Cookbook;
}

@observer
export class Recipe extends React.Component<RecipeProps> {
  @observable activeTab: string = "";
  @observable private recipe: RecipeModel = {} as RecipeModel; 
  cookbook: Cookbook = {} as Cookbook; 
  counter = 0;

  @action
  componentWillMount() {
    this.recipe = this.props.recipe;
    this.cookbook = this.props.cookbook;
    if (!this.recipe.versions || this.recipe.versions.length === 0) {
      this.addNew();
    } else {
      this.activeTab = this.recipe.versions[0].id;
    }
  }

  @action
  addNew() {
    this.counter++;
    this.recipe.versions = this.recipe.versions || [];
    this.recipe.versions.push({id: "recp" + this.counter, name: "Recipe" + this.counter, authors: [TresLechesSession.getInstance().user?.userAuth.user?.email || "noUser"]} as Version);
    this.activeTab = "recp" + this.counter;
  }

  get tabs(): { id: string, header: string, content: React.ReactNode }[] {
    return this.recipe.versions.map((version) => {
      return {id: version.id, header: version.name, content: <VersionView key={version.id} isEditing version={version}/>};
    });
  }

  render() {
    return <div className="recipe">
      <div className="recipe-panel">
        <Tab tabs={this.tabs} activeTabId={this.activeTab} onChange={action((tabId) => this.activeTab = tabId)} onAddNewTab={() => this.addNew()} />
        <button onClick={() => {
          TresLechesSession.getInstance().updateCookbook(this.cookbook);
        }}>
          Save
        </button>
      </div>
    </div>
  }
}
