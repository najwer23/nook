import { Footer } from 'najwer23morsels/lib/Footer';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/Navigation';

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
  ) : null;
};
