
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Package, ShoppingBag, Store, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

interface MerchantDashboardProps {
  children?: React.ReactNode;
}

export const MerchantDashboard = ({ children }: MerchantDashboardProps) => {
  const { user, business, purchases, isAuthenticated, isMerchant, getBusinessStats } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated or not a merchant
    if (!isAuthenticated || !isMerchant) {
      navigate("/");
    }
  }, [isAuthenticated, isMerchant, navigate]);
  
  if (!business) {
    return null;
  }
  
  const stats = getBusinessStats();
  
  const pendingOrders = purchases.filter(p => p.status === "pending");
  
  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Business Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Manage Food Items
          </Button>
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            New Food Basket
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="food-items">Food Baskets</TabsTrigger>
          <TabsTrigger value="settings">Business Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  +20% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Orders
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingOrders.length} to prepare today
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Baskets
                </CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{business.availableBaskets}</div>
                <p className="text-xs text-muted-foreground">
                  Set in business settings
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You have {pendingOrders.length} pending orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No pending orders.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm font-medium">{order.foodName}</p>
                            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">${order.paidPrice.toFixed(2)}</p>
                          <Button variant="outline" size="sm">Manage</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Your sales performance over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground">
                  <BarChart className="h-10 w-10" />
                  <p className="mt-2">Sales chart will be shown here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Orders</CardTitle>
              <CardDescription>
                View and process customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {purchases.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {purchases.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{order.foodName}</h3>
                          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                        </div>
                        <div className="text-sm mt-2 md:mt-0 md:text-right">
                          <p>{new Date(order.date).toLocaleDateString()}</p>
                          <p className="font-medium">Status: {order.status}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Customer paid</p>
                            <p className="font-medium">${order.paidPrice.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Payment method</p>
                            <p className="font-medium">{order.paymentMethod || "Card"}</p>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          {order.status === "pending" ? (
                            <Button size="sm">Mark as Ready</Button>
                          ) : order.status === "ready" ? (
                            <Button size="sm" variant="outline">Complete Order</Button>
                          ) : (
                            <span className="text-sm text-green-600">Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="food-items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Food Baskets</CardTitle>
              <CardDescription>
                Add and manage your food baskets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <h3 className="text-xl font-medium">No food baskets yet</h3>
                <p className="text-muted-foreground mt-2">
                  Create your first food basket to start selling on SaveFood
                </p>
                <Button className="mt-4">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add New Food Basket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>
                Manage your business information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Business Information</h3>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Business Name</p>
                      <p>{business.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p>{business.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p>{business.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p>{business.phoneNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">About Your Business</h3>
                  <Separator className="my-2" />
                  <p>{business.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Payment Information</h3>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Account Name</p>
                      <p>{business.bankDetails.accountName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Account Number</p>
                      <p>XXXX-{business.bankDetails.accountNumber}</p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4">Edit Business Information</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {children}
    </div>
  );
};

export default MerchantDashboard;
