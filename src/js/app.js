import { API_KEY } from './constans';
import img404 from '../image/404.jpg';
import { getDayAndTime } from './api';
document.addEventListener('DOMContentLoaded', () =>{
    const getNews = async () => {
        const data =  await fetch (`https://newsapi.org/v2/everything?q=tesla&from=2023-02-16&sortBy=publishedAt&apiKey=${API_KEY}`)
        const json = await data.json();
        console.log(json);
        if(data.ok && data.status==200){
            const {articles} = json;
            console.log(articles);
            const wrapper = document.querySelector('.wrapper');
            const news = document.querySelector('.news');
            wrapper.append(news);
    
            function createItem (articles) {
                articles.forEach(({description, title, url, urlToImage, publishedAt,

                }) => {
                    
                    const li = document.createElement('li');
                    li.classList.add('news__item');
                    li.innerHTML = `
                    <h2 class="news__title">${title}</h2>
                    <div class="news__flex">
                    <img src="${urlToImage}" alt="" class="news__img">
                    <div class="news__descr">${description} <br> <a href="${url}" class="news__link">read more</a>
                    <div class = news__data>Publication time:<br>${getDayAndTime(publishedAt)}</div>
                    </div>
                  </div>
                 
                    
                    `
                    news.append(li);
                });
    
            };
            createItem(articles);
            
        }else {
            const createError = () => {
                const container  = document.querySelector('.container');
                console.log(container);
                container.remove();
                const image404 = document.createElement('img');
                image404.setAttribute('src', img404);
                document.body.append(image404);

            };
            createError();

        };
       
    };
    getNews();
  

    
});