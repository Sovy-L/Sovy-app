
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DesktopNavProps {
  onHowItWorksClick: () => void;
}

const DesktopNav = ({ onHowItWorksClick }: DesktopNavProps) => {
  const { t } = useLanguage();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {t("home")}
      </Link>
      <Link
        to="/browse"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {t("browse")}
      </Link>
      <button
        onClick={onHowItWorksClick}
        className="text-sm font-medium transition-colors hover:text-primary bg-transparent border-none cursor-pointer"
      >
        {t("how_it_works")}
      </button>
      <Link
        to="#"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {t("about_us")}
      </Link>
    </nav>
  );
};

export default DesktopNav;
