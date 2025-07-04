import React from "react";

const services = [
    {
        category: "Facials & Skin Treatments",
        items: [
            { name: "Express Facial (30 mins)", price: "$85" },
            { name: "Hydrating Facial", price: "$140" },
            { name: "Deep Cleansing Facial (Acne/Clogged)", price: "$160" },
            { name: "Signature Glow Facial + Steam", price: "$180" },
            { name: "Micro needling", price: "$220" },
            { name: "Chemical Peel (Light/Medical Grade)", price: "$165" },
            { name: "Hydra facial", price: "$195" },
            { name: "Back Facial", price: "$150" },
            { name: "LED Therapy (Add-On)", price: "$40" },
            { name: "Teen Facial", price: "$95" },
            { name: "Sensitive Skin / Rosacea Facial", price: "$145" },
        ],
    },
    {
        category: "Massage Therapy",
        items: [
            { name: "Relaxation Massage (60 min)", price: "$110" },
            { name: "Deep Tissue Massage", price: "$130" },
            { name: "Aromatherapy Massage", price: "$135" },
            { name: "Hot Stone Massage", price: "$140" },
            { name: "Prenatal Massage", price: "$130" },
            { name: "Head, Neck & Shoulder Massage", price: "$85" },
            { name: "Full Body Massage (Customized)", price: "$145" },
        ],
    },
    {
        category: "Nail Services",
        items: [
            { name: "Classic Manicure", price: "$40" },
            { name: "Shellac Manicure", price: "$55" },
            { name: "Gel Manicure", price: "$65" },
            { name: "Classic Pedicure", price: "$55" },
            { name: "Spa Pedicure", price: "$75" },
            { name: "Gel Extensions (Full Set)", price: "$85" },
            { name: "Customized Nail Art (Full Set)", price: "$95–$120" },
            { name: "French Tips / Nail Art (Add-On)", price: "$5–8 per nail" },
            { name: "Paraffin Wax Treatment (Add-On)", price: "$20" },
            { name: "Kids Mani/Pedi", price: "$35" },
        ],
    },
    {
        category: "Makeup Services",
        items: [
            { name: "Event Makeup", price: "$120" },
            { name: "Soft Glam", price: "$150" },
            { name: "Full Glam", price: "$160" },
            { name: "Signature Bridal Makeup", price: "$250" },
            { name: "Nikkah / Engagement Makeup", price: "$180" },
            { name: "Prom / Photoshoot Makeup", price: "$130" },
            { name: "Airbrush Makeup", price: "$190" },
            { name: "Touch-Up Service (Add-On)", price: "$50" },
        ],
    },
    {
        category: "Waxing & Hair Removal",
        items: [
            { name: "Eyebrow Threading/Waxing", price: "$22" },
            { name: "Upper Lip / Chin", price: "$18" },
            { name: "Full Face", price: "$55" },
            { name: "Underarms", price: "$30" },
            { name: "Full Arms", price: "$65" },
            { name: "Half Legs / Full Legs", price: "$55 / $90" },
            { name: "Bikini Line", price: "$65" },
            { name: "Brazilian Wax", price: "$70" },
            { name: "Full Body Wax", price: "$170" },
        ],
    },
    {
        category: "Laser Hair Removal",
        items: [
            { name: "Upper Lip", price: "$60" },
            { name: "Chin / Sideburns", price: "$60" },
            { name: "Full Face", price: "$120" },
            { name: "Underarms", price: "$85" },
            { name: "Arms (Half / Full)", price: "$110 / $145" },
            { name: "Legs (Half / Full)", price: "$150 / $275" },
            { name: "Bikini Line", price: "$130" },
            { name: "Brazilian", price: "$170" },
            { name: "Chest / Back", price: "$150 / $225" },
            { name: "Full Body", price: "$449" },
        ],
    },
    {
        category: "Hairstyling",
        items: [
            { name: "Blowdry (Basic)", price: "$65" },
            { name: "Curls / Waves", price: "$70" },
            { name: "Event Updo", price: "$120" },
            { name: "Bridal Hairstyling (Trial + Day)", price: "$220" },
            { name: "Scalp Oil Massage + Blowdry", price: "$85" },
            { name: "Hair Extensions Install (Clip-in)", price: "$95" },
            { name: "Braiding / Styling (Variety)", price: "$55–75" },
        ],
    },
    {
        category: "Photography Studio Add-On",
        items: [
            { name: "Glam Photoshoot (20 mins)", price: "$75" },
            { name: "Bridal Photography Session", price: "$110" },
            { name: "Instagram Content Shoot", price: "$85" },
            { name: "Before & After Shoot", price: "$60" },
        ],
    },
];

const ServicesPage = () => {
    return (
        <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-[#fdf6f6]/100 to-transparent  text-[#3e2e3d]"
        ><div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-serif mb-10 text-center">Our Services</h1>
                {services.map((section) => (
                    <div key={section.category} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 border-b border-[#e9d6d6] pb-1">
                            {section.category}
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.items.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between border border-[#eddcdc] px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40"
                                >
                                    <span>{item.name}</span>
                                    <span className="font-medium">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesPage;
