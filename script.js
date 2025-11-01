//promise -->pending, resolve(success), reject(error)
const categoryContainer = document.getElementById("categoryContainer");

const newsContainer = document.getElementById("newsContainer");

const bookmarkContainer = document.getElementById("bookmarkContainer");

const bookmarkCount = document.getElementById("bookmarkCount");

let bookmarks = [];

newsContainer.addEventListener("click", (e) => {
  // console.log(e.target);
  // console.log(e.target.innerText);
  if (e.target.innerText === "Bookmark") {
    // console.log("bookmark button clicked");
    // console.log(e.target.parentNode.children[0].innerText);
    handleBookmarks(e);
  }
});

const handleBookmarks = (e) => {
  // console.log(e.target);

  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id
  // console.log(id);
  

  bookmarks.push({
    title: title,
    id: id,
  });
  // console.log(bookmarks);
  showBookmarks(bookmarks);
   
};

const showBookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    // console.log(bookmark);

    bookmarkContainer.innerHTML += `
    <div class="border my-2 p-1">
      <h1>${bookmark.title}</h1>
      <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn text-[12px]">Delete</button>
    </div>
    `;
  });
   bookmarkCount.innerText = bookmarks.length
};

const handleDeleteBookmark = (bookmarkId) => {
  // console.log(bookmarkId, "id");

  const filteredBookmarks = bookmarks.filter(
    (bookmark) => bookmark.id !== bookmarkId
  );
  // console.log(filterBookmarks);
  bookmarks = filteredBookmarks;
  showBookmarks(bookmarks);
};

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
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (article) => {
  // console.log(article);
  newsContainer.innerHTML = "";
  article.forEach((article) => {
    newsContainer.innerHTML += `
 <div class="border border-gray-300 rounded-lg mt-5 ">
    <div>
        <img class="w-full rounded" src="${article.image.srcset[0].url}"></img>
    </div>

    <div id="${article.id}" class="p-2">
    <h1 class="font-extrabold">${article.title}</h1>
    <p class="text-medium mt-2">${article.time}</p>
    <button class="btn mt-2">Bookmark</button>
    </div>

  </div>
   
    `;
  });
};

loadCategory();
loadNewsCategory("main");

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
