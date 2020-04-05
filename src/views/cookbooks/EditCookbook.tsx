import React from 'react';
import { TextInput } from '../../components/inputs/TextInput';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { DialogManager } from '../../components/dialog/AppOverlay';
import { TresLechesSession } from '../../services/TresLechesSession';
import { Cookbook } from '../../services/TresLechesModels';

export interface EditCookbookProps {
  editCookbookController: EditCookbookController;
  onCommit?: (cookbook: Cookbook) => void;
}

@observer
export class EditCookbook extends React.Component<EditCookbookProps> {
  static addCookbook(props: EditCookbookProps) {
    DialogManager.getManager().openDialog({ title: "Add Cookbook", className: "cookbook-dlg", content: <EditCookbook {...props} />, key: "addCookbook" })
  }

  static editCookbook(props: EditCookbookProps) {
    DialogManager.getManager().openDialog({ title: "Edit Cookbook", className: "cookbook-dlg", content: <EditCookbook {...props} />, key: "editCookbook" })
  }

  render() {
    return <div className="form cookbook">
      <label>Name:</label><TextInput placeholder="Cookbook Name"
        value={this.props.editCookbookController.name || this.props.editCookbookController.cookbook.name} onChange={action((name) => this.props.editCookbookController.name = name)} />
      <label>Code:</label><TextInput placeholder="Three Character Code"
        value={this.props.editCookbookController.code || this.props.editCookbookController.cookbook.code} onChange={action((code) => this.props.editCookbookController.code = code)} />
      <label>Image:</label><input type="file" id="img" name="img" accept="image/*" />
      {this.props.editCookbookController.isNew ? <button onClick={() => {
        this.props.editCookbookController.addCookbook();
        this.props.onCommit && this.props.onCommit(this.props.editCookbookController.cookbook);
      }}>Add New Cookbook</button> :
        <button onClick={() => {
          this.props.editCookbookController.updateCookbook();
          this.props.onCommit && this.props.onCommit(this.props.editCookbookController.cookbook);
          }}>Update Cookbook</button>}
    </div>
  }
}

export class EditCookbookController {
  public cookbook: Cookbook;
  public isNew: boolean = false;
  @observable name: string | undefined;
  @observable code: string | undefined;

  constructor(cookbook?: Cookbook) {
    if (cookbook) {
      this.cookbook = cookbook;
    } else {
      this.cookbook = {} as Cookbook;
      this.isNew = true;
    }
  }

  addCookbook() {
    this.cookbook.name = this.name || this.cookbook.name;
    this.cookbook.code = this.code || this.cookbook.code;
    TresLechesSession.getInstance().addNewCookbook(this.cookbook);
  }

  updateCookbook() {
    this.cookbook.name = this.name || this.cookbook.name;
    this.cookbook.code = this.code || this.cookbook.code;
    TresLechesSession.getInstance().updateCookbook(this.cookbook);
  }

}
