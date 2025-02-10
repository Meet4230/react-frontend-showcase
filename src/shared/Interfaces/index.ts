interface Avtar {
  url: string;
}

export interface User {
  username: string;
  avatar: Avtar;
  role: string;
  email: string;
  accessToken: string;
}

export interface DashboardCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary" | "danger" | "ghost" | "link";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  asChild?: boolean;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface INavProps {
  user: User | null;
  handleLogout: () => void;
  handleToggle: () => void;
  isOpen: boolean;
}

export interface INavMobileProps {
  user: User | null;
  handleLogout: () => void;
  isOpen: boolean;
}
