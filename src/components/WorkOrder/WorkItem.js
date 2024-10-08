import React from 'react';
import Checkbox from './Checkbox';

const WorkItem = React.memo(({ packageName, activityName, item, isSelected, onSelectWorkItem }) => (
  <div className="ml-4">
    <Checkbox
      checked={isSelected}
      onChange={(e) => onSelectWorkItem(packageName, activityName, item, e.target.checked)}
      label={item}
    />
  </div>
));

export default WorkItem;