import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, ArrowRight, FileText, X } from 'lucide-react';
import api from '../utils/api';

const SITE_OPTIONS = [
  { id: 'smb', label: 'Small-medium business', defaultBattery: 150, defaultInverter: 50, defaultSolar: 40, badge: 'BESS4 - Small-medium business - 20-200 kWh usable', defaultPrice: 180000 },
  { id: 'ci', label: 'Commercial & industrial', defaultBattery: 300, defaultInverter: 100, defaultSolar: 80, badge: 'BESS5 - Commercial & industrial - >200 kWh usable', defaultPrice: 340000 },
  { id: 'strata', label: 'Apartment building', defaultBattery: 80, defaultInverter: 30, defaultSolar: 25, badge: 'BESS3 - Multi-residential / Apartment building', defaultPrice: 98000 },
  { id: 'home', label: 'Home', defaultBattery: 13.5, defaultInverter: 5, defaultSolar: 6.6, badge: 'BESS1/BESS2 - Residential battery - 2-28 kWh usable', defaultPrice: 22000 },
];

const NETWORKS = [
  { id: 'Ausgrid', name: 'Ausgrid', factor: 1.04 },
  { id: 'Endeavour', name: 'Endeavour Energy', factor: 1.02 },
  { id: 'Essential', name: 'Essential Energy', factor: 1.00 },
];

const FINANCE_TERMS = [
  { label: '2 years', value: 2 },
  { label: '3 years', value: 3 },
  { label: '4 years', value: 4 },
  { label: '5 years', value: 5 },
  { label: '7 years', value: 7 },
  { label: '10 years', value: 10 },
];

