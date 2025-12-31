import { Mail, Info, Code } from "lucide-react";
import { Button } from "./ui/button";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const handleGoogleLogin = () => {
    // Simulate Google login
    setTimeout(() => {
      onLogin();
    }, 500);
  };



  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Note Section */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-blue-900 mb-2">Important Information</h3>
          <p className="text-sm text-blue-800">
            This application helps you manage Gmail messages efficiently. Selected emails are moved to Trash, where Gmail automatically deletes them after 30 days.
            Please double-check your selection before continuing.
          </p>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
        <div className="w-full max-w-md">
          {/* Gmail Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-6 shadow-lg border border-gray-200">
              <Mail className="w-16 h-16 text-[#1a73e8]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-gray-800 mb-2">Gmail Message Deletion Manager</h1>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Efficiently manage and delete your Gmail messages
          </p>



          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-6 rounded flex items-center justify-center gap-3 shadow-sm transition-all hover:shadow-md"
          >
            {/* Google Logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z"
                fill="#4285F4"
              />
              <path
                d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
                fill="#34A853"
              />
              <path
                d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-base">Sign in with Google</span>
          </Button>
        </div>
      </div>

      {/* Developer Info Section */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-gray-800 mb-4">Developer & Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-gray-700 mb-2">About This Application</h4>
              <p className="text-gray-600">
                This tool provides an intuitive interface for managing Gmail messages with bulk deletion capabilities.
                Filter by domain or sender, and manage your inbox efficiently.
              </p>
            </div>
            <div>
              <h4 className="text-gray-700 mb-2">Privacy & Security</h4>
              <p className="text-gray-600">
                Your data is processed securely. This application does not store any personal information or message content.
                All operations are performed directly through Gmail APIs.
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* Contact Information */}
      <div className="mt-6 pt-6 pb-8 border-t border-gray-300">


        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          {/* Email */}
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-2 text-gray-600 hover:text-[#1a73e8] transition-colors"
          >
            <Mail className="w-4 h-4" />
            mukilanb28@gmail.com
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/mukilanb28/gmail-cleaner"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-[#1a73e8] transition-colors"
          >
            <Code className="w-4 h-4" />
            github.com/mukilanb28/gmail-cleaner
          </a>
        </div>
      </div>

    </div>
  );
}
