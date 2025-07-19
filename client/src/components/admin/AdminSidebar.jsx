import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusSquare,
  List,
  ListCollapse
} from 'lucide-react';
import profileImage from '../../assets/profile.png'; // Adjust the path accordingly

const AdminSidebar = () => {
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: profileImage
  };

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Add Movies', path: '/admin/add-movies', icon: PlusSquare },
    { name: 'List Movies', path: '/admin/list-movies', icon: List },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapse },
    { name: 'Add Live Shows', path: '/admin/add-live-shows', icon: PlusSquare },
    { name: 'List Live Shows', path: '/admin/list-live-shows', icon: List },
  ];

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />
      <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>
      
      <div className='w-full'>
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path} end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:px-10 first:mt-6 text-gray-400 ${isActive ? 'bg-primary/15 text-primary' : ''}`
            }>
            {({ isActive }) => (
              <>
                <link.icon className='w-5 h-5' />
                <p className='max-md:hidden'>{link.name}</p>
                {isActive && (
                  <span className="w-1.5 h-10 rounded-sm bg-primary absolute right-0" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
