import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Loader2,
  PenLine,
  MapPin,
  Sparkles,
} from 'lucide-react';
import api from '../utils/api';

const AUSSIE_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D';

const DEFAULT_WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?cid=12102045691718893775';

export const top10GoogleReviews = [
  {
    googleReviewId: 'aussie_gmap_01',
    authorName: 'Akshay Jyani',
    roleOrLocation: 'Local Guide · Australia',
    rating: 5,
    text: "I recently had a solar and battery system installed by Aussie Smart Energy, and I couldn't be happier with the entire experience. From the initial consultation through to installation and after-sales support, the process was smooth, professional, and well-organized. A special mention goes to John, who was outstanding throughout the journey. His knowledge, transparency, and willingness to explain every detail made a huge difference. He took the time to walk me through system options, performance expectations, and long-term benefits, ensuring I felt confident in my decision without any pressure. The installation itself was completed to a very high standard. The team was punctual, efficient, and maintained a clean and safe work environment. The system setup looks neat and well-planned, reflecting the quality of workmanship and attention to detail. Overall, I highly recommend Aussie Smart Energy to anyone considering solar and battery solutions. Their professionalism, customer service, and technical expertise truly set them apart. A big thank you again to John and the team for delivering such a great experience.",
    relativeTime: '5 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: true,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_02',
    authorName: 'Krystian Reyes',
    roleOrLocation: 'Local Guide · Melbourne VIC',
    rating: 5,
    text: "Looking into and doing all the research when it comes to choosing and organising solar panels and batteries can be daunting, and it definitely was for me. John from Aussie Smart Energy was amazing, so helpful and accommodating. He was the first person I spoke to. He helped me assess our household energy usage and presented options best suited for our household. After my initial conversation, went out and did more research and more quotes and came back to John to 1) help me understand more of what I was seeking, and 2) to see what he could do about other offers that were presented to me. In the end he not only worked a better value package, but also presented better products for my solar and battery package (we went with a 6.6kw solar panel set up with a 30kw battery system and Wifi monitored inverter). John was amazing through the whole process including organising all the government rebate paperwork, financing for the system, and organising delivery and installation of the solar panel and battery system. I would definitely recommend John's customer service to anyone who is thinking about going down the solar power path!",
    relativeTime: '6 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_03',
    authorName: 'Rikin Ramani',
    roleOrLocation: 'Homeowner, Australia',
    rating: 5,
    text: 'Exceptional service from Aussie Smart Energy- professional, transparent, and delivered beyond expectations! Highly recommend Aussie Smart Energy for anyone looking for reliable solar and battery solutions!',
    relativeTime: '4 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_04',
    authorName: 'Ihab Ibrahim',
    roleOrLocation: 'Resident, Australia',
    rating: 5,
    text: 'Excellent experience with Aussie Smart Energy. The team was honest, professional and very efficient throughout the whole process. Their pricing was very reasonable, the installation was completed quickly, and everything was explained clearly. Our solar and battery system has been working perfectly from day one, with no issues at all. Very happy with the quality of the installation and the service provided. I would definitely recommend Aussie Smart Energy to anyone considering solar and battery installation. Thank you to the whole team for a great job!',
    relativeTime: 'a month ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_05',
    authorName: 'Steve King',
    roleOrLocation: 'Local Guide · Victoria',
    rating: 5,
    text: 'I have just had a 21 kw battery system installed by Aussie Smart Energy. John was recommended by the people who installed our EV Charger and was very helpful from start to finish. The battery was installed over half a day at my convenience and showed a massive reduction (monitoring via PowerPal) in grid energy supply from the moment it was linked up. Price and service were within my budget, and I am so happy with my purchase and the service provided by John and the team.',
    relativeTime: '9 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_06',
    authorName: 'Bharat Bhalodi',
    roleOrLocation: 'Local Guide · Australia',
    rating: 5,
    text: 'Aussie Smart Energy has done a fantastic job! I got the best price for solar panels and a storage battery after comparing multiple quotes. Their team was professional, efficient, and very prompt with the installation. The whole process was smooth from start to finish. Highly recommend Aussie Smart Energy for anyone looking to switch to solar.',
    relativeTime: '1 year ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_07',
    authorName: 'Mohit Patel',
    roleOrLocation: 'Homeowner, Australia',
    rating: 5,
    text: 'Aussie Smart Energy provided an exceptional experience from start to finish, with John patiently guiding us to the right product. The installation team was punctual, tidy, and highly professional, even taking the time to fully set up the monitoring app before leaving. Highly recommended for a seamless and stress-free solar journey!',
    relativeTime: '3 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_08',
    authorName: 'Adelio Antonio',
    roleOrLocation: 'Verified Customer',
    rating: 5,
    text: "Highly Recommend Aussie Smart Energy! I recently had a solar battery installed by the team at Aussie Smart Energy, and the experience was excellent. From the start, they were professional, took the time to understand my specific needs, and provided a solution perfectly tailored to our home's requirements. The installation was quick, tidy, and high-quality. What impressed me most was the after-care; they guided me through the app setup and clearly explained how to operate and monitor the unit. They ensured all my concerns were addressed promptly and thoroughly. If you're looking for a reliable solar solution, I highly recommend their services.",
    relativeTime: '5 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_09',
    authorName: 'Steffano Madafferi',
    roleOrLocation: 'Verified Customer · Victoria',
    rating: 5,
    text: "Switching to Aussie Smart Energy was one of the easiest decisions I've made, and a huge part of that is thanks to John. As someone who carefully tracks rates, benefits, and the fine print to maximise value, I naturally had a lot of questions before signing up. John was incredibly patient and transparent, and he walked me through every detail of the plan without any pushy sales tactics. The rates are highly competitive, and the billing is straightforward with absolutely no hidden surprises. It's genuinely refreshing to deal with an energy company here in Victoria that actually delivers on its promises and makes managing your account effortless. I cannot recommend them highly enough to anyone looking for a reliable provider—definitely ask for John if you are thinking of making the switch!",
    relativeTime: '5 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
  {
    googleReviewId: 'aussie_gmap_10',
    authorName: 'Sonali Bhoite',
    roleOrLocation: 'Verified Customer',
    rating: 5,
    text: 'Great experience with Aussie smart energy. The team was easy to deal with. The installation was completed before time and the installation crew was top notch. Very happy with the installation and services so far. Highly recommend.',
    relativeTime: '2 months ago',
    authorUrl: AUSSIE_GOOGLE_MAPS_URL,
    platform: 'google',
    isGoogleFeatured: false,
    isVerified: true,
  },
];

const defaultFallbackData = {
  businessName: 'Aussie Smart Energy',
  rating: 4.9,
  totalReviews: 79,
  placeUrl: AUSSIE_GOOGLE_MAPS_URL,
  writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
  featuredReview: top10GoogleReviews[0],
  reviews: top10GoogleReviews,
};

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const getAuthorImage = (review) => {
  if (!review) return null;
  if (review.authorPhoto && review.authorPhoto.trim() !== '') {
    return review.authorPhoto;
  }
  if (review.authorImage && review.authorImage.trim() !== '') {
    return review.authorImage;
  }
  return null;
};

const GoogleReviews = () => {
  const [data, setData] = useState(defaultFallbackData);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        const res = await api.get('/google-reviews');
        if (isMounted && res.data) {
          const apiData = res.data;
          let reviewsList = Array.isArray(apiData.reviews) && apiData.reviews.length > 0
            ? apiData.reviews
            : top10GoogleReviews;

          // Put featured review first if specified
          const featured = apiData.featuredReview || null;
          if (featured && reviewsList.length > 0) {
            const index = reviewsList.findIndex(
              (r) =>
                (r._id && featured._id && r._id === featured._id) ||
                (r.googleReviewId && featured.googleReviewId && r.googleReviewId === featured.googleReviewId) ||
                (r.authorName === featured.authorName && (r.text === featured.text || r.reviewText === featured.reviewText))
            );
            if (index > 0) {
              const reordered = [...reviewsList];
              const [selectedItem] = reordered.splice(index, 1);
              reviewsList = [selectedItem, ...reordered];
            }
          }

          // Limit to first 10 reviews on user site
          const displayedReviews = reviewsList.slice(0, 10);

          setData({
            businessName: apiData.businessName || 'Aussie Smart Energy',
            rating:
              typeof apiData.rating === 'number' && apiData.rating > 0
                ? apiData.rating
                : 5.0,
            totalReviews:
              typeof apiData.totalReviews === 'number' && apiData.totalReviews > 0
                ? apiData.totalReviews
                : 79,
            placeUrl: apiData.placeUrl || AUSSIE_GOOGLE_MAPS_URL,
            writeReviewUrl: apiData.writeReviewUrl || DEFAULT_WRITE_REVIEW_URL,
            featuredReview: featured || (displayedReviews.length > 0 ? displayedReviews[0] : null),
            reviews: displayedReviews,
          });
          setCurrentIndex(0);
        }
      } catch (err) {
        console.warn('Could not fetch Google Reviews, using top 10 verified reviews.', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGoogleReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const reviews = data.reviews || [];

  useEffect(() => {
    if (!autoPlay || reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoPlay, reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 12000);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 12000);
  };

  const activeReview = reviews[currentIndex] || reviews[0] || data.featuredReview;
  const activeImage = activeReview ? getAuthorImage(activeReview) : null;
  const targetLink =
    activeReview?.authorUrl ||
    activeReview?.reviewLink ||
    activeReview?.googleMapsUri ||
    data.placeUrl ||
    AUSSIE_GOOGLE_MAPS_URL;

  const isGooglePlatform = !activeReview?.platform || activeReview?.platform === 'google';
  const isSelectedFeatured = Boolean(activeReview?.isGoogleFeatured || (currentIndex === 0 && data.featuredReview));

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* ── Top Header with Google Business Rating Summary ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/60 shadow-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39b54a]" />
            <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">
              WHAT OUR CUSTOMERS SAY
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d53] leading-tight">
            Real Stories. Real Savings.
          </h2>
        </div>

        {/* Action Badges: Live Google Rating + Write a Review */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Google Rating Summary Link */}
          <a
            href={data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to view our Google Business profile and reviews"
            className="group inline-flex items-center gap-3 bg-white/95 hover:bg-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 hover:border-[#39b54a]/40 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-[#39b54a]/10 flex items-center justify-center border border-slate-200 group-hover:border-[#39b54a]/30 shadow-xs transition-colors">
              <GoogleIcon />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-[#1e2d53]">
                  {data.rating.toFixed(1)} / 5.0
                </span>
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${
                        i < Math.round(data.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <span>{data.totalReviews} Google Reviews</span>
                <ExternalLink size={10} className="text-slate-400 group-hover:text-[#39b54a] transition-colors" />
              </p>
            </div>
          </a>

          {/* Write a Review Button */}
          <a
            href={data.writeReviewUrl || data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/90 hover:bg-[#39b54a] text-[#1e2d53] hover:text-white border border-white/80 hover:border-[#39b54a] text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Write a Review</span>
          </a>
        </div>
      </div>

      {/* ── Active Review Card / Loading State ── */}
      {loading ? (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl p-10 flex flex-col items-center justify-center min-h-[260px] text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#4285F4] mb-3" />
          <p className="text-sm font-semibold">Loading Customer Reviews...</p>
        </div>
      ) : activeReview ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
        >
          {/* Top Row inside Card: Quote Icon + Platform & Featured Badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-[#39b54a]">
              <Quote size={36} className="fill-current opacity-20" />
            </div>

            <div className="flex items-center gap-2">
              {/* Featured Spotlight Badge if active review is the selected one */}
              {isSelectedFeatured && (
                <div className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-500 fill-current" />
                  <span>Featured Customer Story</span>
                </div>
              )}

              {/* Platform Badge */}
              <div
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 border shadow-xs ${
                  isGooglePlatform
                    ? 'bg-blue-50/90 text-[#4285F4] border-blue-100'
                    : 'bg-emerald-50 text-[#39b54a] border-emerald-100'
                }`}
              >
                {isGooglePlatform ? (
                  <>
                    <GoogleIcon />
                    <span>Google Review</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#39b54a]" />
                    <span className="capitalize">{activeReview.platform || 'Customer Review'}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Review Text Quote */}
          <blockquote className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed italic">
            "{activeReview.text || activeReview.reviewText}"
          </blockquote>

          {/* Author Details & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-3.5">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={activeReview.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#39b54a] shadow-xs"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}

              <div
                className={`w-12 h-12 rounded-full bg-[#39b54a]/15 text-[#39b54a] font-extrabold items-center justify-center text-base border-2 border-[#39b54a] ${
                  activeImage ? 'hidden' : 'flex'
                }`}
              >
                {activeReview.authorName?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div>
                <div className="font-extrabold text-[#1e2d53] text-sm sm:text-base">
                  {activeReview.authorName}
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-[#39b54a] font-bold mt-0.5">
                  <Check size={11} className="stroke-[3]" />
                  <span>
                    {activeReview.roleOrLocation || 'Verified Customer'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={`${
                      i < (activeReview.rating || 5)
                        ? 'text-yellow-400 fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeReview.relativeTime || activeReview.reviewDate || 'Recently'}
              </span>
            </div>
          </div>

          {/* Direct Link to Google Review */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <a
              href={targetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e2d53] hover:text-[#39b54a] transition-colors py-1 group"
            >
              <span>
                View Original Review on {isGooglePlatform ? 'Google Maps' : 'Platform'}
              </span>
              <ExternalLink size={13} className="text-[#39b54a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              <MapPin size={12} className="text-slate-400" />
              <span>Aussie Smart Energy Profile</span>
            </a>
          </div>

          {/* Carousel Navigation Buttons & Indicators */}
          {reviews.length > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 order-2 sm:order-1">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#1e2d53] font-extrabold">
                  Review {currentIndex + 1} of {reviews.length}
                </span>
                <span className="hidden md:inline text-slate-400 font-medium">· Verified 5-Star Rating</span>
              </div>

              <div className="flex items-center gap-3 order-1 sm:order-2">
                <button
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="w-9 h-9 bg-slate-100 hover:bg-[#39b54a]/15 hover:text-[#39b54a] rounded-full flex items-center justify-center transition-colors shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-700 hover:text-[#39b54a]" />
                </button>

                <div className="flex space-x-1.5 items-center">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setAutoPlay(false);
                        setTimeout(() => setAutoPlay(true), 12000);
                      }}
                      aria-label={`Go to review ${index + 1}`}
                      title={`Review ${index + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? 'bg-[#39b54a] w-6 h-2.5 shadow-xs'
                          : 'bg-slate-200 hover:bg-slate-400 w-2.5 h-2.5'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  aria-label="Next review"
                  className="w-9 h-9 bg-slate-100 hover:bg-[#39b54a]/15 hover:text-[#39b54a] rounded-full flex items-center justify-center transition-colors shadow-xs"
                >
                  <ArrowRight className="w-4 h-4 text-slate-700 hover:text-[#39b54a]" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        /* Empty State when no reviews have been added yet */
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#4285F4] mx-auto flex items-center justify-center">
            <GoogleIcon />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[#1e2d53]">Rated 5.0 Stars on Google</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Read all verified Australian homeowner and commercial solar reviews directly on our official Google Business Profile.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e2d53] hover:bg-[#39b54a] text-white text-xs font-bold transition shadow-md"
            >
              <span>Read Reviews on Google Maps</span>
              <ExternalLink size={13} />
            </a>
            <a
              href={data.writeReviewUrl || DEFAULT_WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1e2d53] text-xs font-bold transition"
            >
              <PenLine size={13} />
              <span>Leave a Google Review</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
