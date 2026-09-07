import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="animate-fadeInUp text-xs tracking-[0.28em] text-neutral-400 uppercase">
            New season
          </p>
          <h1 className="animate-fadeInUp delay-150 mt-4 max-w-xl text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            Define your style
          </h1>
          <p className="animate-fadeInUp delay-300 mt-5 max-w-md text-base text-neutral-500">
            Modern womenswear for every occasion. Clean lines, considered
            fabrics, and pieces that last beyond the season.
          </p>
          <div className="animate-fadeInUp delay-500 mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Shop now
            </Link>
            <Link
              to="/collection"
              className="rounded-md border border-[#ededed] px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
            >
              Collections
            </Link>
          </div>
        </div>

        <div className="animate-fadeInUp delay-300 relative overflow-hidden rounded-lg border border-[#ededed]">
          <img src="/c.jpg" alt="Summer editorial look" className="h-[52vh] w-full object-cover sm:h-[62vh]" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
