
import React from 'react';
import './Converter.css';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { LiquidUnitEnum, SolidUnitEnum, ConversionUtils } from '../utils/ConversionUtils';
import { TextInput } from '../../components/inputs/TextInput';
import { DialogManager } from '../../components/dialog/AppOverlay';
import { IconSources, Icon } from '../../components/Icon';

export class ConverterController {
  @observable liquidFrom: string = "1";
  @observable fromLiquidUnit: LiquidUnitEnum = LiquidUnitEnum.Cup;
  @observable toLiquidUnit: LiquidUnitEnum = LiquidUnitEnum.FluidOunce;
  cachedLiquidResult: number = 1;

  @observable solidFrom: string = "1";
  @observable fromSolidUnit: SolidUnitEnum = SolidUnitEnum.OUNCE;
  @observable toSolidUnit: SolidUnitEnum = SolidUnitEnum.GRAM;
  cachedSolidResult: number = 1;

  constructor(public renderAsCalculator: boolean = false) {
  }

  @observable converterTypeVol: boolean = true;

  @computed
  get liquidAmountFrom(): number | undefined {
    return ConversionUtils.evaluateFraction(this.liquidFrom);
  }

  @computed
  get solidAmountFrom(): number | undefined {
    return ConversionUtils.evaluateFraction(this.solidFrom);
  }

  
  @computed
  get liquidResult(): number {
    if (this.liquidAmountFrom) {
      this.cachedLiquidResult = ConversionUtils.liquidConvertFromTo(this.liquidAmountFrom, this.fromLiquidUnit, this.toLiquidUnit) || this.cachedLiquidResult;
    }
    return this.cachedLiquidResult;
  }

  @computed
  get solidResult(): number {
    if (this.solidAmountFrom) {
      this.cachedSolidResult = ConversionUtils.solidConvertFromTo(this.solidAmountFrom, this.fromSolidUnit, this.toSolidUnit) || this.cachedSolidResult;
    }
    return this.cachedSolidResult;
  }
}

@observer
export class Converter extends React.Component<{ controller: ConverterController }> {

  static displayDialog(controller: ConverterController) {
    DialogManager.getManager().openDialog({ title: "Unit Converter", className: "converter-dlg", content: <Converter controller={controller} />, key: "converter" })
  }

  @computed
  get solidFromOptions(): React.ReactNode[] {
    let solidConvs = Array.from(ConversionUtils.solidConversionMap.keys());
    solidConvs = this.props.controller.toSolidUnit.indexOf("Cups of") > -1 ? solidConvs.filter((conv) => conv.indexOf("Cups of") === -1) : solidConvs;
    return solidConvs.map((unit) => <option key={unit} value={unit} />);
  }

  @computed
  get solidToOptions(): React.ReactNode[] {
    let solidConvs = Array.from(ConversionUtils.solidConversionMap.keys());
    solidConvs = this.props.controller.fromSolidUnit.indexOf("Cups of") > -1 ? solidConvs.filter((conv) => conv.indexOf("Cups of") === -1) : solidConvs;
    return solidConvs.map((unit) => <option key={unit} value={unit} />);
  }

