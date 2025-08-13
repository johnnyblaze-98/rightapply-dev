import React from 'react';

const companies = [
  { name: "Rocket Mortgage", logo: "https://logo.clearbit.com/rocketmortgage.com" },
  { name: "PayPal", logo: "https://logo.clearbit.com/paypal.com" },
  { name: "Rivian", logo: "https://logo.clearbit.com/rivian.com" },
  { name: "Walmart", logo: "https://logo.clearbit.com/walmart.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "BigCommerce", logo: "https://logo.clearbit.com/bigcommerce.com" },
  { name: "Amex", logo: "https://logo.clearbit.com/americanexpress.com" },
  { name: "Discover", logo: "https://logo.clearbit.com/discover.com" },
  { name: "Stratacache", logo: "https://logo.clearbit.com/stratacache.com" },
  { name: "Verizon", logo: "https://logo.clearbit.com/verizon.com" },
  { name: "Sony", logo: "https://logo.clearbit.com/sony.com" },
  { name: "Geotab", logo: "https://logo.clearbit.com/geotab.com" },
  { name: "CVS Pharmacy", logo: "https://logo.clearbit.com/cvs.com" },
  { name: "Couchbase", logo: "https://logo.clearbit.com/couchbase.com" },
  { name: "ThoughtSpot", logo: "https://logo.clearbit.com/thoughtspot.com" },
  { name: "Confluent", logo: "https://logo.clearbit.com/confluent.io" },
  { name: "Databricks", logo: "https://logo.clearbit.com/databricks.com" },
  { name: "Nylas", logo: "https://logo.clearbit.com/nylas.com" },
  { name: "C3.ai", logo: "https://logo.clearbit.com/c3.ai" },
  { name: "PubMatic", logo: "https://logo.clearbit.com/pubmatic.com" },
  { name: "Zuora", logo: "https://logo.clearbit.com/zuora.com" },
  { name: "Amplitude", logo: "https://logo.clearbit.com/amplitude.com" },
  { name: "Mixpanel", logo: "https://logo.clearbit.com/mixpanel.com" },
  { name: "Segment", logo: "https://logo.clearbit.com/segment.com" },
  { name: "Sentry", logo: "https://logo.clearbit.com/sentry.io" },
  { name: "Airbyte", logo: "https://logo.clearbit.com/airbyte.io" },
  { name: "Monte Carlo", logo: "https://logo.clearbit.com/montecarlodata.com" },
  { name: "Astronomer", logo: "https://logo.clearbit.com/astronomer.io" },
  { name: "RudderStack", logo: "https://logo.clearbit.com/rudderstack.com" },
  { name: "Heap", logo: "https://logo.clearbit.com/heap.io" },
  { name: "Fivetran", logo: "https://logo.clearbit.com/fivetran.com" },
  { name: "Hightouch", logo: "https://logo.clearbit.com/hightouch.com" },
  { name: "MParticle", logo: "https://logo.clearbit.com/mparticle.com" },
  { name: "Crux", logo: "https://logo.clearbit.com/cruxdata.com" },
  { name: "Tecton", logo: "https://logo.clearbit.com/tecton.ai" },
  { name: "Rockset", logo: "https://logo.clearbit.com/rockset.com" },
  { name: "Starburst", logo: "https://logo.clearbit.com/starburst.io" },
  { name: "Timescale", logo: "https://logo.clearbit.com/timescale.com" },
  { name: "Materialize", logo: "https://logo.clearbit.com/materialize.com" },
  { name: "DataStax", logo: "https://logo.clearbit.com/datastax.com" },
  { name: "Imply", logo: "https://logo.clearbit.com/imply.io" },
  { name: "Vertica", logo: "https://logo.clearbit.com/vertica.com" },
  { name: "ClickHouse", logo: "https://logo.clearbit.com/clickhouse.com" }
];

const CompanyLogoCard = ({ company, index }) => {
  return (
    <div 
      key={`${company.name}-${index}`}
      className="flex-shrink-0 w-32 h-28 mx-3 bg-white shadow rounded-lg p-3 flex flex-col items-center justify-center group hover:scale-105 transition-all duration-300"
    >
      <div className="flex-1 flex items-center justify-center mb-1">
        <img 
          src={company.logo} 
          alt={`${company.name} logo`} 
          className="max-w-[60px] max-h-[35px] object-contain group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
      <p className="text-gray-600 text-xs font-medium text-center truncate w-full">
        {company.name}
      </p>
    </div>
  );
};

const ScrollingTrain = () => {
  return (
    <>
      <div className="relative overflow-hidden py-4">

        {/* Left and right gradient overlays (no blur) */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll whitespace-nowrap space-x-4 px-6">
          {[...companies, ...companies].map((company, index) => (
            <CompanyLogoCard key={index} company={company} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};

export default ScrollingTrain;
