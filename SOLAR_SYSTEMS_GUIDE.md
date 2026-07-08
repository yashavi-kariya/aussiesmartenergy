# Solar System Pages Guide

## Overview
I've created 4 complete solar system detail pages with unique 3D animations, interactive components, and comprehensive product information for your Aussie Smart Energy website.

## Pages Created

### 1. **6.6kW Residential Solar System**
- **Route:** `/solar/6.6kw`
- **Target:** Small households (1-3 bedrooms)
- **Key Features:**
  - 18-22 premium panels
  - 25-year warranty
  - ~$2,200 annual savings
  - 3-4 year payback period
  - Basic 3D panel animation
  - Interactive component showcase

### 2. **10.5kW Medium Residential Solar System** 
- **Route:** `/solar/10.5kw`
- **Target:** Medium to large homes (3-5 bedrooms)
- **Key Features:**
  - 28-32 premium panels
  - Battery-ready design
  - ~$3,500 annual savings
  - Most popular choice
  - Enhanced 2-panel 3D animation
  - Premium styling
  - **Marked as "Most Popular"**

### 3. **13.2kW Premium Residential Solar System**
- **Route:** `/solar/13.2kw`
- **Target:** Large properties & energy-independent homes
- **Key Features:**
  - 36-40 ultra-premium panels
  - Commercial-grade components
  - ~$4,200 annual savings
  - 4x4 panel 3D array animation
  - Ultra-premium styling
  - Enterprise-level features

### 4. **Commercial Solar Solutions**
- **Route:** `/solar/commercial`
- **Target:** Businesses, warehouses, offices
- **Key Features:**
  - Scalable 20kW to 1MW+
  - Custom solutions
  - Enterprise-grade components
  - 4x3 massive panel array animation
  - Multiple power lines visualization
  - Commercial pricing consultation

## Design Features

### 3D Animations
Each page includes unique 3D solar panel visualizations:
- **CSS 3D Transforms** with perspective and rotateX/Y effects
- **Floating animations** using CSS keyframes
- **Energy particle effects** showing power generation
- **Animated energy flow** connecting components
- **Progressive complexity** based on system size

### Interactive Components Section
- **4-way component picker** with circular navigation buttons
- **Dynamic switching** between components (Panels, Inverter, Mounting, Installation)
- **Animated connection lines** between components
- **Live specifications** that update based on selected component
- **Gradient transitions** and smooth hover effects

### Color Schemes
- **6.6kW:** Blue/Red theme (matches brand)
- **10.5kW:** Blue/Red with gold accents (most popular)
- **13.2kW:** Purple/Blue/Red gradients (premium tier)
- **Commercial:** Orange/Red/Gray (enterprise feel)

## Data Structure

All system information is stored in:
```
src/data/solarSystems.js
```

Each system includes:
- Hero stats (capacity, panels, savings, payback)
- 4 component details (panels, inverter, mounting, installation)
- Features and specifications for each component
- System benefits
- Ideal customer profiles
- Pricing information

## How to Update Content

To modify system information, edit `/src/data/solarSystems.js`:

```javascript
"6.6kw": {
  title: "6.6kW Solar System",
  description: "...",
  components: {
    solarPanels: { ... },
    inverter: { ... },
    mounting: { ... },
    installation: { ... }
  },
  benefits: [...],
  idealFor: [...],
  pricing: {...}
}
```

## Navigation

### From Home Page
The Solar Solutions section on the home page now links directly to each system:
- Click "View Details & Get Quote" button
- Or "Learn More" link on each card

### Direct URLs
- `http://localhost:5175/solar/6.6kw`
- `http://localhost:5175/solar/10.5kw`
- `http://localhost:5175/solar/13.2kw`
- `http://localhost:5175/solar/commercial`

## Component Architecture

### Page Components
- `src/pages/Solar6kw.jsx` - 6.6kW page
- `src/pages/Solar10kw.jsx` - 10.5kW page
- `src/pages/Solar13kw.jsx` - 13.2kW page
- `src/pages/SolarCommercial.jsx` - Commercial page
- `src/pages/SolarSystemPage.jsx` - Generic reusable component (can be used with dynamic routing)

### Key Sections in Each Page
1. **Hero Section** - 3D panel visualization + key info
2. **Components Section** - Interactive picker + details
3. **Benefits Section** - System advantages
4. **Ideal For Section** - Target customers
5. **Pricing Section** - Investment & savings

## Animations Included

### Page Load
- Fade in effect on load
- Staggered animation of content sections

### 3D Panel Effects
- `perspective-1000/1500/2000` - CSS 3D depth
- `rotateX(25deg) rotateY(-15deg)` - 3D tilt
- `animate-float` - Gentle floating motion
- Grid pulse effect on panel cells

### Energy Flow
- `slideDown` animation - Falling energy pulses
- Multiple pulse layers with different delays
- Gradient lines connecting components
- Power indicators on flows

### Interactive Elements
- Hover scale transforms on cards
- Smooth transitions on component selection
- Animated checkmarks and icons
- Gradient text effects

## Testing Checklist

- [ ] Visit each solar system page
- [ ] Click through component tabs
- [ ] Verify 3D animations load
- [ ] Check energy flow animation
- [ ] Test mobile responsiveness
- [ ] Verify pricing displays correctly
- [ ] Test links to contact page
- [ ] Check all buttons work

## Future Enhancements

Potential improvements:
1. Add testimonials carousel per system
2. Add ROI calculator
3. Add before/after imagery
4. Add video tours
5. Add comparison matrix
6. Add installation timeline
7. Add warranty comparison
8. Add performance guarantee badges

## Performance Notes

- Uses CSS animations (GPU accelerated)
- No heavy JavaScript libraries
- Optimized with `will-change` hints
- Reduced motion support for accessibility
- Minimal DOM manipulation

---

**Created:** July 7, 2026
**Theme:** Aussie Smart Energy Brand Colors (Blue #1e2d53, Red #ef4444)
**Framework:** React + Vite + Tailwind CSS
