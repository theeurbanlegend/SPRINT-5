// // NotificationContext.js
// import React, { createContext, useState, useContext } from 'react';

// const NotificationContext = createContext();

// export const useNotification = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//   const [adminNotifications, setAdminNotifications] = useState([]);
//   const [staffNotifications, setStaffNotifications] = useState([]);

//   const addAdminNotification = (message) => {
//     setAdminNotifications([...adminNotifications, message]);
//   };

//   const addStaffNotification = (message) => {
//     setStaffNotifications([...staffNotifications, message]);
//   };

//   const removeAdminNotification = (id) => {
//     setAdminNotifications(adminNotifications.filter((notification) => notification.id !== id));
//   };

//   const removeStaffNotification = (id) => {
//     setStaffNotifications(staffNotifications.filter((notification) => notification.id !== id));
//   };

//   return (
//     <NotificationContext.Provider
//       value={{
//         adminNotifications,
//         staffNotifications,
//         addAdminNotification,
//         addStaffNotification,
//         removeAdminNotification,
//         removeStaffNotification,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };
// NotificationContext.js
import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

