
import React, { createContext, useState, useContext, useEffect } from "react";

type Language = "English" | "French" | "Arabic";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
};

// Extended translations
const translationMap: Record<Language, Record<string, string>> = {
  English: {
    "home": "Home",
    "browse": "Browse Food",
    "how_it_works": "How It Works",
    "about_us": "About Us",
    "sign_in": "Sign In",
    "register": "Register",
    "logout": "Logout",
    "search": "Search",
    "location": "Location",
    "reserve_now": "Reserve Now",
    "congratulations": "Congratulations!",
    "order_confirmed": "Your order has been confirmed!",
    "pickup_info": "You can pick up your food during the specified time window.",
    "back_to_browse": "Back to Browse",
    "set_location": "Set Your Location",
    "use_current_location": "Use Current Location",
    "enter_location_placeholder": "Enter address, city, or zip code",
    "location_detected": "Location detected!",
    "location_error": "Couldn't get your location. Please try again.",
    "geolocation_not_supported": "Geolocation is not supported by your browser.",
    "find_food_near_me": "Find Food Near Me",
    "discover_food": "Discover Food Near You",
    "ready_to_reduce": "Ready to Reduce Food Waste?",
    "join_thousands": "Join thousands of users who are already saving food, money, and the planet.",
    "find_food_now": "Find Food Now",
    "save_money": "Save Money",
    "reduce_waste": "Reduce Waste",
    "support_local": "Support Local",
    "get_delicious": "Get delicious food for a fraction of the original price.",
    "help_businesses": "Help businesses reduce food waste and be part of the solution.",
    "support_local_businesses": "Support local businesses in your community.",
    "save_food": "Save Food, Save Money, Save Planet",
    "rescue_delicious": "Rescue Delicious Food At Amazing Prices",
    "join_movement": "Join the movement to reduce food waste by connecting with local businesses offering surplus food at a discount.",
    "how_it_works_heading": "How It Works",
    "save_food_steps": "Save food from going to waste in three simple steps.",
    "find_nearby": "Find Nearby Deals",
    "discover_restaurants": "Discover restaurants and stores with surplus food in your area.",
    "reserve_pay": "Reserve and Pay",
    "select_favorite": "Select your favorite items and pay directly through the app.",
    "pickup_time": "Pickup Time",
    "collect_food": "Collect your food during the specified timeframe. No waiting in line.",
    "why_choose": "Why Choose SaveFood",
    "explore_delicious": "Explore delicious food from local restaurants and stores at amazing prices.",
    "browse_all": "Browse All Food",
  },
  French: {
    "home": "Accueil",
    "browse": "Explorer la Nourriture",
    "how_it_works": "Comment Ça Marche",
    "about_us": "À Propos",
    "sign_in": "Connexion",
    "register": "S'inscrire",
    "logout": "Déconnexion",
    "search": "Rechercher",
    "location": "Emplacement",
    "reserve_now": "Réserver Maintenant",
    "congratulations": "Félicitations !",
    "order_confirmed": "Votre commande a été confirmée !",
    "pickup_info": "Vous pouvez récupérer votre nourriture pendant la période spécifiée.",
    "back_to_browse": "Retour à l'exploration",
    "set_location": "Définir Votre Emplacement",
    "use_current_location": "Utiliser l'Emplacement Actuel",
    "enter_location_placeholder": "Entrez l'adresse, la ville ou le code postal",
    "location_detected": "Emplacement détecté !",
    "location_error": "Impossible d'obtenir votre emplacement. Veuillez réessayer.",
    "geolocation_not_supported": "La géolocalisation n'est pas prise en charge par votre navigateur.",
    "find_food_near_me": "Trouver de la Nourriture Près de Moi",
    "discover_food": "Découvrez la Nourriture Près de Vous",
    "ready_to_reduce": "Prêt à Réduire le Gaspillage Alimentaire ?",
    "join_thousands": "Rejoignez des milliers d'utilisateurs qui économisent déjà de la nourriture, de l'argent et la planète.",
    "find_food_now": "Trouver de la Nourriture Maintenant",
    "save_money": "Économiser de l'Argent",
    "reduce_waste": "Réduire le Gaspillage",
    "support_local": "Soutenir le Local",
    "get_delicious": "Obtenez de la nourriture délicieuse pour une fraction du prix original.",
    "help_businesses": "Aidez les entreprises à réduire le gaspillage alimentaire et faites partie de la solution.",
    "support_local_businesses": "Soutenez les entreprises locales de votre communauté.",
    "save_food": "Sauvez la Nourriture, Économisez de l'Argent, Sauvez la Planète",
    "rescue_delicious": "Sauvez des Aliments Délicieux à des Prix Incroyables",
    "join_movement": "Rejoignez le mouvement pour réduire le gaspillage alimentaire en vous connectant avec des entreprises locales offrant des surplus alimentaires à prix réduit.",
    "how_it_works_heading": "Comment Ça Marche",
    "save_food_steps": "Sauvez la nourriture du gaspillage en trois étapes simples.",
    "find_nearby": "Trouvez des Offres à Proximité",
    "discover_restaurants": "Découvrez des restaurants et des magasins avec des surplus alimentaires dans votre région.",
    "reserve_pay": "Réservez et Payez",
    "select_favorite": "Sélectionnez vos articles préférés et payez directement via l'application.",
    "pickup_time": "Heure de Retrait",
    "collect_food": "Récupérez votre nourriture pendant la période spécifiée. Pas d'attente en file.",
    "why_choose": "Pourquoi Choisir SaveFood",
    "explore_delicious": "Explorez de la nourriture délicieuse de restaurants et magasins locaux à des prix incroyables.",
    "browse_all": "Explorer Toute la Nourriture",
  },
  Arabic: {
    "home": "الرئيسية",
    "browse": "تصفح الطعام",
    "how_it_works": "كيف يعمل",
    "about_us": "من نحن",
    "sign_in": "تسجيل الدخول",
    "register": "التسجيل",
    "logout": "تسجيل الخروج",
    "search": "بحث",
    "location": "الموقع",
    "reserve_now": "احجز الآن",
    "congratulations": "تهانينا!",
    "order_confirmed": "تم تأكيد طلبك!",
    "pickup_info": "يمكنك استلام طعامك خلال الفترة الزمنية المحددة.",
    "back_to_browse": "العودة إلى التصفح",
    "set_location": "تحديد موقعك",
    "use_current_location": "استخدم الموقع الحالي",
    "enter_location_placeholder": "أدخل العنوان أو المدينة أو الرمز البريدي",
    "location_detected": "تم اكتشاف الموقع!",
    "location_error": "تعذر الحصول على موقعك. يرجى المحاولة مرة أخرى.",
    "geolocation_not_supported": "تحديد الموقع الجغرافي غير مدعوم من متصفحك.",
    "find_food_near_me": "ابحث عن طعام بالقرب مني",
    "discover_food": "اكتشف الطعام بالقرب منك",
    "ready_to_reduce": "هل أنت مستعد للحد من هدر الطعام؟",
    "join_thousands": "انضم إلى آلاف المستخدمين الذين يوفرون بالفعل الطعام والمال والكوكب.",
    "find_food_now": "ابحث عن الطعام الآن",
    "save_money": "وفر المال",
    "reduce_waste": "قلل الهدر",
    "support_local": "ادعم المحلي",
    "get_delicious": "احصل على طعام لذيذ بجزء بسيط من السعر الأصلي.",
    "help_businesses": "ساعد الشركات في تقليل هدر الطعام وكن جزءًا من الحل.",
    "support_local_businesses": "ادعم الشركات المحلية في مجتمعك.",
    "save_food": "وفر الطعام، وفر المال، أنقذ الكوكب",
    "rescue_delicious": "أنقذ طعامًا لذيذًا بأسعار مذهلة",
    "join_movement": "انضم إلى حركة الحد من هدر الطعام من خلال التواصل مع الشركات المحلية التي تقدم فائض الطعام بخصم.",
    "how_it_works_heading": "كيف يعمل",
    "save_food_steps": "حافظ على الطعام من الهدر في ثلاث خطوات بسيطة.",
    "find_nearby": "ابحث عن العروض القريبة",
    "discover_restaurants": "اكتشف المطاعم والمتاجر التي تقدم فائض الطعام في منطقتك.",
    "reserve_pay": "احجز وادفع",
    "select_favorite": "اختر العناصر المفضلة لديك وادفع مباشرة من خلال التطبيق.",
    "pickup_time": "وقت الاستلام",
    "collect_food": "اجمع طعامك خلال الإطار الزمني المحدد. لا انتظار في الطابور.",
    "why_choose": "لماذا تختار SaveFood",
    "explore_delicious": "استكشف طعامًا لذيذًا من المطاعم والمتاجر المحلية بأسعار مذهلة.",
    "browse_all": "تصفح جميع الأطعمة",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "English";
  });

  const [translations, setTranslations] = useState(translationMap[language]);

  useEffect(() => {
    setTranslations(translationMap[language]);
    localStorage.setItem("language", language);
    
    // For Arabic, add RTL class to the document
    if (language === "Arabic") {
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.classList.remove("rtl");
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
