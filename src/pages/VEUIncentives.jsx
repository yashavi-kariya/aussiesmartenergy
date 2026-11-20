import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  ChevronDown,
  Calculator,
  Award,
  Building2,
  Home,
  FileCheck2,
  DollarSign,
  HelpCircle,
  Clock,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';
import SEO from '../components/SEO';
import { getBreadcrumbSchema, getFaqSchema } from '../utils/seoSchemas';

const EASE = [0.22, 1, 0.36, 1];

const REBATE_PACKAGES = [
  {
    id: 'res-battery',
    category: 'residential',
    title: 'Residential Solar Battery (10kWh - 15kWh)',
    subtitle: 'Sigenergy, Fox ESS, AlphaESS & GoodWe storage',
    typicalSystem: '10 - 15 kWh Usable Storage',
    estVEECs: '45 - 75 VEECs',
    estRebate: '$2,400 - $3,800',
    upfrontFeature: 'Applied directly as an upfront discount on invoice',
    compulsoryRequirement: 'Mandatory ESC-approved battery register & SAA accredited installer sign-off.',
    badge: 'Most Popular',
    popular: true,
  },
  {
    id: 'res-solar-battery',
    category: 'residential',
    title: 'Complete Solar + Battery System (6.6kW - 13.3kW)',
    subtitle: 'Tier-1 panels + hybrid inverter + modular battery',
    typicalSystem: '6.6kW to 13.3kW Solar + 10kWh Battery',
    estVEECs: '60 - 95 VEECs + STCs',
    estRebate: '$3,800 - $5,400',
    upfrontFeature: 'Stacked Federal STC + Victorian State Incentives',
    compulsoryRequirement: 'Must meet Victorian distribution network pre-approval and Certificate of Electrical Safety (CES).',
    badge: 'Maximum Value',
    popular: false,
  },
  {
    id: 'comm-solar-battery',
    category: 'commercial',
    title: 'Commercial Solar & Storage (30kW - 100kW)',
    subtitle: 'Offices, warehouses, factories, schools & workshops',
    typicalSystem: '30kW to 100kW PV with optional commercial storage',
    estVEECs: '120 - 450 VEECs',
    estRebate: '$6,500 - $24,000+',
    upfrontFeature: 'Available with $0 upfront Smart Ease commercial finance',
    compulsoryRequirement: 'Compulsory commercial activity schedule compliance & verified baseline energy consumption metering.',
    badge: 'High Yield',
    popular: false,
  },
  {
    id: 'heat-pump',
    category: 'electrification',
    title: 'Heat Pump Hot Water Electrification',
    subtitle: 'Replace inefficient gas or electric resistive storage',
    typicalSystem: 'High-efficiency 200L - 300L Heat Pump',
    estVEECs: '25 - 45 VEECs',
    estRebate: '$1,200 - $2,100',
    upfrontFeature: 'Cuts water heating power bills by up to 75%',
    compulsoryRequirement: 'COMPULSORY decommissioning and certified destruction of the old gas/electric hot water system.',
    badge: 'Fast Payback',
    popular: false,
  },
];

