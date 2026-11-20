import React from 'react';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

const CommercialCustomize = () => {
    return (
        <main className="max-w-4xl mx-auto pt-36 sm:pt-40 lg:pt-44 pb-20 px-4">
            <SEO
                title="Custom Commercial Solar Design | Aussie Smart Energy"
                description="Configure a tailored commercial solar and battery storage system designed specifically for your commercial facility and load profile across NSW, QLD, and VIC."
                focusKeyword="custom commercial solar design"
                canonical="/commercial/customize"
                schema={getBreadcrumbSchema([
                    { name: 'Home', url: '/' },
                    { name: 'Commercial Solar', url: '/solar/commercial' },
                    { name: 'Custom Solution', url: '/commercial/customize' },
                ])}
            />
            <h1 className="text-3xl font-bold mb-4">Customize Commercial Solution</h1>
            <p className="text-slate-600 mb-6">Configure a tailored solar + battery solution for your commercial site.</p>
            <div className="space-y-4">
                <div className="p-4 border rounded">Placeholder form or configurator will go here.</div>
            </div>
        </main>
    );
};

export default CommercialCustomize;
