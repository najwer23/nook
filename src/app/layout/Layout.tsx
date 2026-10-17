import { NavigationIn } from '@app/navigation/in/NavigationIn';
import { Footer } from 'najwer23morsels/lib/Footer';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/home/Navigation';

interface Props {
  type: 'home' | 'auth' | 'in';
}

export const Layout: React.FC<Props> = ({ type }) => {
  return type === 'home' ? (
    <>
      <Navigation outlet={<Outlet />} />
    </>
  ) : type === 'auth' ? (
    <>
      <Outlet />
      <Footer author="Nook" initialYear={2026} />
    </>
  ) : type === 'in' ? (
    <>
      <NavigationIn outlet={<Outlet />} />
    </>
  ) : null;
};
