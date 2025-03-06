import type mjmlDefaultFunction from 'mjml-core';
import { singletonInstance } from '../common/utils/class.util';
import { CanvasStateNode } from './BuiltInItem/Canvas/CanvasStateNode';
import { AppMJMLVisitorRegister } from './Register/Visitor/AppMJMLVisitorRegister';
import { AppStyleGenerator } from './AppStyleGenerator';

declare const mjml: typeof mjmlDefaultFunction;

// TODO: maybe we need css variables from eb-root
export class AppHTMLGenerator {
  public static getInstance = singletonInstance(this);
  constructor(
    private mjmlVisitorRegister = AppMJMLVisitorRegister.getInstance(),
    private appStyleGenerator = AppStyleGenerator.getInstance()
  ) {}
  // TODO: get lang attribute (directly/indirectly) from eb-root
  public getHTMLFromCanvas(canvasStateNode: CanvasStateNode): string {
    const mjmlData = `<mjml>
      <mj-head>
        <mj-title>${canvasStateNode.state.emailTitle}</mj-title>
        ${this.appStyleGenerator.getMJMLStyles(canvasStateNode)}
      </mj-head>
      <mj-body background-color="${canvasStateNode.state.backgroundColor}">
        ${this.mjmlVisitorRegister.visitNode(canvasStateNode)}
      </mj-body>
    </mjml>`;

    return mjml(mjmlData).html;
  }
}
