import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventIcon from '@mui/icons-material/Event';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import InsightsIcon from '@mui/icons-material/Insights';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


interface SidebarContentProps {
  isOpen?: boolean;
  onToggleSidebar?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ isOpen = true, onToggleSidebar = () => {} }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, href: '/dashboard' },
    { text: 'Bankrolls', icon: <AccountBalanceWalletIcon />, href: '/dashboard/bankroll' },
    { text: 'Eventos', icon: <EventIcon />, href: '/dashboard/events' },
    { text: 'Previsões', icon: <SportsSoccerIcon />, href: '/dashboard/predictions' },
    { text: 'Estatísticas', icon: <InsightsIcon />, href: '/dashboard/statistics' },
    { text: 'Meu Perfil', icon: <PersonIcon />, href: '/dashboard/profile' },
    { text: 'Administração', icon: <AdminPanelSettingsIcon />, href: '/dashboard/admin' },
  ];

  return (
    <>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isOpen ? 'flex-start' : 'center', 
        px: 1, 
        color: 'white' 
      }}>
        <IconButton onClick={onToggleSidebar} color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <List sx={{ mt: 0, color: 'white' }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 56,
                  mr: isOpen ? 3 : 0,
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: isOpen ? 1 : 0, 
                  transition: 'opacity 0.3s ease' 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SidebarContent;