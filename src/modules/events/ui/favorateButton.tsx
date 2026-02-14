import { IconButton } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

interface FavorateButtonProps {
  isFavorite: boolean;
  onToggle: (event: React.MouseEvent) => void;
  className?: string;
}

export const FavoriteLeagueButton = ({
  isFavorite,
  onToggle,
  className,
}: FavorateButtonProps) => {
  return (
    <IconButton
      size="small"
      className={className}
      onClick={(event) => {
        event.stopPropagation();
        onToggle(event); // ← passe o evento aqui
      }}
      sx={{
        opacity: isFavorite ? 1 : 0,
        transition: "0.2s",
      }}
    >
      {isFavorite ? (
        <StarRoundedIcon sx={{ fontSize: 20, color: "#E0A800" }} />
      ) : (
        <StarOutlineRoundedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
      )}
    </IconButton>
  );
};
