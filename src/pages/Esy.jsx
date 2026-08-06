import esyBattery from '../assets/esy1.webp';
import esySystem from '../assets/esy/esy1.webp';
import esyHomeBattery from '../assets/esy/esy2.webp';
import esyEnergyManagement from '../assets/esy/esy3.webp';
import esyConnectedHome from '../assets/esy/esy4.webp';
import esyVpp from '../assets/esy/esy5.webp';
import esyWarranty from '../assets/esy/esy6.webp';
import solarHome from '../assets/ChatGPT Image Jul 7, 2026, 10_10_54 AM.png';

const BulletList = ({ items }) => (
  <ul className="mt-3 space-y-2 text-base text-slate-700">
    {items.map((item) => (
      <li key={item} className="flex items-center gap-2">
        <span className="flex h-3.5 w-3.5 flex-none rounded-full border-2 border-sky-500 p-[2px]"><span className="h-full w-full rounded-full bg-sky-500" /></span>
        {item}
      </li>
    ))}
  </ul>
);

const faqs = [
  {
    question: 'What is an ESY Sunhome all-in-one battery system?',
    answer: 'An ESY Sunhome all-in-one battery system combines battery storage, inverter technology, smart controls, and monitoring functions into a single integrated residential energy solution.',
  },
  {
    question: "How does ESY Sunhome's smart energy management work?",
    answer: 'The system automatically monitors solar production, battery levels, household consumption, and grid usage to optimise when energy is stored or used.',
  },
  {
    question: 'Can ESY Sunhome batteries support whole-home energy storage?',
    answer: 'Yes. Depending on the selected battery capacity and household energy requirements, ESY Sunhome systems can support substantial residential energy storage needs.',
  },
  {
    question: 'What battery capacities are available across the ESY Sunhome range?',
    answer: 'The ESY Sunhome range offers scalable capacities including 5.12 kWh, 10.24 kWh, 15.36 kWh, 20.48 kWh, 25.60 kWh, and 30.72 kWh configurations.',
  },
  {
    question: 'Can I monitor my ESY Sunhome battery remotely?',
    answer: 'Yes. The integrated battery monitoring app provides real-time access to energy generation, battery status, consumption data, and overall system performance.',
  },
  {
    question: 'Is ESY Sunhome compatible with modern smart home energy systems?',
    answer: 'Yes. ESY Sunhome systems are designed to support intelligent energy management and integration with modern smart energy environments, making them suitable for future-focused households.',
  },
];

