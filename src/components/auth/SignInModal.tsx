
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

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onMerchantRegisterClick: () => void;
}

export const SignInModal = ({ isOpen, onClose, onRegisterClick, onMerchantRegisterClick }: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("sign_in")}</DialogTitle>
          <DialogDescription>
            Enter your email and password to sign in to your account.
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
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
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
            <label htmlFor="password" className="text-sm font-medium">
              Password
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
            {isLoading ? "Signing in..." : t("sign_in")}
          </Button>
          
          <div className="flex flex-col space-y-2 text-center text-sm">
            <div>
              <span>Don't have an account?</span>{" "}
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={(e) => {
                  e.preventDefault();
                  onRegisterClick();
                }}
              >
                {t("register")}
              </Button>
            </div>
            <div>
              <span>Want to sell on SaveFood?</span>{" "}
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={(e) => {
                  e.preventDefault();
                  onMerchantRegisterClick();
                }}
              >
                Register as a merchant
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
