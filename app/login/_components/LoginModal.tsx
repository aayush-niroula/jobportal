"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, redirectTo }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-semibold">You must be logged in</h2>
        <p className="text-gray-600">Log in to access this page and continue.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={() => {
              router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
            }}
          >
            Go to Login
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
