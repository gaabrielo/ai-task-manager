import { useLocation } from 'react-router';
import { data } from '~/components/app-sidebar';

export function useHeaderTitle() {
  const location = useLocation();
  const currentRoute = [...data.navMain, ...data.navOthers].find(
    (item) => item.url === location.pathname
  );

  if (
    !currentRoute &&
    data.navOthers.some((n) => location.pathname.startsWith(n.url))
  ) {
    return (
      data.navOthers.find((n) => location.pathname.startsWith(n.url))?.title ||
      ''
    );
  }

  return currentRoute?.title || '';
}
