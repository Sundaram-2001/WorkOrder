import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const WorkOrderCreation = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedPackages, setExpandedPackages] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const packages = useMemo(() => [
    {
      name: 'Civil 1',
      rate: 567.80,
      activities: [
        {
          name: 'Activity 1',
          workItems: ['Work Item 1', 'Work Item 2', 'Work Item 3']
        },
        {
          name: 'Activity 2',
          workItems: ['Work Item 1', 'Work Item 2', 'Work Item 3']
        },
        { name: 'Activity 3', workItems: [] },
        { name: 'Activity 4', workItems: [] }
      ]
    },
    {
      name: 'Civil 2',
      rate: 567.80,
      activities: [
        {
          name: 'Foundation Work',
          workItems: ['Excavation', 'Formwork', 'Reinforcement', 'Concrete Pouring']
        },
        {
          name: 'Structural Work',
          workItems: ['Column Casting', 'Beam Casting', 'Slab Work']
        },
        { name: 'Finishing', workItems: ['Plastering', 'Painting', 'Flooring'] }
      ]
    },
    {
      name: 'Civil 3',
      rate: 567.80,
      activities: [
        {
          name: 'Site Preparation',
          workItems: ['Clearing', 'Grading', 'Compaction']
        },
        {
          name: 'Drainage System',
          workItems: ['Pipe Laying', 'Manhole Construction', 'Catch Basin Installation']
        },
        { name: 'Quality Control', workItems: [] }
      ]
    },
    {
      name: 'Civil 4',
      rate: 567.80,
      activities: [
        {
          name: 'Masonry Work',
          workItems: ['Brick Laying', 'Block Work', 'Stone Cladding']
        },
        {
          name: 'Roofing',
          workItems: ['Truss Installation', 'Shingle Laying', 'Waterproofing']
        },
        { name: 'Landscaping', workItems: ['Grading', 'Planting', 'Irrigation System'] },
        { name: 'Final Inspection', workItems: [] }
      ]
    }
  ], []);

  const totalAmount = 2986792;

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'Other') {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, []);

  const handlePackageExpand = useCallback((packageName) => {
    setExpandedPackages(prev => ({ ...prev, [packageName]: !prev[packageName] }));
  }, []);

  const handleSelectPackage = useCallback((packageName, isSelected) => {
    setSelectedItems(prev => {
      const updatedItems = { ...prev };
      packages.find(p => p.name === packageName).activities.forEach(activity => {
        if (activity.workItems.length === 0) {
          updatedItems[`${packageName}-${activity.name}`] = isSelected;
        } else {
          activity.workItems.forEach(item => {
            updatedItems[`${packageName}-${activity.name}-${item}`] = isSelected;
          });
        }
      });
      return updatedItems;
    });
  }, [packages]);

  const handleSelectActivity = useCallback((packageName, activityName, isSelected) => {
    setSelectedItems(prev => {
      const updatedItems = { ...prev };
      const activity = packages.find(p => p.name === packageName).activities
        .find(a => a.name === activityName);
      
      if (activity.workItems.length === 0) {
        updatedItems[`${packageName}-${activityName}`] = isSelected;
      } else {
        activity.workItems.forEach(item => {
          updatedItems[`${packageName}-${activityName}-${item}`] = isSelected;
        });
      }
      return updatedItems;
    });
  }, [packages]);

  const handleSelectWorkItem = useCallback((packageName, activityName, itemName, isSelected) => {
    setSelectedItems(prev => ({
      ...prev,
      [`${packageName}-${activityName}-${itemName}`]: isSelected
    }));
  }, []);

  const TabButton = ({ isActive, onClick, children }) => (
    <button
      className={`px-4 py-2 mr-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const SimpleAlert = ({ title, description }) => (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
      <p className="font-bold">{title}</p>
      <p>{description}</p>
    </div>
  );

  const Package = ({ packageData }) => {
    const isExpanded = expandedPackages[packageData.name];
    const isSelected = packageData.activities.every(activity =>
      activity.workItems.length === 0
        ? selectedItems[`${packageData.name}-${activity.name}`]
        : activity.workItems.every(item =>
            selectedItems[`${packageData.name}-${activity.name}-${item}`]
          )
    );

    return (
      <div className="mb-4">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center">
            <button onClick={() => handlePackageExpand(packageData.name)} className="mr-2">
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => handleSelectPackage(packageData.name, e.target.checked)}
              className="mr-2"
            />
            <span className="font-bold">{packageData.name}</span>
          </div>
          
          <div>${packageData.rate.toFixed(2)}</div>
          
          <div>₹2,98,6792</div>
        </div>
        {isExpanded && (
          <div className="ml-6 mt-2">
            {packageData.activities.map((activity) => (
              <div key={activity.name} className="mb-2">
                <input
                  type="checkbox"
                  checked={
                    activity.workItems.length === 0
                      ? selectedItems[`${packageData.name}-${activity.name}`]
                      : activity.workItems.every(item => selectedItems[`${packageData.name}-${activity.name}-${item}`])
                  }
                  onChange={(e) => handleSelectActivity(packageData.name, activity.name, e.target.checked)}
                  className="mr-2"
                />
                <span>{activity.name}</span>
                {activity.workItems.length > 0 && (
                  <div className="ml-6">
                    {activity.workItems.map((item) => (
                      <div key={item}>
                        <input
                          type="checkbox"
                          checked={selectedItems[`${packageData.name}-${activity.name}-${item}`] || false}
                          onChange={(e) => handleSelectWorkItem(packageData.name, activity.name, item, e.target.checked)}
                          className="mr-2"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Create Workorder</h1>
        <button className="bg-teal-400 text-white px-4 py-2 rounded">Save</button>
      </div>

      <div className="mb-4">
        <TabButton isActive={activeTab === 'Overview'} onClick={() => handleTabChange('Overview')}>
          Overview
        </TabButton>
        <TabButton isActive={activeTab === 'Other'} onClick={() => handleTabChange('Other')}>
          Other
        </TabButton>
      </div>

      {showAlert && (
        <SimpleAlert
          title="Hello World!"
          description="You clicked on the 'Other' tab."
        />
      )}

      {activeTab === 'Overview' && (
        <div className="bg-blue-100 p-4 rounded">
          <div className="grid grid-cols-3 font-bold mb-2">
            <div>Packages</div>
            <div>Rate (in sqft)</div>
            <div>Total</div>
          </div>
          {packages.map((packageData) => (
            <Package key={packageData.name} packageData={packageData} />
          ))}
          
        </div>
      )}
    </div>
  );
};

export default WorkOrderCreation;