const EsyPage = () => (
  <main className="overflow-hidden bg-white pt-24">
    <section
      className="relative isolate min-h-[560px] overflow-hidden bg-sky-600 text-white sm:min-h-[590px]"
      style={{
        backgroundImage: `linear-gradient(105deg, rgba(0, 174, 232, 0.94) 0%, rgba(0, 145, 215, 0.91) 48%, rgba(0, 103, 186, 0.92) 100%), url(${solarHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.35) 1px, transparent 1px)', backgroundSize: '21px 21px' }} />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-5 px-6 pb-36 pt-12 sm:px-10 sm:pb-40 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-16 lg:pb-36 lg:pt-14">
        <div className="max-w-[620px]">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight lg:text-[42px]">
            Power Your Evenings, Not<br className="hidden lg:block" /> Just Your Daytime: ESY<br className="hidden lg:block" /> Sunhome Battery Australia
          </h1>

          <div className="mt-5 space-y-3 text-[15px] leading-[1.42] sm:text-base">
            <p>
              Solar panels generate electricity when the sun is shining, but most households use the most energy in the morning and evening. That&apos;s where an intelligent battery solution becomes valuable. An ESY Sunhome battery system allows homeowners to store excess solar energy during the day and use it when electricity demand is highest.
            </p>
            <p>
              Designed as a modern all-in-one energy solution, ESY Sunhome combines battery storage, smart energy management, remote monitoring, and scalable capacity options into a single streamlined system. Whether you&apos;re looking to reduce grid reliance, improve energy independence, or prepare for future energy demands, an ESY Sunhome battery solution provides a practical way to maximise the value of your solar investment.
            </p>
          </div>
        </div>
        <div className="relative flex min-h-[330px] items-end justify-center lg:min-h-[390px]">
          <div className="absolute bottom-7 h-7 w-72 rounded-[50%] bg-slate-900/25 blur-xl" />
          <img
            src={esyBattery}
            alt="ESY Sunhome battery"
            className="relative z-10 h-auto w-56 max-w-[70%] object-contain drop-shadow-[0_18px_14px_rgba(0,61,99,.28)] sm:w-64 lg:w-72"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-52">
        <svg className="absolute bottom-0 h-full w-full" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,106 C129,55 219,130 361,80 C509,27 631,119 782,51 C937,-19 1048,84 1169,46 C1275,13 1358,98 1440,56 L1440,220 L0,220 Z" fill="#e7f8ff" fillOpacity="0.94" />
          <path d="M0,158 C128,106 242,188 390,128 C517,76 623,177 788,111 C909,63 1035,161 1171,138 C1275,119 1354,187 1440,145 L1440,220 L0,220 Z" fill="#fff" />
        </svg>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
      <img
        src={esySystem}
        alt="ESY Sunhome all-in-one battery system beside a solar-powered home"
        className="aspect-square w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:justify-self-start"
      />

      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
          What is an ESY Sunhome All-in-One<br className="hidden xl:block" /> Battery System?
        </h2>
        <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />

        <p className="mt-2 text-base leading-relaxed text-slate-700">
          An ESY Sunhome all-in-one battery system is an integrated residential energy storage solution that combines:
        </p>

        <ul className="mt-4 space-y-2 text-base text-slate-700">
          {[
            'Battery storage',
            'Smart energy management',
            'Inverter technology',
            'Remote monitoring capabilities',
            'Smart home compatibility',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="flex h-3.5 w-3.5 flex-none rounded-full border-2 border-sky-500 p-[2px]">
                <span className="h-full w-full rounded-full bg-sky-500" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-3 text-base leading-relaxed text-slate-700">
          This makes it an attractive option for Australian families seeking a reliable residential energy storage system that works seamlessly alongside rooftop solar.
        </p>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-[1fr_375px] lg:gap-20 lg:px-16 lg:pb-20">
      <div className="max-w-2xl lg:order-1">
        <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
          Why More Australians Are Adding<br className="hidden xl:block" /> Battery Storage?
        </h2>
        <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />

        <p className="mt-2 text-base leading-relaxed text-slate-700">
          A modern solar battery solution helps homeowners use more of the solar energy they generate rather than exporting excess electricity back to the grid.
        </p>
        <p className="mt-3 text-base font-bold text-slate-700">Key Benefits Include:</p>

        <ul className="mt-3 space-y-2 text-base text-slate-700">
          {[
            'Increased solar self-consumption',
            'Reduced electricity bills',
            'Greater protection from rising energy costs',
            'Backup energy capability (depending on system design)',
            'Better control over household energy usage',
            'Enhanced energy independence',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="flex h-3.5 w-3.5 flex-none rounded-full border-2 border-sky-500 p-[2px]">
                <span className="h-full w-full rounded-full bg-sky-500" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-3 text-base leading-relaxed text-slate-700">
          An ESY Sunhome battery installation allows households to store clean energy for use when it matters most.
        </p>
      </div>

      <img
        src={esyHomeBattery}
        alt="ESY Sunhome battery installed beside a solar-powered home"
        className="aspect-square w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:order-2 lg:justify-self-end"
      />
    </section>

    <section className="bg-[#eef9ff]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
        <img
          src={esyEnergyManagement}
          alt="ESY smart energy management system and mobile monitoring app"
          className="aspect-square w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:justify-self-start"
        />

        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">
            Smart Energy Management That<br className="hidden xl:block" /> Works Behind the Scenes
          </h2>
          <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />

          <p className="mt-2 text-base leading-relaxed text-slate-700">
            One of the standout features of an ESY Sunhome battery system is its intelligent energy management technology.
          </p>
          <p className="mt-3 text-base text-slate-700">The system continuously analyses:</p>

          <ul className="mt-3 space-y-2 text-base text-slate-700">
            {['Household energy demand', 'Solar production levels', 'Battery charge status', 'Grid electricity usage'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 flex-none rounded-full border-2 border-sky-500 p-[2px]"><span className="h-full w-full rounded-full bg-sky-500" /></span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Based on these factors, it automatically determines the most efficient way to use, store, or draw energy.
          </p>
          <p className="mt-3 text-base font-bold text-slate-700">The Result:</p>

          <ul className="mt-3 space-y-2 text-base text-slate-700">
            {['Less wasted solar generation', 'Improved battery utilization', 'Better energy efficiency', 'Greater long-term savings'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 flex-none rounded-full border-2 border-sky-500 p-[2px]"><span className="h-full w-full rounded-full bg-sky-500" /></span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            This automated approach helps homeowners get more value from their residential solar battery without constantly adjusting settings.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-gradient-to-r from-[#08a9dd] via-[#078dcc] to-[#0875ba] px-6 py-14 text-center text-white sm:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          Battery Capacities Designed for Different Household Needs
        </h2>
        <div className="mx-auto mt-5 h-[3px] w-14 bg-white" />

        <p className="mx-auto mt-2 max-w-5xl text-base leading-relaxed">
          Every household has different energy consumption patterns. ESY Sunhome offers scalable battery solutions to suit a wide range of property sizes and energy requirements.
        </p>
        <p className="mt-4 text-base font-bold">Available Battery Capacities</p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {['5.12 kWh', '10.24 kWh', '15.36 kWh', '20.48 kWh', '25.60 kWh', '30.72 kWh'].map((capacity) => (
            <div key={capacity} className="flex min-h-[70px] items-center justify-center rounded-xl border border-white/40 bg-white/15 px-3 text-lg font-extrabold shadow-sm backdrop-blur-sm">
              {capacity}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-5xl text-base leading-relaxed">
          Whether you&apos;re installing a battery for a smaller home or a larger family property, ESY Sunhome battery solutions offer scalable storage to support changing energy demands.
        </p>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_375px] lg:gap-20 lg:px-16 lg:py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">Monitor Your Energy Anytime,<br /> Anywhere</h2>
        <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />
        <p className="mt-2 text-base leading-relaxed text-slate-700">Energy visibility is becoming increasingly important for Australian homeowners.</p>
        <p className="mt-3 text-base text-slate-700">The integrated battery monitoring app provides real-time access to:</p>
        <BulletList items={['Battery charge levels', 'Solar generation data', 'Household consumption', 'Grid imports and exports', 'System performance history']} />
        <p className="mt-3 text-base leading-relaxed text-slate-700">Using the monitoring app, homeowners can easily track how their solar battery system is performing and identify opportunities to improve energy efficiency.</p>
        <p className="mt-3 text-base leading-relaxed text-slate-700">Whether you&apos;re at home, at work, or travelling, your energy data remains accessible through a simple digital dashboard.</p>
      </div>
      <img src={esyEnergyManagement} alt="ESY energy monitoring application" className="aspect-square w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:justify-self-end" />
    </section>

    <section className="bg-[#eef9ff]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
        <img src={esyConnectedHome} alt="Connected home with rooftop solar" className="aspect-square w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:justify-self-start" />
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">Built for the Connected Home</h2>
          <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />
          <p className="mt-2 text-base leading-relaxed text-slate-700">Modern households increasingly rely on smart technologies to improve efficiency and convenience.</p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">The ESY Sunhome all-in-one battery system is designed to integrate with advanced energy management environments and evolving smart home technologies.</p>
          <p className="mt-3 text-base font-bold text-slate-700">Smart Features Include:</p>
          <BulletList items={['Intelligent load management', 'Real-time performance monitoring', 'Automated charging and discharging', 'Smart energy optimization', 'Future-ready connectivity options']} />
          <p className="mt-3 text-base leading-relaxed text-slate-700">For homeowners planning long-term energy independence, an ESY Sunhome battery solution provides a flexible platform for future energy innovations.</p>
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_375px] lg:gap-20 lg:px-16 lg:py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">VPP Compatibility and Future Energy<br className="hidden xl:block" /> Opportunities</h2>
        <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />
        <p className="mt-2 text-base leading-relaxed text-slate-700">As solar battery Australia landscape evolves, many homeowners are exploring <a href="#vpp" className="text-amber-600 underline">Virtual Power Plant</a> participation.</p>
        <p className="mt-3 text-base leading-relaxed text-slate-700">A VPP compatible battery can potentially allow households to contribute stored energy to clean energy networks while benefiting from emerging energy programs.</p>
        <p className="mt-3 text-base leading-relaxed text-slate-700">This future-focused capability helps position your home for the next generation of energy management opportunities.</p>
      </div>
      <img src={esyVpp} alt="Virtual power plant connected energy network" className="aspect-[1.3] w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:justify-self-end" />
    </section>

    <section className="bg-[#eef9ff]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[375px_1fr] lg:gap-20 lg:px-16 lg:py-20">
        <img src={esyWarranty} alt="ESY Sunhome battery warranty consultation" className="aspect-square w-full max-w-[375px] justify-self-center rounded-xl object-cover shadow-sm lg:justify-self-start" />
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold leading-tight text-[#006ab7] sm:text-4xl">Understanding the ESY Sunhome<br className="hidden xl:block" /> Battery Warranty</h2>
          <div className="mt-4 h-[3px] w-14 bg-[#08aeea]" />
          <p className="mt-2 text-base leading-relaxed text-slate-700">Battery reliability is one of the most important considerations when investing in energy storage. The ESY Sunhome battery warranty provides homeowners with confidence that their system is backed by manufacturer support and performance standards.</p>
          <p className="mt-3 text-base text-slate-700">When selecting a battery solution, it&apos;s important to review:</p>
          <BulletList items={['Warranty period', 'Performance guarantees', 'Battery cycle expectations', 'Installation requirements', 'Service and support options']} />
          <p className="mt-3 text-base leading-relaxed text-slate-700">A quality warranty contributes to long-term peace of mind and investment protection.</p>
        </div>
      </div>
    </section>

    <section className="overflow-hidden bg-gradient-to-br from-[#0568b6] via-[#078fce] to-[#09afe0] px-6 py-10 text-white sm:px-10 lg:py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/25 bg-white/10 px-6 py-7 text-center shadow-xl backdrop-blur-sm sm:px-10">
        <span className="mx-auto mb-3 block h-1 w-12 rounded-full bg-cyan-200" />
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Take Control of Your Energy Future</h2>

        <div className="mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
          <p>
            The way Australians use electricity is changing. Solar generation, battery storage, and smart energy management are becoming essential tools for reducing energy costs and increasing energy independence.
          </p>
          <p>
            Whether you&apos;re installing a new solar system or upgrading an existing one, an <a href="#esy" className="font-semibold text-amber-200 underline decoration-amber-200/80 underline-offset-2">ESY Sunhome battery</a> solution offers flexible capacity, intelligent monitoring, and scalable capacity options designed for modern households.
          </p>
          <p>
            <a href="/contact" className="font-semibold text-amber-200 underline decoration-amber-200/80 underline-offset-2">Speak with the team today</a> to discover the right battery solution for your energy goals and start storing more of the power you generate.
          </p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-[#006ab7] sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mx-auto mt-5 h-[3px] w-14 bg-[#08aeea]" />
      </div>

      <div className="mt-7 space-y-5">
        {faqs.map(({ question, answer }) => (
          <details key={question} className="group rounded-lg border border-sky-500 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-500 marker:content-none sm:text-base">
              <span className="flex items-center gap-2">
                <span className="text-2xl font-light leading-none text-sky-500">✓</span>
                {question}
              </span>
              <svg className="h-5 w-5 flex-none text-slate-700 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="border-t border-sky-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-700">
              {answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  </main>
);

export default EsyPage;
