import { Search } from "@mui/icons-material";
import { StyledInputBase } from "@/lib/ui/styled-input-base";
import SearchIcon from "@mui/icons-material/Search";
import { SearchIconWrapper } from "./search-icon-wrapper";

export const SearchInput: React.FC = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Pesquisar…"
        inputProps={{ "aria-label": "pesquisar" }}
      />
    </Search>
  );
};
