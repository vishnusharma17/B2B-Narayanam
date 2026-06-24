export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F9F6F1] flex items-center justify-center">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Narayanam"
          className="w-32 mx-auto mb-6 animate-pulse"
        />

        <h2 className="text-2xl tracking-[8px] font-light">
          NARAYANAM
        </h2>

        <p className="mt-3 text-gray-500 text-sm">
          Luxury Ethnic Collection
        </p>

        <div className="w-40 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden mx-auto">
          <div className="h-full bg-[#D4AF37] animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
}