  renderNewConverter() {
    let liquidOptions: React.ReactNode[] = [];
    ConversionUtils.liquidConversionMap.forEach((conversion, unit) => liquidOptions.push(<option key={unit} value={unit} />));
    return <div className="calculator-converter">
      <div className="type-converter" onClick={action(() => this.props.controller.converterTypeVol = !this.props.controller.converterTypeVol)}>
        <div className={"type-toggle" + (this.props.controller.converterTypeVol ? " active" : "")}> VOL </div>
        <div className={"type-toggle" + (this.props.controller.converterTypeVol ? "" : " active")}> WT </div>
      </div>
      <div className="calc-display">
          <div className="calc-from">
         <TextInput className="number-input" value={this.props.controller.converterTypeVol ? this.props.controller.liquidFrom : this.props.controller.solidFrom}
            onChange={action((input) => {
              if (this.props.controller.converterTypeVol) {
                this.props.controller.liquidFrom = input
              } else {
                this.props.controller.solidFrom = input;
              }
              }
              )}
            hasError={(this.props.controller.converterTypeVol ? !this.props.controller.liquidAmountFrom : !this.props.controller.solidAmountFrom) ? "Invalid characters" : undefined} />
        <TextInput value={this.props.controller.converterTypeVol ? this.props.controller.fromLiquidUnit : this.props.controller.fromSolidUnit} 
        onChange={action((value) => {
          if (this.props.controller.converterTypeVol) {
            this.props.controller.fromLiquidUnit = value as any
          } else {
            this.props.controller.fromSolidUnit = value as any
          }
          })} list={this.props.controller.converterTypeVol ? "liquidUnits" : "solidUnitsFrom"} />
        </div>
        <div className="calc-to">
        To
        <TextInput value={this.props.controller.converterTypeVol ? this.props.controller.toLiquidUnit : this.props.controller.toSolidUnit} 
        onChange={action((value) => {
          if (this.props.controller.converterTypeVol) {
            this.props.controller.toLiquidUnit = value as any
          } else {
            this.props.controller.toSolidUnit = value as any
          }
          })} list={this.props.controller.converterTypeVol ? "liquidUnits" : "solidUnitsTo"} />
        </div>
        <div className="calc-result">
          {this.props.controller.converterTypeVol ? this.props.controller.liquidResult.toPrecision(4) : this.props.controller.solidResult.toPrecision(4)}
        </div>
        </div>
        <datalist id="solidUnitsFrom">
        {this.solidFromOptions}
      </datalist>
      <datalist id="solidUnitsTo">
        {this.solidToOptions}
      </datalist>
      <datalist id="liquidUnits">
        {liquidOptions}
      </datalist>
    </div>
  }

  render() {
    let liquidOptions: React.ReactNode[] = [];
    ConversionUtils.liquidConversionMap.forEach((conversion, unit) => liquidOptions.push(<option key={unit} value={unit} />));

    return this.props.controller.renderAsCalculator ? this.renderNewConverter() : <div>
      <div className="converter-row-1">
        <div className="converter-column-1"></div>
        <div className="converter-column-2">
          FROM
          </div>
        <div className="converter-column-3">
          TO
          </div>
      </div>
      <div className="converter-row-2">
        <div className="converter-column-1">
          <Icon source={IconSources.FONTAWESOME} name="fa fa-beer" />
        </div>
        <div className="converter-column-2">
          <TextInput className="number-input" value={this.props.controller.liquidFrom}
            onChange={action((input) => this.props.controller.liquidFrom = input)}
            hasError={this.props.controller.liquidAmountFrom === undefined ? "Invalid characters" : undefined} />
          <TextInput value={this.props.controller.fromLiquidUnit} onChange={action((value) => this.props.controller.fromLiquidUnit = value as any)} list="liquidUnits" />
        </div>
        <div className="converter-column-3">
          <TextInput value={this.props.controller.toLiquidUnit} onChange={action((value) => this.props.controller.toLiquidUnit = value as any)} list="liquidUnits" />
          <div className="result">{this.props.controller.liquidResult.toPrecision(4)}</div>
        </div>
      </div>
      <datalist id="liquidUnits">
        {liquidOptions}
      </datalist>
      <div className="converter-row-3">
        <div className="converter-column-1">
          <Icon source={IconSources.FONTAWESOME} name="fa fa-balance-scale" />
        </div>
        <div className="converter-column-2">
          <TextInput className="number-input" value={this.props.controller.solidFrom}
            onChange={action((input) => this.props.controller.solidFrom = input)}
            hasError={this.props.controller.solidAmountFrom === undefined ? "Invalid characters" : undefined} />
          <TextInput value={this.props.controller.fromSolidUnit} onChange={action((value) => this.props.controller.fromSolidUnit = value as any)} list="solidUnitsFrom" />
        </div>
        <div className="converter-column-3">
          <TextInput value={this.props.controller.toSolidUnit} onChange={action((value) => this.props.controller.toSolidUnit = value as any)} list="solidUnitsTo" />
          <div className="result">{this.props.controller.solidResult.toPrecision(4)}</div>
        </div>
      </div>
      <datalist id="solidUnitsFrom">
        {this.solidFromOptions}
      </datalist>
      <datalist id="solidUnitsTo">
        {this.solidToOptions}
      </datalist>
    </div>
  }
}