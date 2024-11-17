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

export interface AboutCardProps {
  title: string;
  subtitle: string;
  paragraphs: string[];
  imgName: string;
}
