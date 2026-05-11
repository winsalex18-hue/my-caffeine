import { Layout } from "@/components/Layout";
import { OrdersTable } from "@/components/OrdersTable";
import { ProductsManager } from "@/components/ProductsManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useClaimOwnership, useGetOwner, useOrders } from "@/hooks/useQueries";
import { LayoutDashboard, LogIn, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      data-ocid="dashboard.login_prompt"
    >
      <LogIn className="w-16 h-16 text-muted-foreground mb-6 opacity-40" />
      <h2 className="text-2xl font-bold text-foreground mb-2">
        تسجيل الدخول مطلوب
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        يجب عليك تسجيل الدخول باستخدام الهوية الرقمية للوصول إلى لوحة التحكم
      </p>
      <Button onClick={onLogin} size="lg" data-ocid="dashboard.login_button">
        <LogIn className="w-4 h-4 ml-2" />
        تسجيل الدخول
      </Button>
    </div>
  );
}

function ClaimOwnershipPrompt({
  onClaim,
  isPending,
}: {
  onClaim: () => void;
  isPending: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      data-ocid="dashboard.claim_prompt"
    >
      <ShieldAlert className="w-16 h-16 text-secondary mb-6" />
      <h2 className="text-2xl font-bold text-foreground mb-2">
        لا يوجد مالك للمتجر
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        لم يتم تعيين مالك لهذا المتجر بعد. اضغط على الزر أدناه لتسجيل نفسك
        كمالك.
      </p>
      <Button
        onClick={onClaim}
        size="lg"
        disabled={isPending}
        data-ocid="dashboard.claim_button"
      >
        <ShieldAlert className="w-4 h-4 ml-2" />
        {isPending ? "جاري التسجيل..." : "تسجيل الملكية"}
      </Button>
    </div>
  );
}

function NotOwnerMessage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      data-ocid="dashboard.not_owner"
    >
      <ShieldAlert className="w-16 h-16 text-destructive mb-6 opacity-60" />
      <h2 className="text-2xl font-bold text-foreground mb-2">غير مصرح لك</h2>
      <p className="text-muted-foreground max-w-sm">
        هذه الصفحة مخصصة لصاحب المتجر فقط. يرجى التواصل مع مدير النظام.
      </p>
    </div>
  );
}

export function DashboardPage() {
  const { isAuthenticated, login, isOwner } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } = useOrders();
  const claimOwnership = useClaimOwnership();
  const { data: ownerPrincipal, isLoading: ownerLoading } = useGetOwner();
  // ownerPrincipal === null means no owner claimed yet
  const noOwnerSet = !ownerLoading && ownerPrincipal === null;

  function handleClaim() {
    claimOwnership.mutate(undefined, {
      onSuccess: (ok) => {
        if (ok)
          toast.success("تم تسجيل الملكية بنجاح! يمكنك الآن إدارة المتجر.");
        else toast.error("فشل تسجيل الملكية — ربما هناك مالك بالفعل.");
      },
      onError: () => toast.error("حدث خطأ أثناء التسجيل"),
    });
  }

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl" dir="rtl">
        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground">
              إدارة متجر سوق الواحة
            </p>
          </div>
        </div>

        {/* Auth / ownership guards */}
        {!isAuthenticated ? (
          <LoginPrompt onLogin={login} />
        ) : !isOwner ? (
          noOwnerSet ? (
            <ClaimOwnershipPrompt
              onClaim={handleClaim}
              isPending={claimOwnership.isPending}
            />
          ) : (
            <NotOwnerMessage />
          )
        ) : (
          <>
            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <StatCard label="إجمالي الطلبيات" value={orders.length} />
              <StatCard label="قيد الانتظار" value={pendingCount} highlight />
              <StatCard
                label="جاري التحضير"
                value={orders.filter((o) => o.status === "preparing").length}
              />
              <StatCard
                label="تم التوصيل"
                value={orders.filter((o) => o.status === "delivered").length}
              />
            </div>

            {/* Main tabs */}
            <Tabs defaultValue="orders" dir="rtl" data-ocid="dashboard.tabs">
              <TabsList className="mb-6">
                <TabsTrigger value="orders" data-ocid="dashboard.orders_tab">
                  الطلبيات
                  {pendingCount > 0 && (
                    <span className="mr-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  data-ocid="dashboard.products_tab"
                >
                  المنتجات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <OrdersTable orders={orders} isLoading={ordersLoading} />
              </TabsContent>

              <TabsContent value="products">
                <ProductsManager />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card-elevated p-4 text-center ${
        highlight ? "border-primary/30 bg-primary/5" : ""
      }`}
    >
      <div
        className={`text-3xl font-bold mb-1 ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
