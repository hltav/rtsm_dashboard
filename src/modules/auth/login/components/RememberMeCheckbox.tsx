import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          color="primary"
          size="small"
        />
      }
      label="Lembrar-me"
    />
  );
};

export default RememberMeCheckbox;
