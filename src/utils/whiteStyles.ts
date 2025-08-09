export const whiteStyles = {
  input: {
    "& .MuiInputBase-input": {
      color: "white",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.7)",
        opacity: 1,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-focused": {
        color: "white",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },

    "&:not(.Mui-disabled)": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
        borderWidth: "2px",
      },
    },

    "&.Mui-disabled": {
      "& .MuiInputBase-input": {
        WebkitTextFillColor: "rgba(255, 255, 255, 0.7)",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255, 255, 255, 0.3) !important",
      },
      "& .MuiInputLabel-root": {
        color: "rgba(255, 255, 255, 0.5)",
      },
    },
  },
};
