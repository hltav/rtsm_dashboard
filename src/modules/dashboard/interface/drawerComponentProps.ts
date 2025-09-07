export interface DrawerComponentProps {
  open: boolean;
  handleDrawerToggle: () => void;
  onMenuItemClick: (key: string) => void;
}