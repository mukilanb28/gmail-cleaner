


export function GmailLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent
            border-t-[#4285F4]
            border-r-[#EA4335]
            border-b-[#FBBC05]
            border-l-[#34A853]
            animate-spin"
          />

          {/* Gmail logo */}
          <svg
            width="36"
            height="28"
            viewBox="0 0 512 512"
            className="z-10"
          >
            <path
              fill="#EA4335"
              d="M502.3 190.8L327.4 338.1c-21.8 18.2-53.1 18.2-74.9 0L9.7 190.8V462c0 27.6 22.4 50 50 50h392.6c27.6 0 50-22.4 50-50V190.8z"
            />
            <path
              fill="#FBBC05"
              d="M502.3 150.6v40.2L327.4 338.1c-21.8 18.2-53.1 18.2-74.9 0L9.7 190.8v-40.2l246.1 162.9L502.3 150.6z"
            />
            <path
              fill="#34A853"
              d="M9.7 150.6L256 313.5l246.3-162.9L452.3 90c-9.3-6.7-20.6-10-32.1-10H91.8c-11.5 0-22.8 3.3-32.1 10L9.7 150.6z"
            />
            <path
              fill="#4285F4"
              d="M9.7 190.8L59.7 230V90l-50 40.6zM502.3 190.8L452.3 230V90l50 40.6z"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}
