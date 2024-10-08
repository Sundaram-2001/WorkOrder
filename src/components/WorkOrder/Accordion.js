import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = React.memo(({ title, children, isOpen, onToggle, className = '' }) => (
  <div className={`border rounded-md mb-2 ${className}`}>
    <button
      className="w-full text-left p-4 flex justify-between items-center"
      onClick={onToggle}
    >
      {title}
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && <div className="p-4 border-t">{children}</div>}
  </div>
));

export default Accordion;