import { Box, Typography, Link } from '@mui/material';

export const RegisterFooter = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 1 }}>
      <Typography variant="body2" color="text.secondary">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          variant="body2"
          color="primary"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Faça Login
        </Link>
      </Typography>
    </Box>
  );
};