import { times, random, last } from 'lodash';
import randomcolor from 'randomcolor';
import { Box, Stack, Typography } from '@mui/material';

import { Gallery } from '../lib'

const getNumber = () => {
  const rangePerBreakpoint: [number, [number, number]][] = [
    [0, [40, 160]],
    [768, [60, 200]],
    [1024, [80, 240]],
  ];

  const range = last(rangePerBreakpoint.filter(([bp]) => window.innerWidth >= bp))!;

  return Math.ceil(random(range[1][0], range[1][1]) / 10) * 10;
}

const images = times(25, (index: number) => {
  const bg = randomcolor().replace('#', '');
  const w = getNumber();
  const h = getNumber();
  const getImgUrl = (retina = 0) =>  `https://placehold.co/${w}x${h}${retina ? `@${retina}x` : ''}/${bg}/fff.webp?font=roboto`;

  return {
    src: getImgUrl(),
    srcSet: [getImgUrl(), getImgUrl(2), getImgUrl(3)],
    alt: `Example image ${index}`
  };
});

const App = () => {
  const options = {
    imageOffset: 10,
    galleryHeight: '100%',
    animation: {
      duration: '.5s',
    }
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Typography variant="h3" component="h3">React Random Gallery</Typography>
            <Box sx={{ display: 'inline-flex', alignSelf: 'center', padding: '.5rem .8rem', backgroundColor: 'lightgrey', borderRadius: '.25em' }}>npm i react-random-gallery</Box>
          </Stack>
        </Box>
        <Box sx={{ border: '1px solid grey', flexGrow: 1, width: '100%', height: '100%' }}>
          <Gallery images={images} options={options} />
        </Box>
      </Stack>
    </Box>
  )
};

export default App
