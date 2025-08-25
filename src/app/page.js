import Hero from "./components/layout/Hero"
import HomeMenu from "./components/layout/HomeMenu"
import SectionHeader from "./components/layout/SectionHeader"
export default function Home() {
  return (
      <>
        <Hero />
        <HomeMenu />
        <section>
          <SectionHeader subheader={"Our Story"} mainheader={"About us"} />
          <div className="max-w-2xl mx-auto mt-4 text-red-500 flex flex-col gap-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua.      labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </section>
        <section className="text-center mt-20">
          <SectionHeader subheader={"Contact us"} mainheader={"Get in touch"} />
          <a href="tel:+447392647135" className="text-4xl">+44 7392 647135</a>
        </section>

      </>
  );
}
