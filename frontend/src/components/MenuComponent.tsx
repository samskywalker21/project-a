import {NavLink} from '@mantine/core';
import {Link} from '@tanstack/react-router';

const MenuComponent = () => {
  return (
    <>
      <NavLink
        renderRoot={(props) => (
          <Link
            to='/dashboard'
            activeOptions={{exact: true}}
            {...props}
          />
        )}
        label='Home'
      />
      <NavLink label='Tasks'>
        <NavLink label='Add Task' />
        <NavLink label='To Do' />
        <NavLink label='Task History' />
      </NavLink>
      <NavLink label='Reference'>
        <NavLink label='Users' />
        <NavLink label='Task Type' />
      </NavLink>
      <NavLink label='Report'>
        <NavLink label='Accomplishment' />
        <NavLink label='By Task Type' />
      </NavLink>
    </>
  );
};

export default MenuComponent;
