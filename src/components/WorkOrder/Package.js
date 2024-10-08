import React, { useCallback } from 'react';
import Accordion from './Accordion';
import Checkbox from './Checkbox';
import Activity from './Activity';

const Package = React.memo(({ packageData, selectedItems, expandedPackages, onSelectPackage, onSelectActivity, onSelectWorkItem, onPackageExpand }) => {
  const isPackageSelected = packageData.activities.every(activity =>
    activity.workItems.every(item =>
      selectedItems[`${packageData.name}-${activity.name}-${item}`]
    )
  );

  const calculateTotal = useCallback(() => {
    let total = 0;
    packageData.activities.forEach(activity => {
      activity.workItems.forEach(item => {
        if (selectedItems[`${packageData.name}-${activity.name}-${item}`]) {
          total += packageData.rate;
        }
      });
    });
    return total.toFixed(2);
  }, [packageData, selectedItems]);

  return (
    <Accordion
      title={
        <div className="grid grid-cols-3 w-full items-center">
          <div className="flex items-center">
            <Checkbox
              checked={isPackageSelected}
              onChange={(e) => onSelectPackage(packageData.name, e.target.checked)}
              label={packageData.name}
            />
          </div>
          <div>{packageData.rate}</div>
          <div>₹ {calculateTotal()}</div>
        </div>
      }
      isOpen={expandedPackages[packageData.name]}
      onToggle={() => onPackageExpand(packageData.name)}
    >
      {packageData.activities.map((activity) => (
        <Activity
          key={activity.name}
          packageName={packageData.name}
          activity={activity}
          selectedItems={selectedItems}
          onSelectActivity={onSelectActivity}
          onSelectWorkItem={onSelectWorkItem}
          expandedPackages={expandedPackages}
          onPackageExpand={onPackageExpand}
        />
      ))}
    </Accordion>
  );
});

export default Package;