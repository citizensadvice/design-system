import { initNavigation } from "../navigation";

// Delegate to new navigation script for backwards compatibility
const GreedyNav = {
  init: (_options = {}) => {
    console.warn("Deprecated: use initNavigation instead");
    initNavigation();
  },
};

export default GreedyNav;
