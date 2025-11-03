import React from "react";
import ReactCountryFlag from "react-country-flag";


export const getCountryFlag = (countryCode?: string, size: number = 15) => {
  if (!countryCode) return null;
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: size,
        height: size,
      }}
      title={countryCode}
    />
  );
};
