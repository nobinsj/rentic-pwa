import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Lock,
  Phone,
  CreditCard,
  Image as ImageIcon,
  Car,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterMutation = useMutation({
    mutationFn: (data: any) => api.post(API_ENDPOINTS.USER_REGISTER, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      const expiry = Date.now() + 300 * 1000;
      localStorage.setItem("otpExpiry", expiry.toString());
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Register Error");
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const data = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      mobileNumber: formData.mobile,
      licenseNumber: formData.licenseNumber,
    };

    handleRegisterMutation.mutate(data);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen bg-white dark:bg-gray-950 flex flex-col ">
      {/* Optional: Simple Top Navigation for PWA */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400"
          onClick={goToLogin}
        >
          <ChevronLeft size={18} className="mr-1" /> Back
        </button>
        <Car className="text-blue-600" size={24} />
      </div>

      <div className="flex flex-1 overflow-y-auto flex-col items-center px-6 pb-12 pt-4">
        <div className="w-full max-w-[600px] space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Create your account
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Join Rentic today and hit the road in minutes.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="e.g. Nobin S Johns"
                  leftIcon={<User size={18} />}
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  leftIcon={<Mail size={18} />}
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+91 98765 43210"
                  leftIcon={<Phone size={18} />}
                  required
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">Driving License No.</Label>
                <Input
                  id="license"
                  placeholder="KL-01-XXXXXXXXXX"
                  leftIcon={<CreditCard size={18} />}
                  required
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseNumber: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  leftIcon={<Lock size={18} />}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  leftIcon={<Lock size={18} />}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Optional License Photo Upload */}
            <div className="space-y-2 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <Label htmlFor="licensePhoto" className="mb-2 block">
                Driving License Photo{" "}
                <span className="text-xs font-normal text-gray-500">
                  (Optional)
                </span>
              </Label>
              <Input
                id="licensePhoto"
                type="file"
                accept="image/*"
                className="h-auto border-none bg-transparent p-0 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-bold file:text-blue-600 file:shadow-sm hover:file:bg-blue-50 dark:file:bg-gray-800"
                leftIcon={<ImageIcon size={18} />}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-7 text-lg shadow-xl shadow-blue-600/20"
                loading={handleRegisterMutation.isPending}
              >
                Create Account <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </form>

          {/* Footer Navigation */}
          <div className="flex flex-col items-center space-y-4 pt-4 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <button
                className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                onClick={goToLogin}
              >
                Sign In
              </button>
            </p>
            <p className="max-w-[300px] text-center text-xs leading-relaxed text-gray-400">
              By creating an account, you agree to Rentic's{" "}
              <button className="underline">Terms of Service</button> and{" "}
              <button className="underline">Privacy Policy</button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
