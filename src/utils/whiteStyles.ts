export const whiteStyles = {
  input: {
    "& .MuiInputBase-input": {
      color: "white !important",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.7)",
        opacity: 1,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7) !important",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7) !important",
      "&.Mui-focused": {
        color: "white !important",
      },
      "&.Mui-error": {
        color: "#f44336 !important",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
    "& .MuiFormHelperText-root": {
      color: "rgba(255, 255, 255, 0.7) !important",
      "&.Mui-error": {
        color: "#f44336 !important",
      },
    },

    "&:not(.Mui-disabled)": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
        borderWidth: "2px",
      },
    },

    // Estado de erro
    "&.Mui-error": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#f44336 !important",
      },
    },

    // Estado disabled
    "&.Mui-disabled": {
      "& .MuiInputBase-input": {
        WebkitTextFillColor: "rgba(255, 255, 255, 0.5) !important",
        color: "rgba(255, 255, 255, 0.5) !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.3) !important",
      },
      "& .MuiInputLabel-root": {
        color: "rgba(255, 255, 255, 0.5) !important",
      },
    },
  },

  // Específico para Select
  select: {
    "& .MuiSelect-select": {
      color: "white !important",
    },
    "& .MuiInputBase-input": {
      color: "white !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7) !important",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7) !important",
      "&.Mui-focused": {
        color: "white !important",
      },
    },
    "& .MuiSelect-icon": {
      color: "white !important",
    },
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },

    "&:not(.Mui-disabled)": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white !important",
        borderWidth: "2px",
      },
    },

    "&.Mui-disabled": {
      "& .MuiSelect-select": {
        WebkitTextFillColor: "rgba(255, 255, 255, 0.5) !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.3) !important",
      },
      "& .MuiSelect-icon": {
        color: "rgba(255, 255, 255, 0.5) !important",
      },
    },
  },
};

export const whiteTextField = whiteStyles.input;
export const whiteSelectField = whiteStyles.select;