const FAQS = [
  {
    question: 'Why is VEU compliance compulsory for specific Victorian rebates?',
    answer:
      'Under Victorian government law and Essential Services Commission (ESC) regulations, participation in the Victorian Energy Upgrades (VEU) framework is mandatory to unlock certain state subsidies, Solar Victoria co-funding, and commercial electrification incentives. The Victorian Government mandates this to ensure that all subsidized installations meet strict safety standards, use certified equipment listed on the ESC register, and are completed by accredited installers like Aussie Smart Energy. Non-compliant installations permanently forfeit the rebate.',
  },
  {
    question: 'What are VEECs (Victorian Energy Efficiency Certificates)?',
    answer:
      'Each Victorian Energy Efficiency Certificate (VEEC) represents one tonne of greenhouse gas emissions saved through an approved energy upgrade. Electricity retailers in Victoria are legally obligated to purchase these certificates. Accredited providers generate VEECs for your installation and convert their monetary market value into an immediate point-of-sale discount on your system quote.',
  },
  {
    question: 'Can I combine VEU incentives with Federal STC solar rebates?',
    answer:
      'Yes! In most circumstances, Victorian households and businesses can "stack" federal Small-scale Technology Certificates (STCs) with Victorian state-level incentives (VEU and Solar Victoria programs). This dual-subsidy stacking can save you thousands of dollars off the total installation price of solar panels and battery storage.',
  },
  {
    question: 'Do I have to wait months for a government refund check?',
    answer:
      'No. Aussie Smart Energy applies your eligible VEU incentive and STC rebates directly as an upfront discount on your installation invoice. You only pay the net balance, and our accredited team handles all certificate creation and Victorian ESC regulatory paperwork directly on your behalf.',
  },
  {
    question: 'What happens to my old inefficient equipment (decommissioning)?',
    answer:
      'For specific electrification activities (such as hot water or space heating upgrades), VEU regulations make it compulsory to decommission and safely recycle the old inefficient system. Aussie Smart Energy completely handles the certified removal, environmental disposal, and documentation required by the ESC.',
  },
  {
    question: 'Who is eligible for VEU Incentives?',
    answer:
      'All Victorian households and businesses connected to the Victorian electricity grid with an eligible residential or commercial property qualify, provided the property has not previously claimed the same specific upgrade and the equipment is installed by an accredited installer.',
  },
];

