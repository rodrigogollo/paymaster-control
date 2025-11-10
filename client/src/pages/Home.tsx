import { Selector } from '@/shared/components/Selector';
import { Suspense } from 'react';

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <HomePage /> */}
      <h1>Home Page</h1>
      {/* <p>{userData?.email}</p> */}
      <Selector
        placeholder='Select a fruit'
        label='Fruits'
        items={FRUIT_ITEMS}
      />
    </Suspense>
  );
}
