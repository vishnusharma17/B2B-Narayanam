"use client";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#F9F6F1] overflow-hidden">
      {/* GOLD GLOW */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[450px]
          h-[450px]
          bg-[#D4AF37]/20
          blur-[120px]
          rounded-full
        "
      />

      {/* CONTENT */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center relative z-10">
          {/* LOGO */}
          <div className="mb-8 animate-[pulse_2s_ease-in-out_infinite]">
            <img
              src="/logo.png"
              alt="Narayanam"
              className="
                w-28
                sm:w-36
                mx-auto
                object-contain
              "
            />
          </div>

<div className="mt-8 flex justify-center gap-2">
  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
  <span
    className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"
    style={{ animationDelay: "0.2s" }}
  />
  <span
    className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"
    style={{ animationDelay: "0.4s" }}
  />
</div>
          {/* BRAND */}
          <h1
            className="
              text-3xl
              sm:text-5xl
              font-light
              tracking-[10px]
              text-black
            "
          >
            NARAYANAM
          </h1>

          <p
            className="
              mt-4
              text-[#B68D40]
              tracking-[5px]
              uppercase
              text-xs
              sm:text-sm
            "
          >
            Premium Ethnic Collection
          </p>

          {/* LOADER */}
          <div className="mt-10 w-56 mx-auto">
            <div className="h-[2px] bg-[#e8dfcf] overflow-hidden rounded-full">
              <div
                className="
                  h-full
                  w-full
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]
                  to-transparent
                  animate-[shimmer_1.5s_linear_infinite]
                "
              />
            </div>
          </div>

          <p className="mt-5 text-gray-500 text-sm">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
}