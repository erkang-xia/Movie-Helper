import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Actors, MovieInfo, Movies, NavBar, Profile } from '.';
import { Content, Main, StyledToolbar } from './style';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <CssBaseline />
      <NavBar />
      <Content>
        <StyledToolbar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/categories/:id" element={<Movies />} />
          <Route path="/genre/:id" element={<Movies />} />
          <Route path="/approved" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Content>
    </Main>
  );
};

export default App;
