import { useAuth } from '@/hooks/useAuth';
import { Selector } from '@/shared/components/Selector';
import { Link } from 'react-router';

const FRUIT_ITEMS = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Grapes',
    value: 'grapes',
  },
  {
    label: 'Pineapple',
    value: 'pineapple',
  },
];

export default function HomePage() {
  const { currentUser } = useAuth();
  return (
    <>
      {/* <HomePage /> */}
      <h1>Home Page</h1>
      <Link to='/users'>Users Page</Link>
      <p>{currentUser?.email}</p>
      <Selector
        placeholder='Select a fruit'
        label='Fruits'
        items={FRUIT_ITEMS}
      />
    </>
  );
}
