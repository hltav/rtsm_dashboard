export interface SportEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface CustomCarouselProps {
  items: SportEvent[];
  autoPlay?: boolean;
  interval?: number;
}