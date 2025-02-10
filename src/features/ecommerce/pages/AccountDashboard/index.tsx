import { Home, User, Truck, LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Button from "../../../../shared/components/Button";
import Header from "../../components/ui/Header";
import { useAuth } from "../../../../shared/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShippingAddress,
  getMyProfile,
  ShippingAddressProps,
} from "../../api";
import { Loading } from "../../../../shared/components/Loading";
import { useState } from "react";
import ShippingAddressForm from "../../components/ShippingAddressForm";

export default function AccountDashboard() {
  const queryClient = useQueryClient();
  const { handleLogout } = useAuth();
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
    staleTime: Infinity,
  });

  const createMutation = useMutation({
    mutationFn: createShippingAddress,
    onError: (error) => {
      console.error("Error creating shipping address", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
    },
  });

  const handleAddShippingAddress = async (data: ShippingAddressProps) => {
    try {
      await createMutation.mutateAsync(data);
      setIsShippingOpen(false);
    } catch (error) {
      console.error("Error creating shipping address", error);
    }
  };

  const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        showCart={true}
        showSearch={false}
        headTitle="Account Dashboard"
      />
      <div className="flex mt-[80px]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <h1 className="text-2xl font-semibold mb-6">My Account</h1>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Account Dashboard
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Account Information
              </a>
            </Button>
            <Button
              onClick={() => {
                console.log("Opening Shipping Form...");
                setIsShippingOpen(true);
              }}
              variant="ghost"
              className="w-full justify-start flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Shipping Information
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Hello, {user?.firstName} {user?.lastName}
            </h2>
            {isShippingOpen && (
              <ShippingAddressForm onSubmit={handleAddShippingAddress} />
            )}
            <p className="text-gray-600 mb-8">
              From your My Account Dashboard you have the ability to view a
              snapshot of your recent account activity and update your account
              information. Select a link below to view or edit information.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-black font-medium">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-black">
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-600">waste6989@gmail.com</p>
                  <Button variant="link" className="mt-4 h-auto p-0">
                    Edit →
                  </Button>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-black">
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You have not set a default shipping address.
                  </p>
                  <Button variant="link" className="mt-4 h-auto p-0">
                    Edit →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
