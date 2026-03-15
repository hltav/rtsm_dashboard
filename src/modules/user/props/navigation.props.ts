export interface NavigationProps {
  open: boolean;
  mobileOpen: boolean;
  darkMode: boolean;
  isDesktop: boolean;
  handleDrawerToggle: () => void;
  handleThemeToggle: () => void;
  drawerWidth?: number;
  collapsedWidth?: number;
}
