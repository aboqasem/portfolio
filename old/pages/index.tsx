import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Center, MyCard } from '@/components';
import { selectCommonDataState } from '@/store';

const Home = () => {
  const [rainElement, setRainElement] = useState(<></>);
  const { techIconsHtmlStrings } = useSelector(selectCommonDataState);

  // web components from '@/components/Rain' are not defined on the server, importing them here ensures their existence
  useEffect(() => {
    import('@/components/Rain').then(({ default: Rain }) => {
      setRainElement(<Rain htmlStrings={techIconsHtmlStrings} />);
    });
  }, []);

  return (
    <Center>
      {rainElement}
      <MyCard />
    </Center>
  );
};

export default Home;
