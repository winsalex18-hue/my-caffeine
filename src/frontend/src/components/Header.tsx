import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";

export function Header() {
  const { isLoggedIn, login, logout, isOwner } = useAuth();
  const { totalItems } = useCartContext();
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle"
      data-ocid="header"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-display font-bold text-xl hover:opacity-80 transition-smooth"
          data-ocid="header.logo_link"
        >
          <Store className="w-6 h-6" />
          <span>سوق الواحة</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Dashboard link — owner only */}
          {isOwner && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/dashboard" })}
              className="hidden sm:flex gap-1.5 text-muted-foreground hover:text-primary"
              data-ocid="header.dashboard_link"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة التحكم</span>
            </Button>
          )}

          {/* Cart button with count badge */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate({ to: "/cart" })}
            aria-label="عربة التسوق"
            data-ocid="header.cart_button"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs bg-primary text-primary-foreground rounded-full"
                data-ocid="header.cart_badge"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          {/* Auth */}
          {isLoggedIn ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-1.5"
              data-ocid="header.logout_button"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">خروج</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={login}
              className="gap-1.5 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
              data-ocid="header.login_button"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">تسجيل الدخول</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
