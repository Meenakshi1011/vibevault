import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css'; // optional
import data from '../../utils/accordion';
import { ChevronDown } from 'lucide-react';

const Values = () => {
  return (
<section className="w-full px-8 py-12 bg-black text-white">
  <div className="max-w-7xl mx-auto"> {/* ← same container as above section */}
    <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
    
    <Accordion allowMultipleExpanded={false} preExpanded={[0]}>
      {data.map((item, i) => (
        <AccordionItem key={i} uuid={i} className="border-b border-gray-700">
          <AccordionItemHeading>
            <AccordionItemButton className="flex items-center justify-between w-full py-4 px-2 sm:px-6 bg-black text-white hover:bg-gray-900 transition duration-200">
              <div className="flex items-center space-x-3">
                {item.icon && (
                  <div className="text-white text-xl">
                    {item.icon}
                  </div>
                )}
                <span className="text-lg font-medium">{item.heading}</span>
              </div>
              <ChevronDown size={20} className="text-gray-400" />
            </AccordionItemButton>
          </AccordionItemHeading>

          <AccordionItemPanel className="bg-black text-gray-300 px-6 py-4 transition-all duration-300 ease-in-out">
            <p className="text-sm">{item.detail}</p>
          </AccordionItemPanel>

        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>


  );
};

export default Values;
