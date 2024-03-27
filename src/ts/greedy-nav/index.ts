import GreedyNav, { GreedyNavMenu } from './GreedyNav';
import { defaultConfig, Config } from './Config';

export function initGreedyNav(options: Config = defaultConfig) {
  GreedyNav.init(options);
}

export { defaultConfig, Config, GreedyNav, GreedyNavMenu };
export default GreedyNav;
