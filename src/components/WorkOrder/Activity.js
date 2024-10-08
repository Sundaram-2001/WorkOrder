import React from 'react';
import Accordion from './Accordion';
import Checkbox from './Checkbox';
import WorkItem from './WorkItem';

const Activity = React.memo(({ packageName, activity, selectedItems, onSelectActivity, onSelectWorkItem, expandedPackages, onPackageExpand }) => {
  const isActivitySelected = activity.workItems.every(item =>
    selectedItems[`${packageName}-${activity.name}-${item}`]
  );

  return (
    <Accordion
      title={
        <Checkbox
          checked={isActivitySelected}
          onChange={(e) => onSelectActivity(packageName, activity.name, e.target.checked)}
          label={activity.name}
        />
      }
      isOpen={expandedPackages[`${packageName}-${activity.name}`]}
      onToggle={() => onPackageExpand(`${packageName}-${activity.name}`)}
      className="ml-4"
    >
      {activity.workItems.map((item) => (
        <WorkItem
          key={item}
          packageName={packageName}
          activityName={activity.name}
          item={item}
          isSelected={selectedItems[`${packageName}-${activity.name}-${item}`] || false}
          onSelectWorkItem={onSelectWorkItem}
        />
      ))}
    </Accordion>
  );
});

export default Activity;