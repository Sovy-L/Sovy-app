
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, LogOut, Settings, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock payment methods for demonstration
const PAYMENT_METHODS = [
  {
    id: "card-001",
    cardType: "Visa",
    lastFour: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "card-002",
    cardType: "Mastercard",
    lastFour: "8888",
    expiry: "08/24",
    isDefault: false,
  },
];

const Profile = () => {
  const { user, isAuthenticated, logout, purchases, totalSaved } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!isAuthenticated) {
      navigate("/");
    }
    
    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6">{t("my_profile")}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar with user info */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{t("total_orders")}</div>
                      <div className="font-medium">{purchases.length}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{t("total_saved")}</div>
                      <div className="font-medium text-green-600">${totalSaved.toFixed(2)}</div>
                    </div>
                    <Separator />
                    <Button 
                      variant="destructive" 
                      className="w-full" 
                      onClick={() => logout()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("logout")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-9">
              <Tabs defaultValue="orders">
                <TabsList className="mb-6">
                  <TabsTrigger value="orders">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {t("order_history")}
                  </TabsTrigger>
                  <TabsTrigger value="payment">
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t("payment_methods")}
                  </TabsTrigger>
                  <TabsTrigger value="account">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("account_settings")}
                  </TabsTrigger>
                </TabsList>
                
                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("order_history")}</CardTitle>
                      <CardDescription>
                        {t("view_all_orders")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {purchases.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">{t("no_orders_yet")}</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {purchases.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                  <h3 className="font-medium">{order.foodName}</h3>
                                  <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                                </div>
                                <div className="text-sm mt-2 md:mt-0 md:text-right">
                                  <p>{new Date(order.date).toLocaleDateString()}</p>
                                  <p className="font-medium">#{order.id}</p>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t">
                                <div className="flex items-center gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t("original_price")}</p>
                                    <p className="line-through">${order.originalPrice.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">{t("you_paid")}</p>
                                    <p className="font-medium">${order.paidPrice.toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                  <p className="text-sm text-muted-foreground">{t("you_saved")}</p>
                                  <p className="font-medium text-green-600">${order.saved.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Payment Methods Tab */}
                <TabsContent value="payment" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("payment_methods")}</CardTitle>
                      <CardDescription>
                        {t("manage_payment_methods")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {PAYMENT_METHODS.map((card) => (
                          <div key={card.id} className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {card.cardType} •••• {card.lastFour}
                                </p>
                                <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {card.isDefault && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {t("default")}
                                </span>
                              )}
                              <Button variant="outline" size="sm">
                                {t("edit")}
                              </Button>
                              {!card.isDefault && (
                                <Button variant="ghost" size="sm">
                                  {t("make_default")}
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                        <Button className="w-full mt-4">
                          {t("add_payment_method")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Account Settings Tab */}
                <TabsContent value="account" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("account_details")}</CardTitle>
                      <CardDescription>
                        {t("update_your_account_information")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">{t("first_name")}</label>
                            <Input 
                              defaultValue={user.name?.split(" ")[0] || ""} 
                              className="w-full" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">{t("last_name")}</label>
                            <Input 
                              defaultValue={user.name?.split(" ")[1] || ""} 
                              className="w-full" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">{t("email")}</label>
                            <Input 
                              type="email" 
                              defaultValue={user.email} 
                              className="w-full" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">{t("phone_number")}</label>
                            <Input 
                              type="tel" 
                              defaultValue={user.phoneNumber || ""} 
                              className="w-full" 
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">{t("address")}</label>
                            <Input 
                              defaultValue={user.address || ""} 
                              className="w-full" 
                            />
                          </div>
                        </div>
                        <Button type="submit" className="mt-4">
                          {t("save_changes")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("password")}</CardTitle>
                      <CardDescription>
                        {t("change_your_password")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t("current_password")}</label>
                          <Input type="password" className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t("new_password")}</label>
                          <Input type="password" className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t("confirm_new_password")}</label>
                          <Input type="password" className="w-full" />
                        </div>
                        <Button type="submit" className="mt-4">
                          {t("update_password")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
