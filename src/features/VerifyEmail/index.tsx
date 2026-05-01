import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Car, ShieldCheck, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startTimer = useCallback((seconds: number) => {
    const expiryTime = Date.now() + seconds * 1000;
    localStorage.setItem("otpExpiry", expiryTime.toString());
    setTimer(seconds);
  }, []);

  useEffect(() => {
    const storedExpiry = localStorage.getItem("otpExpiry");
    if (storedExpiry) {
      const remaining = Math.round((Number(storedExpiry) - Date.now()) / 1000);
      if (remaining > 0) setTimer(remaining);
      else localStorage.removeItem("otpExpiry");
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpExpiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, "");
    if (!value && element.value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (data.length > 0) {
      const newOtp = [...otp];
      data.split("").forEach((char, i) => (newOtp[i] = char));
      setOtp(newOtp);
      inputRefs.current[Math.min(data.length - 1, 5)]?.focus();
    }
  };

  const otpVerifyMutation = useMutation({
    mutationFn: (data: { userOtp: string }) => axiosInstance.post(API_ENDPOINTS.VERIFY_OTP, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Account verified successfully!");
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Verification failed");
    },
  });

  const handleSendOtp = () => {
    const userOtp = otp.join("");
    otpVerifyMutation.mutate({ userOtp });
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      // await axiosInstance.post(API_ENDPOINTS.RESEND_OTP);
      startTimer(60); 
      toast.info("A new code has been sent.");
    } catch (error) {
      toast.error("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    queryClient.setQueryData(["me"], null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={18} className="mr-1" /> Back
        </button>
        <Car className="text-blue-600" size={24} />
      </div>

      <div className="flex flex-1 flex-col items-center px-6 pt-8">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Icon and Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">
              <ShieldCheck size={32} />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Verify your email
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We've sent a 6-digit code to <br />
                <span className="font-semibold text-gray-900 dark:text-gray-200">
                  {user?.email || "your email address"}
                </span>
              </p>
            </div>
          </div>

          {/* OTP Inputs */}
          <div className="space-y-6">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={data}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 text-center text-xl font-bold text-gray-900 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-blue-500"
                />
              ))}
            </div>

            <Button
              className="w-full py-7 text-lg shadow-xl shadow-blue-600/20"
              onClick={handleSendOtp}
              disabled={otpVerifyMutation.isPending || otp.includes("")}
              loading={otpVerifyMutation.isPending}
            >
              Verify & Continue
            </Button>
          </div>

          {/* Resend Logic */}
          <div className="text-center space-y-4">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend code in <span className="font-bold text-blue-600">{formatTime(timer)}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="flex items-center justify-center mx-auto text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                {isResending ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Resend Code"
                )}
              </button>
            )}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-900">
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                Not you? Sign out and use another account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;