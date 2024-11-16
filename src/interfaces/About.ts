export interface TimelineItem {
  date: string;
  label: string;
  company: string;
  city: string;
  keywords: string[];
  summary: string;
  description: string[];
  timelineIcon: string;
  href: string;
}

export interface WorkExperienceCardItemProps {
  item: TimelineItem;
  index: number;
}
