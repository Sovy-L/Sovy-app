
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInClick: () => void;
}

export const RegisterModal = ({
  isOpen,
  onClose,
  onSignInClick,
}: RegisterModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await register(fullName, email, password, phoneNumber, address);
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("register")}</DialogTitle>
          <DialogDescription>
            {t("create_account_description")}
          </DialogDescription>
          <Button
            className="absolute right-4 top-4"
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                {t("first_name")}
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder={t("first_name_placeholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                {t("last_name")}
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder={t("last_name_placeholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t("email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              {t("phone_number")}
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              {t("address")}
            </label>
            <Input
              id="address"
              type="text"
              placeholder={t("address_placeholder")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              {t("password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? t("creating_account") : t("register")}
          </Button>
          
          <div className="text-center text-sm">
            <span>{t("already_have_account")}</span>{" "}
            <Button
              variant="link"
              className="h-auto p-0"
              onClick={(e) => {
                e.preventDefault();
                onSignInClick();
              }}
            >
              {t("sign_in")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
