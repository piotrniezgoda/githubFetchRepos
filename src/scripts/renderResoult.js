const renderContainer = document.querySelector('#resoultsGrid');

const renderResoult = ({name: title, description = 'Brak opisu', default_branch: branch, html_url: repo_url, owner: {avatar_url: avatar_url}}) => {
  let trimmedDesc = '';
  if(description !== null) {
    trimmedDesc = description.length > 80 ? description.substring(0, 80 - 3) + "..." : description;
  } else {
    trimmedDesc = 'Brak opisu';
  };

  const article = document.createElement('article');
  article.classList.add('repo');

  const photoContainer = document.createElement('div');
  photoContainer.classList.add('repo__photo');

  const avatar = document.createElement('img');
  avatar.setAttribute('src', avatar_url);
  avatar.setAttribute('alt', ' ');
  

  const basicInfoContainer = document.createElement('div');
  basicInfoContainer.classList.add('repo__info');

  const repoTitle = document.createElement('h2');
  repoTitle.textContent = title;
  repoTitle.classList.add('repo__title');

  const repoDesc = document.createElement('p');
  repoDesc.textContent = trimmedDesc;
  repoDesc.classList.add('repo__desc');

  const branchInfo = document.createElement('span');
  branchInfo.textContent = branch;
  branchInfo.classList.add('repo__branch');

  const link = document.createElement('a');
  link.classList.add('repo__btnLink');
  link.setAttribute('href', repo_url);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '36');
  svg.setAttribute('height', '30');
  svg.setAttribute('fill', 'none');
  svg.classList.add('repoArrow');

  const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arrowPath.setAttribute('d', 'M35.4142 16.4142c.7811-.781.7811-2.0474 0-2.8284L22.6863.85787c-.7811-.78105-2.0474-.78105-2.8284 0-.7811.78104-.7811 2.04737 0 2.82842L31.1716 15 19.8579 26.3137c-.7811.7811-.7811 2.0474 0 2.8284.781.7811 2.0473.7811 2.8284 0l12.7279-12.7279zM0 17h34v-4H0v4z');

  svg.appendChild(arrowPath);
  link.appendChild(svg);

  const basicInfoFragment = document.createDocumentFragment();
  basicInfoFragment.appendChild(repoTitle);
  basicInfoFragment.appendChild(repoDesc);
  basicInfoFragment.appendChild(branchInfo);

  
  basicInfoContainer.appendChild(basicInfoFragment);

  photoContainer.appendChild(avatar);

  article.appendChild(link);
  article.insertBefore(basicInfoContainer, link);
  article.insertBefore(photoContainer, basicInfoContainer);

  renderContainer.appendChild(article);
  
};



export {renderResoult,renderContainer};