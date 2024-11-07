import React from 'react';

const Notifications = () => {
  const notifications = [
    { message: "New diagnosis results are available.", date: "2024-11-01" },
    { message: "Your consultation with Dr. Jane Doe is scheduled for tomorrow at 10:00 AM.", date: "2024-10-30" },
    { message: "New education content on eczema management has been added.", date: "2024-10-28" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-500 mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-md flex justify-between">
            <p className="text-gray-700">{notification.message}</p>
            <span className="text-gray-500 text-sm">{notification.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
