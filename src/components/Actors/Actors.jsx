import {
  useGetActorDetailQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import Pagination from '../../Pagination/Pagination';
import React, { useState } from 'react';
import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { Movie as MovieIcon, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import useStyles from './styles';
import { MoviesList } from '..';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const { data: actorRecommendations, isFetching: isRecommendationsFetching } =
    useGetMoviesByActorIdQuery({ id: id, page: page });
  const classes = useStyles();

  if (isFetching || isRecommendationsFetching) {
    {
      console.log('fetching');
    }
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong! - Go back to Home</Link>
      </Box>
    );
  }

  return (
    <>
      <Grid container className={classes.containerSpaceAround}>
        <Grid
          item
          sm={12}
          lg={4}
          style={{ display: 'flex', marginBottom: '30px' }}
        >
          {console.log(data)}
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid item direction="column" lg={7} mt="30px">
          <Typography variant="h2" gutterBottom ml="3px">
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom ml="9px">
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Grid container className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="justify"
                style={{ marginLeft: '10px' }}
              >
                {data?.biography || 'Sorry, no biography yet...'}
              </Typography>
            </Box>
          </Grid>

          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/name/${data.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{ borderColor: 'primary.main' }}
                  >
                    <Typography
                      component={Link}
                      to="/"
                      color="inherit"
                      variant="subtitle2"
                      style={{ textDecoration: 'none' }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          Movie
        </Typography>
        {actorRecommendations ? (
          <div>
            <MoviesList movies={actorRecommendations} numberOfMovies={12} />
            <Pagination
              currentPage={page}
              setPage={setPage}
              totalPages={data.total_pages}
            />
          </div>
        ) : (
          <Box>Sorry, nothing is found.</Box>
        )}
      </Box>
    </>
  );
};

export default Actors;
