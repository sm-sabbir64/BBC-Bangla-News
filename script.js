//promise -->pending, resolve(success), reject(error)

const categoryContainer = document.getElementById("categoryContainer");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.categories);
      const categories = data.categories;
      // console.log(categories);

      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:border-b-4
         hover:border-red-600 border-red-600 cursor-pointer">
        ${cat.title}</li>
       `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    if (e.target.localName === "li") {
      // console.log(e.target);
      e.target.classList.add("border-b-4");
      loadNewsCategory(e.target.id);
    }
  });
};

const loadNewsCategory = (categoryId) => {
  // console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
  .then((res => res.json()))
  .then(data => {
    showNewsByCategory(data.articles)
    
  })
  .catch(err =>{
    console.log(err);
    
  })
};

const showNewsByCategory=(article)=>{
  console.log(article);
  newsContainer.innerHTML = ""
  article.forEach(article => {
    newsContainer.innerHTML +=`
    <div>
    <img src="${article.image.srcset[0].url}"></img>
    <h1>${article.title}</h1>
    </div>
    `
  })
  
}

loadCategory();

// Second Category te function call kora jai
// try {
//     const loadCategoryAsync = async()=>{
//     const res = await  fetch("https://news-api-fs.vercel.app/api/categories");
//     const data = await res.json()
//     console.log(data);
// }
// loadCategoryAsync()

// } catch (error) {
//     console.log(error);

// }
