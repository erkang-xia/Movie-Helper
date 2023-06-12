import { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../utils/ToggleColorMode';
import {
  searchMovie,
  selectGenreOrCategory,
} from '../features/currentGenreOrCategory';
import { fetchToken } from '../utils';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  useEffect(() => {
    alanBtn({
      key: 'f500b959babdfa6a37b6b5fffeb17b3c2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genre, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (g) => g?.name?.toLowerCase() === genre.toLowerCase()
          );

          if (foundGenre) {
            console.log('find it');
            //window.location.href = '/';
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genres.startsWith('top') ? 'top_rated' : genres;
            //window.location.href = '/';
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          //window.location.href = '/';
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, [dispatch, setMode]);
};

export default useAlan;
