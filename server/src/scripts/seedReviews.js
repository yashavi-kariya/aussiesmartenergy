import 'dotenv/config';
import mongoose from 'mongoose';
import Review from '../models/Review.js';

const MAPS_URL =
  'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D';

/**
 * Real written reviews from Aussie Smart Energy Google Business Profile
 * Source: https://www.google.com/maps/place/Aussie+Smart+Energy
 * All 10 reviews with full text exactly as shown on Google Maps.
 * The remaining 69 of 79 total star-ratings have no public written text on Google Maps.
 */
export const realAussieSmartEnergyReviews = [
  {
    googleReviewId: 'aussie_gmap_01',
    authorName: 'Akshay Jyani',
    roleOrLocation: 'Local Guide · Australia',
    rating: 5,
    reviewText:
      "I recently had a solar and battery system installed by Aussie Smart Energy, and I couldn't be happier with the entire experience. From the initial consultation through to installation and after-sales support, the process was smooth, professional, and well-organized. A special mention goes to John, who was outstanding throughout the journey. His knowledge, transparency, and willingness to explain every detail made a huge difference. He took the time to walk me through system options, performance expectations, and long-term benefits, ensuring I felt confident in my decision without any pressure. The installation itself was completed to a very high standard. The team was punctual, efficient, and maintained a clean and safe work environment. The system setup looks neat and well-planned, reflecting the quality of workmanship and attention to detail. Overall, I highly recommend Aussie Smart Energy to anyone considering solar and battery solutions. Their professionalism, customer service, and technical expertise truly set them apart. A big thank you again to John and the team for delivering such a great experience.",
    reviewDate: '5 months ago',
    publishTime: new Date(Date.now() - 150 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: true,
    isFeatured: true,
    isVerified: true,
    displayOrder: 1,
  },
  {
    googleReviewId: 'aussie_gmap_02',
    authorName: 'Krystian Reyes',
    roleOrLocation: 'Local Guide · Melbourne VIC',
    rating: 5,
    reviewText:
      "Looking into and doing all the research when it comes to choosing and organising solar panels and batteries can be daunting, and it definitely was for me. John from Aussie Smart Energy was amazing, so helpful and accommodating. He was the first person I spoke to. He helped me assess our household energy usage and presented options best suited for our household. After my initial conversation, went out and did more research and more quotes and came back to John to 1) help me understand more of what I was seeking, and 2) to see what he could do about other offers that were presented to me. In the end he not only worked a better value package, but also presented better products for my solar and battery package (we went with a 6.6kw solar panel set up with a 30kw battery system and Wifi monitored inverter). John was amazing through the whole process including organising all the government rebate paperwork, financing for the system, and organising delivery and installation of the solar panel and battery system. I would definitely recommend John's customer service to anyone who is thinking about going down the solar power path!",
    reviewDate: '6 months ago',
    publishTime: new Date(Date.now() - 180 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 2,
  },
  {
    googleReviewId: 'aussie_gmap_03',
    authorName: 'Rikin Ramani',
    roleOrLocation: 'Homeowner, Australia',
    rating: 5,
    reviewText:
      'Exceptional service from Aussie Smart Energy- professional, transparent, and delivered beyond expectations! Highly recommend Aussie Smart Energy for anyone looking for reliable solar and battery solutions!',
    reviewDate: '4 months ago',
    publishTime: new Date(Date.now() - 120 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 3,
  },
  {
    googleReviewId: 'aussie_gmap_04',
    authorName: 'Ihab Ibrahim',
    roleOrLocation: 'Resident, Australia',
    rating: 5,
    reviewText:
      "Excellent experience with Aussie Smart Energy. The team was honest, professional and very efficient throughout the whole process. Their pricing was very reasonable, the installation was completed quickly, and everything was explained clearly. Our solar and battery system has been working perfectly from day one, with no issues at all. Very happy with the quality of the installation and the service provided. I would definitely recommend Aussie Smart Energy to anyone considering solar and battery installation. Thank you to the whole team for a great job!",
    reviewDate: 'a month ago',
    publishTime: new Date(Date.now() - 30 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 4,
  },
  {
    googleReviewId: 'aussie_gmap_05',
    authorName: 'Steve King',
    roleOrLocation: 'Local Guide · Victoria',
    rating: 5,
    reviewText:
      'I have just had a 21 kw battery system installed by Aussie Smart Energy. John was recommended by the people who installed our EV Charger and was very helpful from start to finish. The battery was installed over half a day at my convenience and showed a massive reduction (monitoring via PowerPal) in grid energy supply from the moment it was linked up. Price and service were within my budget, and I am so happy with my purchase and the service provided by John and the team.',
    reviewDate: '9 months ago',
    publishTime: new Date(Date.now() - 270 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 5,
  },
  {
    googleReviewId: 'aussie_gmap_06',
    authorName: 'Bharat Bhalodi',
    roleOrLocation: 'Local Guide · Australia',
    rating: 5,
    reviewText:
      'Aussie Smart Energy has done a fantastic job! I got the best price for solar panels and a storage battery after comparing multiple quotes. Their team was professional, efficient, and very prompt with the installation. The whole process was smooth from start to finish. Highly recommend Aussie Smart Energy for anyone looking to switch to solar.',
    reviewDate: 'a year ago',
    publishTime: new Date(Date.now() - 365 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 6,
  },
  {
    googleReviewId: 'aussie_gmap_07',
    authorName: 'Mohit Patel',
    roleOrLocation: 'Homeowner, Australia',
    rating: 5,
    reviewText:
      'Aussie Smart Energy provided an exceptional experience from start to finish, with John patiently guiding us to the right product. The installation team was punctual, tidy, and highly professional, even taking the time to fully set up the monitoring app before leaving. Highly recommended for a seamless and stress-free solar journey!',
    reviewDate: '3 months ago',
    publishTime: new Date(Date.now() - 90 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 7,
  },
  {
    googleReviewId: 'aussie_gmap_08',
    authorName: 'Adelio Antonio',
    roleOrLocation: 'Verified Customer',
    rating: 5,
    reviewText:
      "Highly Recommend Aussie Smart Energy! I recently had a solar battery installed by the team at Aussie Smart Energy, and the experience was excellent. From the start, they were professional, took the time to understand my specific needs, and provided a solution perfectly tailored to our home's requirements. The installation was quick, tidy, and high-quality. What impressed me most was the after-care; they guided me through the app setup and clearly explained how to operate and monitor the unit. They ensured all my concerns were addressed promptly and thoroughly. If you're looking for a reliable solar solution, I highly recommend their services.",
    reviewDate: '5 months ago',
    publishTime: new Date(Date.now() - 150 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 8,
  },
  {
    googleReviewId: 'aussie_gmap_09',
    authorName: 'Steffano Madafferi',
    roleOrLocation: 'Verified Customer · Victoria',
    rating: 5,
    reviewText:
      "Switching to Aussie Smart Energy was one of the easiest decisions I've made, and a huge part of that is thanks to John. As someone who carefully tracks rates, benefits, and the fine print to maximise value, I naturally had a lot of questions before signing up. John was incredibly patient and transparent, and he walked me through every detail of the plan without any pushy sales tactics. The rates are highly competitive, and the billing is straightforward with absolutely no hidden surprises. It's genuinely refreshing to deal with an energy company here in Victoria that actually delivers on its promises and makes managing your account effortless. I cannot recommend them highly enough to anyone looking for a reliable provider—definitely ask for John if you are thinking of making the switch!",
    reviewDate: '5 months ago',
    publishTime: new Date(Date.now() - 150 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 9,
  },
  {
    googleReviewId: 'aussie_gmap_10',
    authorName: 'Sonali Bhoite',
    roleOrLocation: 'Verified Customer',
    rating: 5,
    reviewText:
      'Great experience with Aussie smart energy. The team was easy to deal with. The installation was completed before time and the installation crew was top notch. Very happy with the installation and services so far. Highly recommend.',
    reviewDate: '2 months ago',
    publishTime: new Date(Date.now() - 60 * 86400000).toISOString(),
    reviewLink: MAPS_URL,
    platform: 'google',
    source: 'google',
    isGoogleFeatured: false,
    isFeatured: true,
    isVerified: true,
    displayOrder: 10,
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Remove all existing google platform reviews and replace with real ones only
    await Review.deleteMany({ platform: 'google' });
    console.log('Purged previous google reviews.');

    // Insert only the 10 real verified reviews
    await Review.insertMany(realAussieSmartEnergyReviews);

    const total = await Review.countDocuments({ platform: 'google' });
    console.log(`Successfully seeded ${total} real Aussie Smart Energy reviews into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding reviews:', err);
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('seedReviews.js')) {
  seed();
}
