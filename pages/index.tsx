import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Center, MyCard } from '@/components';
import { selectCommonDataState } from '@/store';

const Home = () => {
  const [element, setElement] = useState(<></>);
  const { techIconsHtmlStrings } = useSelector(selectCommonDataState);

  // web components from '@/components/Rain' are not defined on the server, useEffect ensures their existence
  useEffect(() => {
    import('@/components/Rain').then(({ default: Rain }) => {
      setElement(
        <Center>
          <Rain htmlStrings={techIconsHtmlStrings} />
          <MyCard />
        </Center>,
      );
    });
  }, []);

  return element;
};

export default Home;
