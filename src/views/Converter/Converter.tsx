
import React from 'react';
import './Converter.css';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { LiquidUnitEnum, SolidUnitEnum, ConversionUtils } from '../utils/ConversionUtils';
import { TextInput } from '../../components/inputs/TextInput';
import { DialogManager } from '../../components/dialog/AppOverlay';
import { IconSources, Icon } from '../../components/Icon';

export class ConverterController {  
    @observable liquidAmountFrom: number = 1;
    @observable fromLiquidUnit: LiquidUnitEnum = LiquidUnitEnum.Cup;
    @observable toLiquidUnit: LiquidUnitEnum = LiquidUnitEnum.FluidOunce;
    cachedLiquidResult: number = 1;
  
    @observable solidAmountFrom: number = 1;
    @observable fromSolidUnit: SolidUnitEnum = SolidUnitEnum.OUNCE;
    @observable toSolidUnit: SolidUnitEnum = SolidUnitEnum.GRAM;
    cachedSolidResult: number = 1;
  }
  
  @observer
  export class Converter extends React.Component<{controller: ConverterController}> { 

    static displayDialog(controller: ConverterController) {
      DialogManager.openDialog({title: "Unit Converter", className: "converter-dlg", content: <Converter controller={controller}/>})
    }
  
    @computed 
    get liquidResult(): number {
      this.props.controller.cachedLiquidResult = ConversionUtils.liquidConvertFromTo(this.props.controller.liquidAmountFrom, this.props.controller.fromLiquidUnit, this.props.controller.toLiquidUnit) || this.props.controller.cachedLiquidResult;
      return this.props.controller.cachedLiquidResult;
    }
  
    @computed 
    get solidResult(): number {
      this.props.controller.cachedSolidResult = ConversionUtils.solidConvertFromTo(this.props.controller.solidAmountFrom, this.props.controller.fromSolidUnit, this.props.controller.toSolidUnit) || this.props.controller.cachedSolidResult;
      return this.props.controller.cachedSolidResult;
    }
  
    @computed
    get solidFromOptions(): React.ReactNode[] {
      let solidConvs = Array.from(ConversionUtils.solidConversionMap.keys());
      solidConvs = this.props.controller.toSolidUnit.indexOf("Cups of") > -1 ? solidConvs.filter((conv) => conv.indexOf("Cups of") === -1) : solidConvs;
      return solidConvs.map((unit) => <option key={unit} value={unit}/>);
    }
  
    @computed
    get solidToOptions(): React.ReactNode[] {
      let solidConvs = Array.from(ConversionUtils.solidConversionMap.keys());
      solidConvs = this.props.controller.fromSolidUnit.indexOf("Cups of") > -1 ? solidConvs.filter((conv) => conv.indexOf("Cups of") === -1) : solidConvs;
      return solidConvs.map((unit) => <option key={unit} value={unit}/>);
    }
  
    render() {
      let liquidOptions: React.ReactNode[] = [];
      ConversionUtils.liquidConversionMap.forEach((conversion, unit) => liquidOptions.push(<option key={unit} value={unit} />));
  
      return <div>
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
            <Icon source={IconSources.FONTAWESOME} name="fa fa-beer"/>
          </div>
          <div className="converter-column-2">
            <input className="number-input" value={this.props.controller.liquidAmountFrom} onChange={action((event) => this.props.controller.liquidAmountFrom = (event.target.value as any))} />
            <TextInput value={this.props.controller.fromLiquidUnit} onChange={action((value) => this.props.controller.fromLiquidUnit = value as any)} list="liquidUnits" />
          </div>
          <div className="converter-column-3">
            <TextInput value={this.props.controller.toLiquidUnit} onChange={action((value) => this.props.controller.toLiquidUnit = value as any)} list="liquidUnits" />
            <div className="result">{this.liquidResult.toPrecision(4)}</div>
          </div>
        </div>
        <datalist id="liquidUnits">
            {liquidOptions}
          </datalist>
        <div className="converter-row-3">
          <div className="converter-column-1">
            <Icon source={IconSources.FONTAWESOME} name="fa fa-balance-scale"/>
          </div>
          <div className="converter-column-2">
            <input className="number-input" value={this.props.controller.solidAmountFrom} onChange={action((event) => this.props.controller.solidAmountFrom = (event.target.value as any))} />
            <TextInput value={this.props.controller.fromSolidUnit} onChange={action((value) => this.props.controller.fromSolidUnit = value as any)} list="solidUnitsFrom" />
          </div>            
          <div className="converter-column-3">
            <TextInput value={this.props.controller.toSolidUnit} onChange={action((value) => this.props.controller.toSolidUnit = value as any)} list="solidUnitsTo" />
            <div className="result">{this.solidResult.toPrecision(4)}</div>
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