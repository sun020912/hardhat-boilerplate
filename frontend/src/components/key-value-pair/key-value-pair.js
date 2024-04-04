import { Stack, Typography } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

export function KeyValuePair({ title, content }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="subtitle1" color="GrayText">
        {title}:
      </Typography>

      <Typography variant="body1">{content}</Typography>
    </Stack>
  );
}
