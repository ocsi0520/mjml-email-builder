import { StateNode } from '../StateNode/StateNode';
import { AppVisitorRegister } from '../Register/Visitor/AppVisitorRegister';
import { EBItem } from './EBItem';

// i.e. {
//        'block': `div.block-item { display: flex /*...*/ };`
//        'no-mobile':  `@media (max-width: 600px) { .no-mobile { display: none } }`
//        'button': '...some other css...'
//        'font-abezee': `abezee`
//    }
export type StyleByItemIDOrView = Record<EBItem['itemID'] | string, string>;

export interface MJMLCSSGenerator<SN extends StateNode> {
  getMJML(
    stateNode: SN,
    appMJMLVisitorRegister: AppVisitorRegister<string, StateNode>
  ): string;
  getCSS(
    stateNode: SN,
    appCSSVisitorRegister: AppVisitorRegister<StyleByItemIDOrView, StateNode>
  ): StyleByItemIDOrView;
}
