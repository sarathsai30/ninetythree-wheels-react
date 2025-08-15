import React from 'react';
import { X, CheckCircle, Car, DollarSign, FileText, Shield } from 'lucide-react';
import { Button } from './ui/button';

const CarBuyingGuide = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const guideSteps = [
        {
            icon: <DollarSign className="w-6 h-6 text-green-600" />,
            title: "Set Your Budget",
            content: "Determine how much you can afford including down payment, monthly payments, insurance, and maintenance costs."
        },
        {
            icon: <Car className="w-6 h-6 text-blue-600" />,
            title: "Research Models",
            content: "Compare different car models, read reviews, check reliability ratings, and consider fuel efficiency."
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-green-600" />,
            title: "Inspect & Test Drive",
            content: "Thoroughly inspect the vehicle and take it for a test drive to check performance and comfort."
        },
        {
            icon: <Shield className="w-6 h-6 text-red-600" />,
            title: "Get Insurance",
            content: "Shop for insurance quotes before buying and ensure you understand warranty terms and coverage."
        }
    ];

    const tips = [
        "Don't rush the decision - take your time to research",
        "Get a pre-purchase inspection from a trusted mechanic",
        "Negotiate the price based on market research",
        "Consider the total cost of ownership, not just the purchase price",
        "Read all contracts carefully before signing"
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Car Buying Guide</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Introduction */}
                    <div className="mb-6">
                        <p className="text-gray-600 leading-relaxed">
                            Buying a car is a significant investment. Follow this comprehensive guide to make an informed decision
                            and ensure you get the best value for your money.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
                        {guideSteps.map((step, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2">
                                        {index + 1}. {step.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tips */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pro Tips</h3>
                        <ul className="space-y-2">
                            {tips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 text-sm font-medium mb-2">
                            Ready to start your car buying journey?
                        </p>
                        <p className="text-blue-600 text-sm">
                            Use our car search feature to find the perfect vehicle that matches your needs and budget.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50">
                    <Button
                        onClick={onClose}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Got it, let's find my car!
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CarBuyingGuide;