import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MovieService } from './service/movie-service.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MOVIES } from './data';

export interface Movies {
  movie_title: string;
  director_name: string;
  actor_1_name: string;
  actor_2_name: string;
  genres: string;
  language: string;
  country: string;
  content_rating: string;
  budget: string;
  title_year: string;
  plot_keywords: string;
  movie_imdb_link: string;
}

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {

  movieCtrl = new FormControl();
  langCtrl = new FormControl();
  countryCtrl = new FormControl();
  sortCtrl = new FormControl();

  store = {
    searchedMovie: []
  };

  filteredMovie: Observable<Movies[]>;
  movies: Movies[] = [];
  searchedMovie;
  countries = [];
  languages = [];

  constructor(
    public snackBar: MatSnackBar,
    private service: MovieService
  ) {
    this.getMoviesData();
    this.onInputValueChange();
  }

  onInputValueChange = () => {
    this.filteredMovie = this.movieCtrl.valueChanges
      .pipe(
      startWith(''),
      map(movie => movie ? this._filterMovie(movie) : this.movies.slice())
      );

    this.langCtrl.valueChanges.subscribe((data) => {
      this.searchedMovie = Object.create(this.store.searchedMovie);
      this.searchedMovie = this.searchedMovie.filter((obj) => {
        const country = this.countryCtrl.value;
        if (country !== '') {
          if (obj['language'] === data && obj['country'] === country) {
            return obj;
          }
        } else {
          return obj['language'] === data;
        }
      });
    });

    this.countryCtrl.valueChanges.subscribe((country) => {
      this.searchedMovie = Object.create(this.store.searchedMovie);
      this.searchedMovie = this.searchedMovie.filter((obj) => {
        const language = this.langCtrl.value;
        if (language !== '') {
          if (obj['language'] === language && obj['country'] === country) {
            return obj;
          }
        } else {
          return obj['country'] === country;
        }
      });
    });

    this.sortCtrl.valueChanges.subscribe((data) => {
      this.searchedMovie.sort(this.sortMovie);
    });

  }

  getMoviesData = () => {
    this.service.getMovies().subscribe(
      (success: Movies[]) => {
        this.movies = success;
      },
      (error) => {
        console.log(error);
        this.movies = MOVIES; // incase if user is offline :-)
      }
    );
  }

  private _filterMovie(value: string): Movies[] {
    const filterValue = value.toLowerCase();

    return this.movies.filter(state => state.movie_title.toLowerCase().indexOf(filterValue) === 0);
  }

  searchMovie = (data) => {
    this.searchedMovie = [];
    let searchData = '';
    this.langCtrl.setValue('');
    this.countryCtrl.setValue('');
    this.sortCtrl.setValue('');
    if (data.length === 0) {
      searchData = data;
    } else {
      searchData = this.movieCtrl.value;
      if (searchData.length < 3) {
        this.snackBar.open('Minimum 3 character is required to proceed with manual search', 'OK', { duration: 5000 });
        return;
      }
    }
    this.searchedMovie = this.getSearchedMovies(searchData);
    this.store.searchedMovie = Object.create(this.searchedMovie);
    this.getValueToImplementFilterOption();
  }

  getSearchedMovies = (data) => {
    return this.movies.filter((value) => {
      const movie = value['movie_title'].toLowerCase();
      if (movie.search(data.toLowerCase()) !== -1) {
        return value;
      }
      /*for (const key in value) {  //  In order to search in all the object
        if (value.hasOwnProperty(key)) {
          const element = value[key].toLowerCase();
          if (element.search(data.toLowerCase()) !== -1) {
            return value;
          }
        }
      }*/
    });
  }

  getValueToImplementFilterOption = () => {
    this.countries = [];
    this.languages = [];
    this.searchedMovie.forEach((data) => {
      const country = data['country'];
      const language = data['language'];
      if (this.countries.indexOf(country) === -1) {
        this.countries.push(country);
      }
      if (this.languages.indexOf(language) === -1) {
        this.languages.push(language);
      }
    });
  }

  sortMovie = (): Number => {
    if (this.sortCtrl.value === 'rating') {
      this.searchedMovie.sort((a, b) => {
        if (a['content_rating'] < b['content_rating']) {
          return -1;
        }
        if (a['content_rating'] > b['content_rating']) {
          return 1;
        }
        return 0;
      });
    } else if (this.sortCtrl.value === 'title_year') {
      this.searchedMovie.sort((a, b) => {
        if (a['title_year'] < b['title_year']) {
          return -1;
        }
        if (a['title_year'] > b['title_year']) {
          return 1;
        }
        return 0;
      });
    }
    return 0;
  }

}
