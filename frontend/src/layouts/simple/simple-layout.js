import { Container } from "@mui/material";

// ----------------------------------------------------------------------

export function SimpleLayout({ children }) {
  return (
    <Container fixed maxWidth="sm" sx={{ marginY: 4 }}>
      {children}
    </Container>
  );
}