export default function VEUIncentives() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFaq, setActiveFaq] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Check Your VEU Rebate Eligibility');
  const [modalSubtitle, setModalSubtitle] = useState(
    'Enter your details to calculate your exact Victorian Energy Upgrades (VEU) point-of-sale rebate.'
  );

  const openQuoteModal = (packageName) => {
    if (packageName) {
      setModalTitle(`Claim VEU Rebate - ${packageName}`);
      setModalSubtitle(`Receive an itemized quote with verified VEU incentives and STC discounts for ${packageName}.`);
    } else {
      setModalTitle('Check Your VEU Rebate Eligibility');
      setModalSubtitle('Enter your details to calculate your exact Victorian Energy Upgrades (VEU) rebate.');
    }
    setIsModalOpen(true);
  };

  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') return REBATE_PACKAGES;
    return REBATE_PACKAGES.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="overflow-hidden bg-white pt-0">
      <SEO
        title="Victorian Energy Upgrades (VEU) Incentives & Solar Battery Rebates | Aussie Smart Energy"
        description="Claim thousands in Victorian Energy Upgrades (VEU) incentives and VEEC discounts on solar panels and battery storage across Melbourne & Victoria. Understand compulsory VEU rebate compliance."
        keywords="VEU incentives Victoria, Victorian Energy Upgrades solar, VEEC rebate Melbourne, solar battery rebate Victoria, compulsory VEU requirements, commercial solar rebate VIC"
        canonical="/veu-incentives"
        schema={[
          getFaqSchema(FAQS),
          getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Government Rebates', url: '/veu-incentives' },
            { name: 'VEU Incentives', url: '/veu-incentives' },
          ]),
        ]}
      />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06142e] via-[#003b73] to-[#006ab7] text-white pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/20">
                <span className="flex h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white uppercase">
                  Victorian State Government Program • VEU & VEECs
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                Victorian Energy Upgrades{' '}
                <span className="bg-gradient-to-r from-red-400 via-white to-blue-200 bg-clip-text text-transparent">
                  (VEU) Incentives
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                Slash your upfront solar and battery installation costs. Aussie Smart Energy is an accredited installer delivering
                seamless point-of-sale discounts through Victorian Energy Efficiency Certificates (VEECs).
              </p>

              {/* Compulsory Rebate Advisory Alert */}
              <div className="rounded-2xl bg-amber-500/20 border border-amber-300/40 p-4 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                    <strong className="text-amber-200 font-bold block sm:inline">Mandatory Notice: </strong>
                    VEU program compliance is <span className="font-bold underline decoration-amber-300 decoration-1">compulsory</span> for specific Victorian government subsidies, battery co-funding, and commercial energy rebates. Non-compliant or unaccredited installations permanently forfeit all rebates.
                  </div>
                </div>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Up to $3,800+ off residential battery storage',
                  'Stackable with Federal STC solar rebates',
                  'Upfront point-of-sale invoice discount',
                  'Compulsory compliance & paperwork 100% handled',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-[15px] text-white/95">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => openQuoteModal('General VEU Assessment')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Check Your VEU Rebate</span>
                  <ArrowRight size={17} />
                </button>
                <a
                  href="#compulsory-section"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  <AlertTriangle size={16} className="text-amber-300" />
                  <span>Compulsory Requirements</span>
                </a>
              </div>
            </div>

            {/* Right Card: Quick Summary Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 p-6 sm:p-8 shadow-2xl text-white">
                <div className="flex items-center justify-between pb-5 border-b border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">Victorian Energy Upgrades</h3>
                      <p className="text-xs text-blue-200">Administered by ESC Victoria</p>
                    </div>
                  </div>
                  <span className="text-xs uppercase font-extrabold px-3 py-1 bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 rounded-full">
                    Active 2026
                  </span>
                </div>

                <div className="space-y-4 py-6">
                  <div className="flex justify-between items-center py-2 border-b border-white/10 text-sm">
                    <span className="text-blue-200">Rebate Mechanism</span>
                    <span className="font-bold text-white">VEEC Point-of-Sale Discount</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 text-sm">
                    <span className="text-blue-200">Typical Residential Battery</span>
                    <span className="font-extrabold text-emerald-300">$2,400 - $3,800 Off</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 text-sm">
                    <span className="text-blue-200">Commercial Solar & Storage</span>
                    <span className="font-extrabold text-emerald-300">$6,500 - $24,000+ Off</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 text-sm">
                    <span className="text-blue-200">Eligible Regions</span>
                    <span className="font-semibold text-white">All Victoria (Melbourne & Regional)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-blue-200">Installer Requirement</span>
                    <span className="font-bold text-amber-300">SAA Accredited Only (Compulsory)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openQuoteModal('Quick Calculator Assessment')}
                  className="w-full py-3.5 px-4 rounded-xl bg-white text-[#003b73] hover:bg-blue-50 font-extrabold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator size={16} className="text-[#006ab7]" />
                  <span>Calculate Your Exact VIC Rebate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. MANDATORY / COMPULSORY NOTICE (USER REQUEST SPECIFIC) ================= */}
      <section id="compulsory-section" className="relative py-14 sm:py-18 bg-amber-50/70 border-y border-amber-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border-2 border-amber-400 p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
            {/* Top Alert Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-200">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    Mandatory Regulatory Requirement
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1">
                    VEU Compliance is Compulsory for Specific Victorian Government Rebates
                  </h2>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 self-start md:self-center">
                Essential Services Commission Victoria (ESC)
              </span>
            </div>

            {/* Explanation paragraph */}
            <div className="pt-6 pb-4">
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                Under Victorian Government regulations and the <span className="font-bold text-slate-950">Victorian Energy Efficiency Target Act</span>,
                adhering to the formal VEU (Victorian Energy Upgrades) framework is <span className="font-bold text-red-600 underline decoration-red-400 decoration-2">compulsory and mandatory</span> to
                qualify for specific state-backed battery co-funding, Solar Victoria subsidies, and commercial energy rebates.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                If an installation fails to meet the strict VEU guidelines, or is completed by an unaccredited contractor, the Victorian Essential Services Commission
                <strong className="text-slate-900"> will reject the certificate generation and the rebate will be permanently lost</strong>.
              </p>
            </div>

            {/* Compulsory Requirement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
              {/* Requirement 1 */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck size={18} />
                  <span>Compulsory Rule 01</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Accredited SAA Installers Only</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Rebates cannot be self-claimed or performed by unapproved electricians. You must use an accredited Clean Energy Council & Solar Accreditation Australia (SAA) certified installer like Aussie Smart Energy.
                </p>
              </div>

              {/* Requirement 2 */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <FileCheck2 size={18} />
                  <span>Compulsory Rule 02</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">ESC Approved Products Register</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Only hardware (batteries, inverters, heat pumps) registered and approved on the Victorian ESC product register is eligible for rebates. We only supply tier-1 registered equipment (Sigenergy, Fox ESS, AlphaESS).
                </p>
              </div>

              {/* Requirement 3 */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <Flame size={18} />
                  <span>Compulsory Rule 03</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Mandatory Decommissioning</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For specific heating or water electrification rebates, decommissioning and certified recycling of the old, inefficient system is legally compulsory before incentives are generated.
                </p>
              </div>

              {/* Requirement 4 */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <Clock size={18} />
                  <span>Compulsory Rule 04</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Pre-Approval Before Install</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Specific state rebate programs strictly require an eligibility check and pre-approval approval token before any work commences. Work installed prior to sign-off cannot retroactively claim rebates.
                </p>
              </div>

              {/* Requirement 5 */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <Award size={18} />
                  <span>Compulsory Rule 05</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Certificate of Electrical Safety (CES)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  An independent Victorian licensed electrical inspector must inspect and lodge an official Certificate of Electrical Safety (CES) along with geo-tagged photographic evidence.
                </p>
              </div>

              {/* Requirement 6 */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
                  <Layers size={18} />
                  <span>Compulsory Rule 06</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Dual STC & VEU Compliance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To stack federal Clean Energy Regulator STC discounts on top of Victorian VEU certificates, the paperwork must align with both federal and state registry standards without discrepancy.
                </p>
              </div>
            </div>

            {/* Specific Rebates Breakdown Table */}
            <div className="mt-8 pt-6 border-t border-amber-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-md">
                    Specific Eligible Rebates
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    Specific Victorian Rebates Where VEU Compliance is Strictly Compulsory
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-600 bg-white border border-amber-200 px-3 py-1 rounded-lg self-start sm:self-auto">
                  State-Wide Victorian Programs
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-amber-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-gradient-to-r from-amber-100/80 to-amber-50 text-slate-900 font-bold text-xs uppercase border-b border-amber-200">
                    <tr>
                      <th className="py-3 px-4">Rebate Program & Upgrade</th>
                      <th className="py-3 px-4">Estimated Incentive</th>
                      <th className="py-3 px-4">Compulsory VEU Requirement</th>
                      <th className="py-3 px-4 text-center">Compliance Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">Residential Solar Battery Co-Funding</div>
                        <div className="text-xs text-slate-500">Solar Victoria & VEU Activity 28 / 44 (10kWh - 15kWh)</div>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 whitespace-nowrap">
                        $2,400 - $3,800 Off
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">
                        Compulsory installation of ESC-approved battery register models by SAA-accredited installers with licensed inspector CES sign-off.
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                          <AlertTriangle size={12} /> Compulsory
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">Commercial Solar & Storage Upgrades</div>
                        <div className="text-xs text-slate-500">VEU Activity 34 Commercial Buildings (30kW - 100kW+)</div>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 whitespace-nowrap">
                        $6,500 - $24,000+ Off
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">
                        Compulsory baseline electricity metering assessment and formal activity schedule approval prior to grid commissioning.
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                          <AlertTriangle size={12} /> Compulsory
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">Heat Pump Hot Water Electrification</div>
                        <div className="text-xs text-slate-500">VEU Activity 1 & 3 Hot Water Replacement</div>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 whitespace-nowrap">
                        $1,200 - $2,100 Off
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">
                        Compulsory decommissioning and certified destruction of existing gas or electric resistance water heater.
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                          <AlertTriangle size={12} /> Compulsory
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">Clean Space Heating Electrification</div>
                        <div className="text-xs text-slate-500">VEU Activity 6 Reverse-Cycle Multi-Split Systems</div>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 whitespace-nowrap">
                        $1,500 - $3,200 Off
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">
                        Mandatory licensed removal of old gas ducted or room heaters with geo-tagged photographic evidence.
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                          <AlertTriangle size={12} /> Compulsory
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#003b73] to-[#006ab7] p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <p className="text-sm sm:text-base font-semibold">
                  <span className="font-extrabold text-emerald-300">Aussie Smart Energy Guarantee:</span> We handle 100% of the compulsory VEU paperwork, compliance checks, and ESC lodgements for you.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openQuoteModal('Compulsory Compliance Check')}
                className="px-5 py-2.5 rounded-full bg-white text-[#003b73] hover:bg-blue-50 font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm cursor-pointer transition-all"
              >
                Verify Your Site Eligibility
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. REBATE PACKAGES & ELIGIBILITY ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#006ab7] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
              Eligible Energy Upgrades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Explore Available VEU Incentive Packages
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Select your upgrade category below to see estimated certificate savings and compulsory criteria.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {[
                { id: 'all', label: 'All Upgrades' },
                { id: 'residential', label: 'Residential Batteries & Solar' },
                { id: 'commercial', label: 'Commercial Solar Upgrades' },
                { id: 'electrification', label: 'Electrification & Heat Pumps' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#003b73] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${
                  pkg.popular
                    ? 'bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border-[#006ab7] shadow-xl'
                    : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#006ab7] bg-blue-100/70 px-2.5 py-1 rounded-md mb-2">
                      {pkg.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{pkg.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{pkg.subtitle}</p>
                  </div>
                </div>

                {/* Estimate Highlight Box */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">Estimated VEU Discount</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-0.5">{pkg.estRebate}</div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-full">
                      {pkg.estVEECs}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium mt-2 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                    <span>{pkg.upfrontFeature}</span>
                  </p>
                </div>

                {/* System Specs */}
                <div className="space-y-2.5 py-2 text-sm text-slate-700 border-b border-slate-100 pb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">System Capacity:</span>
                    <span className="font-semibold text-slate-900">{pkg.typicalSystem}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Discount Application:</span>
                    <span className="font-semibold text-emerald-600">Immediate On Invoice</span>
                  </div>
                </div>

                {/* Compulsory Requirement Alert on Card */}
                <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong className="flex items-center gap-1 font-bold text-amber-950 mb-0.5">
                    <AlertTriangle size={13} className="text-amber-600" />
                    <span>Compulsory Requirement:</span>
                  </strong>
                  <span>{pkg.compulsoryRequirement}</span>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => openQuoteModal(pkg.title)}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#006ab7] hover:bg-[#00518d] text-white font-bold text-sm text-center transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Claim VEU Rebate on this System</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. HOW AUSSIE SMART ENERGY HANDLES VEU ================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#006ab7] bg-blue-100/60 px-3.5 py-1.5 rounded-full">
              Seamless 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              How We Claim Your VEU Rebate For You
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              No government paperwork headaches. We calculate, deduct, and lodge your Victorian Energy Upgrades certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Free Site Assessment',
                desc: 'We inspect your property and meter box to confirm VEU eligibility and calculate your maximum certificate value.',
              },
              {
                step: '02',
                title: 'Upfront Discount',
                desc: 'Your VEU incentive is deducted directly off your quote. You never pay full price and wait months for reimbursement.',
              },
              {
                step: '03',
                title: 'SAA Accredited Install',
                desc: 'Our Clean Energy Council certified installers complete the installation strictly following VEU and Victorian electrical standards.',
              },
              {
                step: '04',
                title: 'ESC Lodgement & CES',
                desc: 'We handle the Certificate of Electrical Safety (CES) and lodge all geo-tagged evidence to generate your VEECs.',
              },
            ].map((st, i) => (
              <div key={i} className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003b73] to-[#006ab7] text-white flex items-center justify-center font-black text-lg mb-4 shadow-md">
                  {st.step}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">{st.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#006ab7] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Frequently Asked Questions About VEU
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Clear, transparent answers about Victorian Energy Upgrades and mandatory rebate requirements.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all duration-200 hover:border-blue-300"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-base sm:text-lg text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#006ab7] text-white rotate-180' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200/60 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. FINAL CALL TO ACTION ================= */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-[#06142e] via-[#003b73] to-[#006ab7] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full mb-4">
            Claim Your Victorian Energy Rebate Today
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to Cut Thousands Off Your Energy Bills?
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Let Aussie Smart Energy calculate your exact VEU incentives and provide a customized, point-of-sale discounted solar and battery quote.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openQuoteModal('Final CTA - VEU Rebates')}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold text-base shadow-xl shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Get Free VEU Rebate Quote</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="tel:1300959170"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <PhoneCall size={18} />
              <span>Call 1300 959 170</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 7. ENQUIRY MODAL ================= */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        formType="veu-rebate-enquiry"
        accentColor="#006ab7"
      />
    </main>
  );
}