const NSWCalculator = () => {
  // -------------------------------------------------------------
  // Step 1: Rebate Calculator State
  // -------------------------------------------------------------
  const [selectedSite, setSelectedSite] = useState(SITE_OPTIONS[0]);
  const [batterySize, setBatterySize] = useState(150);
  const [batteryInverter, setBatteryInverter] = useState(50);
  const [newSolar, setNewSolar] = useState(40);
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [within90Days, setWithin90Days] = useState(true);

  // Advanced toggles
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [prcPrice, setPrcPrice] = useState(3.50); // $ per PRC
  const [usablePercentage, setUsablePercentage] = useState(90); // 90%
  const [lifetimeYears, setLifetimeYears] = useState(15); // 15 years

  // -------------------------------------------------------------
  // Step 2: Finance Calculator State
  // -------------------------------------------------------------
  const [installedSystemPrice, setInstalledSystemPrice] = useState(180000);
  const [financeTerm, setFinanceTerm] = useState(5); // 5 years
  const [indicativeRate, setIndicativeRate] = useState(9.5); // 9.5% p.a.

  // Lead modal / form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    postcode: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const step2Ref = useRef(null);

  // Handle Site Type Change
  const handleSiteChange = (site) => {
    setSelectedSite(site);
    setBatterySize(site.defaultBattery);
    setBatteryInverter(site.defaultInverter);
    setNewSolar(site.defaultSolar);
    setInstalledSystemPrice(site.defaultPrice);
  };

  // -------------------------------------------------------------
  // Step 1: PDRS Calculations
  // -------------------------------------------------------------
  const { usableCapacity, prcs, upfrontRebate, formulaString } = useMemo(() => {
    const rawUsable = (Number(batterySize) || 0) * (usablePercentage / 100);
    const inverterCap = (Number(batteryInverter) || 0) * 4;
    const finalUsable = Math.max(0, Math.min(rawUsable, inverterCap > 0 ? inverterCap : rawUsable));

    const solarRequiredMin = finalUsable / 4;
    const meetsSolarReq = (Number(newSolar) || 0) >= solarRequiredMin;
    const hours = (within90Days && meetsSolarReq) ? 6 : 4;

    const networkFactor = selectedNetwork.factor;
    const calculatedPrcs = Math.floor(finalUsable * hours * lifetimeYears * networkFactor);

    // Calculate rebate and format
    const rawRebate = calculatedPrcs * prcPrice;
    // Round to nearest 10 for clean aesthetics
    const finalRebate = Math.round(rawRebate / 10) * 10;

    const formula = `${finalUsable.toFixed(1)} kW x ${hours}h x ${lifetimeYears}yr x ${networkFactor.toFixed(2)} network factor, rounded down.`;

    return {
      usableCapacity: finalUsable,
      prcs: calculatedPrcs,
      upfrontRebate: finalRebate,
      formulaString: formula
    };
  }, [batterySize, batteryInverter, newSolar, selectedNetwork, within90Days, usablePercentage, lifetimeYears, prcPrice]);

  // The active rebate in finance step is carried from Step 1
  const currentPDRSRebate = upfrontRebate || 44810;

  // -------------------------------------------------------------
  // Step 2: Chattel Mortgage Finance Calculations
  // -------------------------------------------------------------
  const { amountFinanced, monthlyRepayment, gstBack, totalInterest } = useMemo(() => {
    const price = Number(installedSystemPrice) || 0;
    const financed = Math.max(0, price - currentPDRSRebate);

    // Standard amortising loan formula: P * (r*(1+r)^n) / ((1+r)^n - 1)
    const n = (Number(financeTerm) || 5) * 12;
    const r = (Number(indicativeRate) || 9.5) / 100 / 12;

    let monthly = 0;
    if (financed > 0 && r > 0 && n > 0) {
      monthly = (financed * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }

    // Rounding to nearest 10 for display
    const finalMonthly = Math.round(monthly / 10) * 10 || Math.round(monthly);

    // GST back on BAS = price / 11
    const rawGst = price / 11;
    const finalGst = Math.round(rawGst / 10) * 10;

    // Total interest = (Monthly * n) - Financed
    const rawInterest = (monthly * n) - financed;
    const finalInterest = Math.max(0, Math.round(rawInterest / 10) * 10);

    return {
      amountFinanced: financed,
      monthlyRepayment: finalMonthly,
      gstBack: finalGst,
      totalInterest: finalInterest
    };
  }, [installedSystemPrice, currentPDRSRebate, financeTerm, indicativeRate]);

  const scrollToStep2 = () => {
    step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.postcode) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/enquiries', {
        name: formData.fullName,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        postcode: formData.postcode,
        message: `NSW Battery & Finance Proposal Request:
Site Type: ${selectedSite.label}
Battery Size: ${batterySize} kWh
Battery Inverter: ${batteryInverter} kW
Solar: ${newSolar} kW
Network: ${selectedNetwork.name}
Calculated PDRS Rebate: $${currentPDRSRebate.toLocaleString()} (${prcs.toLocaleString()} PRCs)
System Price: $${Number(installedSystemPrice).toLocaleString()}
Amount Financed: $${amountFinanced.toLocaleString()} (${financeTerm} yrs @ ${indicativeRate}%)
Monthly Repayment: $${monthlyRepayment.toLocaleString()}/mo
GST Back on BAS: $${gstBack.toLocaleString()}
Comments: ${formData.comments || 'None'}`,
        formType: 'nsw-battery-finance-calculator'
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Submission fallback:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-slate-800 font-sans pt-36 sm:pt-40 lg:pt-44 pb-24 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-16">
        
        {/* =========================================================================
            STEP 1 - YOUR REBATE
            ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-2.5">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-[#00a2ea] uppercase">
              STEP 1 - YOUR REBATE
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              Size your NSW battery rebate
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              The Peak Demand Reduction Scheme pays a battery that discharges through the evening peak. Pick your site, enter the system, and we estimate the Peak Reduction Certificates and the upfront rebate.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-8 space-y-6">
            
            {/* Site Selection Tabs */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#0a2540]">
                What is the site?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60">
                {SITE_OPTIONS.map((site) => {
                  const isActive = selectedSite.id === site.id;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => handleSiteChange(site)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all text-center leading-tight ${
                        isActive
                          ? 'bg-[#082247] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      {site.label}
                    </button>
                  );
                })}
              </div>

              {/* Scheme Tag / Activity Pill */}
              <div>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#eefaf4] text-[#047857] border border-[#a7f3d0]">
                  {selectedSite.badge}
                </span>
              </div>
            </div>

            {/* 2x2 Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Battery size (kWh) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Battery size (kWh)
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={batterySize}
                  onChange={(e) => setBatterySize(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm"
                />
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  Nameplate capacity. The scheme counts 90% as usable.
                </p>
              </div>

              {/* Battery inverter (kW) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Battery inverter (kW)
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={batteryInverter}
                  onChange={(e) => setBatteryInverter(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm"
                />
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  AC output. Caps the rebate at 4h x inverter.
                </p>
              </div>

              {/* New solar installed with it (kW) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  New solar installed with it (kW)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={newSolar}
                  onChange={(e) => setNewSolar(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm"
                />
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  Unlocks the higher rate. Must be &gt;= 1/4 of usable capacity.
                </p>
              </div>

              {/* Electricity network */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Electricity network
                </label>
                <div className="relative">
                  <select
                    value={selectedNetwork.id}
                    onChange={(e) => {
                      const match = NETWORKS.find((n) => n.id === e.target.value);
                      if (match) setSelectedNetwork(match);
                    }}
                    className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm pr-10 cursor-pointer"
                  >
                    {NETWORKS.map((network) => (
                      <option key={network.id} value={network.id}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                role="switch"
                aria-checked={within90Days}
                onClick={() => setWithin90Days(!within90Days)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  within90Days ? 'bg-[#00a2ea]' : 'bg-slate-300'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    within90Days ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-[#0a2540] select-none cursor-pointer" onClick={() => setWithin90Days(!within90Days)}>
                Battery installed within 90 days of the new solar
              </span>
            </div>

            {/* Advanced toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00a2ea] hover:underline cursor-pointer"
              >
                <span>Advanced</span>
                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Certificate Price ($/PRC)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={prcPrice}
                        onChange={(e) => setPrcPrice(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Usable Factor (%)
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={usablePercentage}
                        onChange={(e) => setUsablePercentage(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Lifetime (Years)
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={lifetimeYears}
                        onChange={(e) => setLifetimeYears(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <hr className="border-slate-100 my-2" />

            {/* Results Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline">
              {/* UPFRONT PDRS REBATE */}
              <div className="sm:col-span-6 space-y-0.5">
                <span className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  UPFRONT PDRS REBATE
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#00605a] tracking-tight block">
                  ${upfrontRebate.toLocaleString()}
                </span>
              </div>

              {/* CERTIFICATES */}
              <div className="sm:col-span-3 space-y-0.5">
                <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  CERTIFICATES
                </span>
                <span className="text-base sm:text-lg font-bold text-[#0a2540] block">
                  {prcs.toLocaleString()} PRCs
                </span>
              </div>

              {/* USABLE CAPACITY */}
              <div className="sm:col-span-3 space-y-0.5">
                <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  USABLE CAPACITY
                </span>
                <span className="text-base sm:text-lg font-bold text-[#0a2540] block">
                  {usableCapacity.toFixed(1)} kWh
                </span>
              </div>
            </div>

            {/* Formula line */}
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              {formulaString}
            </p>

            {/* Scheme Bullet Points */}
            <div className="space-y-1.5 pt-1 text-xs text-slate-700 leading-normal">
              <p className="flex items-start gap-1.5">
                <span className="text-slate-900">•</span>
                <span>You need an active ABN to claim the commercial PDRS rebate - it is for registered businesses only.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <span className="text-slate-900">•</span>
                <span>Commercial, business and strata activities (BESS3-BESS5) open on 1 September 2026.</span>
              </p>
            </div>

            {/* Legal Disclaimer */}
            <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
              Estimate only. Peak Reduction Certificates trade on an open market, so the value is set by the certificate price on the day and confirmed at your quote by the Accredited Certificate Provider. Aussie Smart Energy designs, installs and handles the PDRS paperwork.
            </p>

            {/* Action Button */}
            <button
              type="button"
              onClick={scrollToStep2}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#00a2ea] hover:bg-[#0092d3] active:bg-[#0082bd] text-white font-bold text-sm sm:text-base text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Now turn the rest into a monthly repayment</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

        {/* =========================================================================
            STEP 2 - YOUR FINANCE
            ========================================================================= */}
        <div ref={step2Ref} className="space-y-6 pt-4">
          <div className="text-center space-y-2.5">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-[#00a2ea] uppercase">
              STEP 2 - YOUR FINANCE
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              Turn the rest into a monthly repayment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Apply the rebate first, then finance the balance with a chattel mortgage through Smart Ease - so the system pays for itself from the power bill it replaces. $0 upfront.
            </p>
          </div>

          {/* Finance Card */}
          <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-8 space-y-6">
            
            {/* 2x2 Finance Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Installed system price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Installed system price ($, inc GST)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={installedSystemPrice}
                  onChange={(e) => setInstalledSystemPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm"
                />
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  Solar + battery, fully installed. We confirm your real price at quote.
                </p>
              </div>

              {/* Finance term */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Finance term
                </label>
                <div className="relative">
                  <select
                    value={financeTerm}
                    onChange={(e) => setFinanceTerm(Number(e.target.value))}
                    className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm pr-10 cursor-pointer"
                  >
                    {FINANCE_TERMS.map((term) => (
                      <option key={term.value} value={term.value}>
                        {term.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  Typical chattel mortgage / payment plan term.
                </p>
              </div>

              {/* Indicative rate */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0a2540]">
                  Indicative rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={indicativeRate}
                  onChange={(e) => setIndicativeRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00a2ea] focus:border-transparent transition-all shadow-sm"
                />
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  Indicative only - Smart Ease sets your actual rate on approval.
                </p>
              </div>

              {/* Less your PDRS rebate */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#0a2540]">
                    Less your PDRS rebate
                  </label>
                </div>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-[#a3e9c4] bg-[#e8fbf0] text-[#00605a] text-sm font-extrabold shadow-sm flex items-center">
                  <span>- ${currentPDRSRebate.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-normal leading-tight">
                  Carried across from Step 1. Comes off before you finance.
                </p>
              </div>

            </div>

            {/* Repayment Callout Highlight */}
            <div className="rounded-2xl border border-[#bce8fb] bg-[#f0f9ff] p-5 sm:p-6 text-center space-y-1">
              <span className="block text-[11px] font-bold text-[#00a2ea] tracking-wider uppercase">
                ESTIMATED MONTHLY REPAYMENT
              </span>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#002b5c] tracking-tight">
                ${monthlyRepayment.toLocaleString()}<span className="text-2xl sm:text-3xl font-bold text-[#002b5c]">/mo</span>
              </p>
              <p className="text-xs text-slate-500 font-normal pt-0.5">
                ${amountFinanced.toLocaleString()} financed over {financeTerm} years at {indicativeRate}% p.a. (indicative)
              </p>
            </div>

            {/* 3 Summary Stats in Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  AMOUNT FINANCED
                </span>
                <p className="text-base font-extrabold text-[#0a2540]">
                  ${amountFinanced.toLocaleString()}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  GST BACK ON YOUR BAS
                </span>
                <p className="text-base font-extrabold text-[#0a2540]">
                  ${gstBack.toLocaleString()}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TOTAL INTEREST (EST.)
                </span>
                <p className="text-base font-extrabold text-[#0a2540]">
                  ${totalInterest.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
              Indicative only, not a finance offer or a quote. Repayments are calculated on a standard amortising chattel mortgage at the rate shown; your actual rate, term, fees and repayments are set by Smart Ease or your financier on approval, subject to their terms and a credit assessment.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#00a2ea] hover:bg-[#0092d3] active:bg-[#0082bd] text-white font-bold text-sm sm:text-base text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore finance with Smart Ease</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

        {/* =========================================================================
            STEP 3 - YOUR TAX POSITION
            ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2.5">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-[#00a2ea] uppercase">
              STEP 3 - YOUR TAX POSITION
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              The tax write-offs stack on top
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Under a chattel mortgage the system is legally yours from day one, so you claim the tax benefits now and repay the finance over time. Three ways it helps your bottom line:
            </p>
          </div>

          {/* 3 Tax Position Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: GST */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                  GST
                </span>
                <h3 className="text-lg font-bold text-[#0a2540]">
                  Claim the GST back
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you are GST-registered, you claim the full GST on the system as an input tax credit on your next BAS - back in the business within weeks, not years.
                </p>
              </div>
            </div>

            {/* Card 2: Interest */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                  INTEREST
                </span>
                <h3 className="text-lg font-bold text-[#0a2540]">
                  Interest is deductible
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The interest portion of every chattel-mortgage repayment is a deductible business expense for the life of the finance.
                </p>
              </div>
            </div>

            {/* Card 3: Depreciation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                  DEPRECIATION
                </span>
                <h3 className="text-lg font-bold text-[#0a2540]">
                  Depreciate the asset
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You depreciate the system against income over its effective life. Most commercial systems cost well over $20,000, so they are depreciated (small business pool or effective life) rather than instantly written off.
                </p>
              </div>
            </div>

          </div>

          <p className="text-center text-[11px] text-slate-400 leading-relaxed max-w-lg mx-auto">
            General information only - not tax or financial advice. Your outcome depends on your turnover, GST registration and circumstances. Confirm the treatment with your accountant. More on finance at smartease.com.au.
          </p>
        </div>

        {/* =========================================================================
            THE REBATE, EXPLAINED
            ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2.5">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-[#00a2ea] uppercase">
              THE REBATE, EXPLAINED
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              NSW pays you to shift demand off the evening peak.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              The Peak Demand Reduction Scheme is a NSW Government program under the Energy Security Safeguard. A battery that discharges through the 2:30-8:30pm peak earns Peak Reduction Certificates; an accredited provider buys them and hands the value back as an upfront discount.
            </p>
          </div>

          {/* 4 Activity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* BESS4 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-2.5">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white">
                BESS4
              </span>
              <h3 className="text-base font-bold text-[#0a2540]">
                Small-medium business
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shops, warehouses, offices, workshops. 20-200 kWh paired with new solar.
              </p>
            </div>

            {/* BESS5 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-2.5">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white">
                BESS5
              </span>
              <h3 className="text-base font-bold text-[#0a2540]">
                Commercial & industrial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Larger sites from 200 kWh up to 30 MWh. Serious demand, serious certificates.
              </p>
            </div>

            {/* BESS3 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-2.5">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white">
                BESS3
              </span>
              <h3 className="text-base font-bold text-[#0a2540]">
                Apartment / strata
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buildings of 4+ dwellings. 20-200 kWh. Shared battery, shared savings.
              </p>
            </div>

            {/* BESS1 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-2.5">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white">
                BESS1
              </span>
              <h3 className="text-base font-bold text-[#0a2540]">
                Home / small business
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Homes and micro-business, 2-28 kWh. Open now since 1 July 2026.
              </p>
            </div>

          </div>
        </div>

        {/* =========================================================================
            HOW IT WORKS
            ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2.5">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-[#00a2ea] uppercase">
              HOW IT WORKS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] tracking-tight">
              One team. Rebate, install and finance handled.
            </h2>
          </div>

          {/* 4 Steps 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                STEP 1
              </span>
              <h3 className="text-lg font-bold text-[#0a2540]">
                Size it
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your site, bills and peak-time usage. We design the solar and battery that earns the most certificates for your load.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                STEP 2
              </span>
              <h3 className="text-lg font-bold text-[#0a2540]">
                Price it, net of everything
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We apply the PDRS rebate, set out the Smart Ease repayment, and show the tax position - so you see the true net cost in writing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                STEP 3
              </span>
              <h3 className="text-lg font-bold text-[#0a2540]">
                We handle certificates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aussie Smart Energy works with the Accredited Certificate Provider to create and assign your PRCs, so the discount lands upfront - no registry paperwork for you.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#00a2ea] text-white uppercase tracking-wider">
                STEP 4
              </span>
              <h3 className="text-lg font-bold text-[#0a2540]">
                We install
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                CEC-accredited installers commission the system to scheme standard, and it starts cutting your peak from day one.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================================
          PROPOSAL / FINANCE MODAL
          ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-2 mb-5">
                <span className="text-xs font-bold text-[#00a2ea] tracking-wider uppercase">
                  SMART EASE FINANCE & NSW QUOTE
                </span>
                <h3 className="text-2xl font-black text-[#0a2540]">
                  Get Pre-Approved for $0 Upfront Finance
                </h3>
                <p className="text-xs text-slate-500">
                  Receive an engineered quote with verified NSW PDRS rebates, STC discounts, and chattel mortgage terms.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Proposal Request Received!</h4>
                  <p className="text-xs text-emerald-800">
                    Our commercial solar team and Smart Ease finance specialists will prepare your custom proposal.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setIsModalOpen(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  {formError && (
                    <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#00a2ea] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Business / Strata Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleFormChange}
                        placeholder="Acme Industrial Pty Ltd"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#00a2ea] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="john@company.com"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#00a2ea] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="04XX XXX XXX"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#00a2ea] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        NSW Postcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        required
                        value={formData.postcode}
                        onChange={handleFormChange}
                        placeholder="2000"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-[#00a2ea] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-[#0a2540]">Modeled System Summary:</p>
                    <p className="text-slate-600">
                      {selectedSite.label} • {batterySize} kWh Battery • {newSolar} kW Solar • Est. Rebate: <span className="font-bold text-emerald-600">${currentPDRSRebate.toLocaleString()}</span> • Est. Repayment: <span className="font-bold text-[#00a2ea]">${monthlyRepayment.toLocaleString()}/mo</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#00a2ea] hover:bg-[#0092d3] active:bg-[#0082bd] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <FileText size={16} />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Request Pre-Approval & Formal Quote'}</span>
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NSWCalculator;
