import React from 'react';
import { Version, Ingredient, Reference } from '../../services/TresLechesModels';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { TresLechesSession } from '../../services/TresLechesSession';
import { TextInput } from '../../components/inputs/TextInput';
import { Icon, IconSources } from '../../components/Icon';
import { ConversionUtils, NonSpecificUnitsEnum } from '../utils/ConversionUtils';
import { ConverterController, Converter } from '../Converter/Converter';

export interface VersionProps {
    key: string;
    version: Version;
    isEditing?: boolean;
}

@observer
export class VersionView extends React.Component<VersionProps> {
    countNew = 0;

    get isEditing(): boolean {
        return this.props.version.authors.indexOf(TresLechesSession.getInstance().user?.userAuth.user?.email || "noUser") > -1 && Boolean(this.props.isEditing);
    }

    renderDeleteButton(onDelete: () => void): React.ReactNode {
        return <button onClick={action(() => {
            onDelete();
        })}>
            <Icon source={IconSources.FONTAWESOME} name="fa fa-trash" />
        </button>
    }

    renderPairing(pairing: Reference, onDelete: () => void): React.ReactNode {
        return <div className="list-row pairing" key={pairing.id}>
            <TextInput value={pairing.name} onChange={action((value: string) => pairing.name = value)} placeholder="Name" />
            <a href={pairing.href} target="_blank" rel="noopener noreferrer">
                <Icon name="fa fa-external-link" source={IconSources.FONTAWESOME} />
            </a>
            <TextInput value={pairing.href} onChange={action((value: string) => pairing.href = value)} placeholder="URL" />
            {this.renderDeleteButton(onDelete)}
        </div>
    }

    render() {
        let unitOptions: React.ReactNode[] = [<option key={NonSpecificUnitsEnum.PINCH} value={NonSpecificUnitsEnum.PINCH} />,
        <option key={NonSpecificUnitsEnum.TOTASTE} value={NonSpecificUnitsEnum.TOTASTE} />,
        <option key={NonSpecificUnitsEnum.UNIT} value={NonSpecificUnitsEnum.UNIT} />
    ];
        ConversionUtils.liquidConversionMap.forEach((conversion, unit) => unitOptions.push(<option key={unit} value={unit} />));
        ConversionUtils.solidConversionMap.forEach((conversion, unit) => unitOptions.push(<option key={unit} value={unit} />));
        return <div className="version" key={this.props.key}>
            <div className="version-content">
            <div className="version-header">
                <div className="basic-info">
                    <div className="name">
                        {this.isEditing ? <textarea placeholder="Name your recipe" value={this.props.version.name}
                            onChange={action((event) => this.props.version.name = event.target.value)} /> : this.props.version.name}
                    </div>
                    <div className="info">
                        <div className="summary">
                            {this.isEditing ? <textarea placeholder="Describe your recipe" value={this.props.version.notes}
                                onChange={action((event) => this.props.version.notes = event.target.value)} /> : this.props.version.notes}
                        </div>
                        <div className="pairings">
                            Pairings
                            {this.props.version.relatedRecipes?.map((pairing, index) =>
                                    this.renderPairing(pairing, () => this.props.version.relatedRecipes?.splice(index, 1))
                                )}
                                <button onClick={action(() => {
                                    this.props.version.relatedRecipes = this.props.version.relatedRecipes || [];
                                    this.props.version.relatedRecipes.push({ id: this.countNew + "", name: "" });
                                    this.countNew++;
                                })}>+</button>
                        </div>
                        <div className="drinks">
                            Drinks
                            {this.props.version.drinkPairings?.map((drink, index) =>
                                    this.renderPairing(drink, () => this.props.version.drinkPairings?.splice(index, 1))
                                )}
                                <button onClick={action(() => {
                                    this.props.version.drinkPairings = this.props.version.drinkPairings || [];
                                    this.props.version.drinkPairings.push({ id: this.countNew + "", name: "" });
                                    this.countNew++
                                })}>+</button>
                        </div>
                    </div>
                </div>
                <div className="ingredients">
                    Ingredients
                        {this.props.version.ingredients?.map((ingredient, index) => <span key={ingredient.id} className="list-row ingredient">
                            <TextInput className="number-input" value={ingredient.quantity} placeholder="Amount"
                                onChange={action((input) => ingredient.quantity = input)}
                                hasError={ConversionUtils.evaluateFraction(ingredient.quantity) === undefined ? "Invalid characters" : undefined} />
                            <TextInput value={ingredient.unit} onChange={action((value) => ingredient.unit = value as any)} list="units" placeholder="Unit" />
        of
        <TextInput value={ingredient.name} onChange={action((value) => ingredient.name = value)} placeholder="Name" />
                            {this.renderDeleteButton(() => this.props.version.ingredients?.splice(index, 1))}
                        </span>)}
                    <button onClick={action(() => {
                        this.props.version.ingredients = this.props.version.ingredients || [];
                        this.props.version.ingredients.push({ id: this.countNew + "" } as Ingredient);
                        this.countNew++;
                    })}>+</button>
                </div>
            </div>
            <div className="steps">
                Steps
                    {this.props.version.instructions?.map((step, index) => <div className="list-row step">
                        {(index + 1) + ". "}
                        {this.isEditing ? <textarea placeholder="Step..." value={this.props.version.instructions[index]}
                        onChange={action((event) => this.props.version.instructions[index] = event.target.value)} /> : step}
                        {this.renderDeleteButton(() => this.props.version.instructions?.splice(index, 1))}
                    </div>)}
                <button onClick={action(() => {
                    this.props.version.instructions = this.props.version.instructions || [];
                    this.props.version.instructions.push("")
                })}>+</button>

            </div>
            <datalist id="units">
                {unitOptions}
            </datalist>
            </div>
            <div className="version-utils">
                Unit converter
                <Converter controller={new ConverterController(true)}/>
            </div>
        </div>
    }
}