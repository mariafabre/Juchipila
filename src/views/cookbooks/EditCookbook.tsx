import React from 'react';
import { TextInput } from '../../components/inputs/TextInput';
import { observable, action, computed } from 'mobx';
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
      <label>Code:</label><TextInput placeholder={this.props.editCookbookController.generateCode === '' ? 'Three Char Code' : this.props.editCookbookController.generateCode}
        value={this.props.editCookbookController.code || this.props.editCookbookController.cookbook.code} onChange={action((code) => this.props.editCookbookController.code = code)} maxLength={3} />
      <label>Image:</label><input type="file" id="img" name="img" accept="image/*" />
      {this.props.editCookbookController.isNew 
        ? <button onClick={() => {
          this.props.editCookbookController.addCookbook();          
        this.props.onCommit && this.props.onCommit(this.props.editCookbookController.cookbook);
        }} disabled={this.props.editCookbookController.name.replace(/\s/g, "").trimEnd().length < 3}>Add New Cookbook</button> :
        <button onClick={() => {
          this.props.editCookbookController.updateCookbook();          
        this.props.onCommit && this.props.onCommit(this.props.editCookbookController.cookbook);
          }} disabled={this.props.editCookbookController.name.replace(/\s/g, "").trimEnd().length < 3}>Update Cookbook</button>}
    </div>
  }
}

export class EditCookbookController {
  private static articles: string[] = ['the', 'a', 'an'];
  public cookbook: Cookbook;
  public isNew: boolean = false;
  @observable name: string = '';
  @observable code: string = '';

  constructor(cookbook?: Cookbook) {
    if (cookbook) {
      this.cookbook = cookbook;
    } else {
      this.cookbook = {} as Cookbook;
      this.isNew = true;
    }
  }


  addCookbook() {
    this.cookbook.name = this.name || '';
    this.cookbook.code = this.code !== '' ?  this.code.toUpperCase() : this.generateCode;
    TresLechesSession.getInstance().addNewCookbook(this.cookbook);
    DialogManager.getManager().closeDialog('addCookbook');
  }

  @computed
  get generateCode(): string {
    let code = '';
    if (this.name) {
      let tokens = this.name.split(' ').filter((s) => s !== "");
      let nonArts = tokens.filter((token) => !EditCookbookController.articles.includes(token.toLocaleLowerCase()));
       if (nonArts && nonArts.length >= 3) {
        code = this.getCodeFromTokens(nonArts, code);
      } else if (code.length < 3 && nonArts.length > 0 && nonArts.length < 3) {
          code = nonArts[0].replace(/\s/g, "").substring(0,3).toUpperCase();
      } else if (tokens.length >= 3) {
        code = this.getCodeFromTokens(tokens, code);
      }
    }
    return code !== '' || code.length >= 3 ? code.toUpperCase() : this.name.replace(/\s/g, "").substring(0,3).toUpperCase();
  }

  private getCodeFromTokens(tokens: string[], code: string) {
    for (let i: number = 0; ((i < tokens.length) && (code.length < 3)); i++) {
      code = code + (tokens[i].length > 0 ? tokens[i][0].toUpperCase() : "");
    }
    return code;
  }

  updateCookbook() {
    this.cookbook.name = this.name || this.cookbook.name;
    this.cookbook.code = this.code || this.cookbook.code;
    TresLechesSession.getInstance().updateCookbook(this.cookbook);
    DialogManager.getManager().closeDialog('editCookbook');
  }

}
