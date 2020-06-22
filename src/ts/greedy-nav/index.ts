import { Config, defaultConfig } from './Config';

class GreedyNav {
    constructor(config: Config) {
        Object.assign(defaultConfig, config);
    }
}
