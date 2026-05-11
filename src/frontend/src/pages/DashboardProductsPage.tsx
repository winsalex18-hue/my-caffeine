import { Layout } from "@/components/Layout";
import { ProductsManager } from "@/components/ProductsManager";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogIn } from "lucide-react";

export function DashboardProductsPage() {
  const { isAuthenticated, login, isOwner } = useAuth();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <LogIn className="w-16 h-16 text-muted-foreground mb-6 opacity-40" />
            <h2 className="text-2xl font-bold mb-2">تسجيل الدخول مطلوب</h2>
            <p className="text-muted-foreground mb-8">
              يجب تسجيل الدخول لإدارة المنتجات
            </p>
            <Button onClick={login} size="lg">
              <LogIn className="w-4 h-4 ml-2" />
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isOwner) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <p className="text-lg font-semibold text-destructive mb-4">
              غير مصرح لكم بالوصول
            </p>
            <Link to="/dashboard">
              <Button variant="outline" data-ocid="products_page.back_button">
                العودة للوحة التحكم
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">
              إدارة المنتجات
            </h1>
          </div>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              data-ocid="products_page.back_button"
            >
              لوحة التحكم
            </Button>
          </Link>
        </div>
        <ProductsManager />
      </div>
    </Layout>
  );
}
