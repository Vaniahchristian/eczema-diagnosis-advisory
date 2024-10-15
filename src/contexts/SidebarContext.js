// src/contexts/SidebarContext.js
import { createContext } from "react";

const SidebarContext = createContext({
  expanded: true,
  toggleSidebar: () => {},
});

export default SidebarContext;
