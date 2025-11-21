import { useRouter } from '../hooks/useRouter';
import styles from './Link.module.css';

export function Link({ href, children, exact = true, ...restOfProps }) {
  const { navigateTo, currentPath } = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  const isActive = exact ? href === currentPath : currentPath.startsWith(href);

  return (
    <a
      className={isActive ? styles.active : ''}
      href={href}
      {...restOfProps}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
