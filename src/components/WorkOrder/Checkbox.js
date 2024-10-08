import React from 'react';

const Checkbox = React.memo(({ checked, onChange, label }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
    <span>{label}</span>
  </label>
));

export default Checkbox;