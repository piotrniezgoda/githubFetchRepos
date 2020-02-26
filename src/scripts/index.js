import '../styles/index.scss';
import logo from '../assets/logoGbx.svg';
import favicon from '../assets/favicon.ico';
import {renderResoult, renderContainer} from './renderResoult';

(function() {

  const searchBtn = document.querySelector('#searchBtn');
  const searchInput = document.querySelector('#site-search');
  const searchForm = document.querySelector('#searchForm');
  const logoImage = document.querySelector('#logo');

  const fetchUser = async (user) => {
    if(renderContainer.innerHTML.trim().length > 0) {
      renderContainer.innerHTML = '';
    }
    renderContainer.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
    const apiCall = await fetch(`https://api.github.com/users/${user}/repos`)
      .then((response) => {
        renderContainer.innerHTML = '';
        if(response.ok) {
          return response.json();
        } else {
          throw showError(`<h2 class="error-title">${response.status} - Nie znaleziono użytkownika :(</h2>`);
        };
      })
      .then((json) => {
        if(json.length === 0) {
          showError(`<h2 class="error-title">Użytkownik nie posiada żadnego repozytorium</h2>`);
        }
        for(const repo of json) {
          renderResoult(repo);
        };
      })
      .catch(() => {
        return;
      });
  };

  const showError = (text) => {
    renderContainer.innerHTML = text;
  };

  const showData = (e) => {
    e.preventDefault();
    if(searchInput.value === '') {
      return;
    }

    fetchUser(searchInput.value);
  };

  const initialAssets = () => {
    renderContainer.innerHTML = '<svg class="arrow-typeHere" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.85 123.65"><g data-name="Warstwa 2"><g fill="#d1d3d4" data-name="Warstwa 1"><text transform="translate(0 106.27)" font-size="16" font-family="Roboto-Regular, Roboto">Wpisz nazwę użytkownika</text><path d="M285.85 34.75a9.67 9.67 0 01-9.67 9.68H254a79.21 79.21 0 01-79.21 79.22H167a4.83 4.83 0 110-9.66h7.73a69.63 69.63 0 0069.55-69.55 9.68 9.68 0 019.72-9.67h22.2l-23.63-23.69a4.83 4.83 0 00-6.84 0l-23.61 23.66h5.29a4.83 4.83 0 110 9.66h-5.29a9.67 9.67 0 01-6.84-16.51l23.61-23.63a14.49 14.49 0 0120.52 0L283 27.92a9.64 9.64 0 012.85 6.83z"/></g></g></svg>';
  }; 

  searchBtn.addEventListener('click', showData);
  searchForm.addEventListener('submit', showData);
  logoImage.addEventListener('click', () => {
    renderContainer.innerHTML = '';
  });
  document.addEventListener('keyup', (e) => {
    if(e.keyCode === 8 && searchInput.value === '') {
      initialAssets();
    };
  });

  initialAssets();
})();