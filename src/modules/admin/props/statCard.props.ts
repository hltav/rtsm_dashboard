type StatCardColor = "success" | "error";

export type StatCardProps = {
  title: string;
  value: string;
  change: string;
  color: StatCardColor;
};
