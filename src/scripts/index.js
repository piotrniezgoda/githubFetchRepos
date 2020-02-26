import '../styles/index.scss';
import logo from '../assets/logoGbx.svg';
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

  searchBtn.addEventListener('click', showData);
  searchForm.addEventListener('submit', showData);
  logoImage.addEventListener('click', () => {
    renderContainer.innerHTML = '';
  });
  document.addEventListener('keyup', (e) => {
    if(e.keyCode === 8 && searchInput.value === '') {
      renderContainer.innerHTML = '';
    };
  });


})();