
let namePeople = null;
let next;
let prev;
let URLPeople = 'https://swapi.dev/api/people/';
let infoPeople;
let listFilms;
let count;

let fetch = function (searchQuery) {
    let url =
      'https://swapi.dev/api/people' + '/?search=' + searchQuery;
  
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json',
      success: function (data) {
        renderResults(data);
      },
      error: function (textStatus) {
        console.log(textStatus);
      },
    });
  };
  
let renderResults = function (data) {
    $('.results').empty();
  
    for (let i = 0; i < data.results.length; i++) {
        let result = data.results[i];
  
        let resultsHTML =
            `<div class="close-btn">
                <button class="btn" type="button">close</button>
            </div>
            <div class="col-md-6">
            <h4>${result.name}</h4>
            <div> <strong> Birth Year </strong>:${result.birth_year}</div>
            <div> <strong> Eye Color </strong>:${result.eye_color}</div>
            <div> <strong> Gender </strong>:${result.gender}</div>
            <div> <strong> Height </strong>:${result.height}</div>
            <hr>
            </div>`;
  
        $('.results').html(resultsHTML);
        $('.results').show();
        $('.btn').click(function () {
            $('.results').hide();
        });   
    }
};
  
$('.search-form').on('submit', function (e) {
    e.preventDefault();
  
    let searchQuery = $('#search-query').val();
    console.log($('#search-query').val());
    fetch(searchQuery);
});



function People(name, url) {
    this.name = name,
    this.url = url,
    this.render = function Render() {
        return `<p class="name-list">
                    <a href="#" class="link-btn" data-link="${this.url}">${this.name}</a>
                </p>`
    };   
};


$(document).ready(function() {
    fetch();
    $.ajax({
        url: URLPeople,
        method: 'GET'
        }).done(function(result) {
            console.log(result);
            // next = result.next;
            // // console.log(next);
            // $('#next').attr('data-link', next);
            // $('#next').click(function(e) {
            //     if (next !== null) {
            //         let url = next;
            //         console.log(url);
            //         $.ajax({
            //             url: url,
            //             method: 'GET'
            //             }).done(function(result) {
            //                 console.log(result);
            //                 console.log(next);
            //                 namePeople = result.results;
              
            //         const listPeople = namePeople.map((value) => {
            //             const people = new People(value.name, value.url);
            //             return people.render();
            //         }).join(" ");
                  
            //         $('.list-people').html(listPeople);

            //         $('.link-btn').click(function(event) {
            //             let link = event.target;
            //             let url = link.getAttribute('data-link');
            //                 $.ajax({
            //                     url: url,
            //                     method: 'GET'
            //                 }).done(function(res) {
            //                     // console.log(res);
            //                     let films = res.films;
            //                     // console.log(films);
            //                     let newArr = [];
            //                     $.each(films,function(i, value){
            //                         console.log(value);
            //                         let url = value;
            //                         $.ajax({
            //                             url: url,
            //                             method: 'GET'
            //                         }).done(function(res){
            //                             console.log(res);
            //                             newArr.push(res.title);
            //                             listFilms = `<p>${newArr.join('</br>')}</p>`;   
            //                             console.log(listFilms);
            //                             $('.list-films').html('Films:' + listFilms);
            //                         }).fail(function(error) {
            //                             console.log('Error', error);
            //                         }).always(function() {
            //                             console.log('Always');
            //                         });   
            //                     });
                            
            //                     infoPeople = `
            //                     <div class="close-btn">
            //                         <button class="btn" type="button">close</button>
            //                     </div>
            //                     <h2 class="title-list">${res.name}</h2>
            //                     <ul class = "list">
            //                         <li class = "name-list">Year: ${res.birth_year}</li>
            //                         <li class = "name-list">Eye color: ${res.eye_color}</li>
            //                         <li class = "name-list">Gender: ${res.gender}</li>
            //                         <li class = "name-list">Height: ${res.height}</li>
            //                         <li class = "name-list">Hair color: ${res.hair_color}</li>
            //                         <li class = "name-list list-films"></li>
            //                         <li class = "name-list">Mass: ${res.mass}</li>
            //                         <li class = "name-list">Skin color: ${res.skin_color}</li>
            //                     </ul>`;
            //                     $('.info').html(infoPeople);
            //                     $('.info').show();
            //                     $('.btn').click(function () {
            //                         $('.info').hide();
            //                     });   
            //                 })

            //         for (count = 2; count <=9; count++) {
            //             console.log(count);
            //         next = URLPeople +'?page=' + count;
            //         }
                            
            //                 }
                            
            // })
            // prev = result.previous;
            // // console.log(prev);
            // $('#prev').attr('data-link', prev);
            // $('#prev').click(function(e) {
            //     $('#prev').attr('href', prev);
            //     console.log($('href'));
            //     if (prev !== null) {
            //         let url = prev;
            //         console.log(url);
            //         $.ajax({
            //             url: url,
            //             method: 'GET'
            //             }).done(function(result) {
            //                 console.log(result);
            //                 console.log(prev);
            //                 namePeople = result.results;
              
            //     const listPeople = namePeople.map((value) => {
            //         const people = new People(value.name, value.url);
            //         return people.render();
            //       }).join(" ");
                  
            //     $('.list-people').html(listPeople);
    
            //         })
                
            //        prev = URLPeople +'?page=' + count--;
                
                
            //     }
                
            // })
            namePeople = result.results;
                        
            const listPeople = namePeople.map((value) => {
                const people = new People(value.name, value.url);
                return people.render();
              }).join(" ");
              
            $('.list-people').html(listPeople);


            $('.link-btn').click(function(event) {
                let link = event.target;
                let url = link.getAttribute('data-link');
                $.ajax({
                    url: url,
                    method: 'GET'
                }).done(function(res) {
                    // console.log(res);
                    let films = res.films;
                    // console.log(films);
                    let newArr = [];
                    $.each(films,function(i, value){
                        console.log(value);
                        let url = value;
                        $.ajax({
                            url: url,
                            method: 'GET'
                        }).done(function(res){
                            console.log(res);
                            newArr.push(res.title);
                            listFilms = `<p>${newArr.join('</br>')}</p>`;   
                            console.log(listFilms);
                            $('.list-films').html('Films:' + listFilms);
                        }).fail(function(error) {
                            console.log('Error', error);
                        }).always(function() {
                            console.log('Always');
                        });   
                    });
                   
                    infoPeople = `
                    <div class="close-btn">
                        <button class="btn" type="button">close</button>
                    </div>
                    <h2 class="title-list">${res.name}</h2>
                    <ul class = "list">
                        <li class = "name-list">Year: ${res.birth_year}</li>
                        <li class = "name-list">Eye color: ${res.eye_color}</li>
                        <li class = "name-list">Gender: ${res.gender}</li>
                        <li class = "name-list">Height: ${res.height}</li>
                        <li class = "name-list">Hair color: ${res.hair_color}</li>
                        <li class = "name-list list-films"></li>
                        <li class = "name-list">Mass: ${res.mass}</li>
                        <li class = "name-list">Skin color: ${res.skin_color}</li>
                    </ul>`;
                    $('.info').html(infoPeople);
                    $('.info').show();
                    $('.btn').click(function () {
                        $('.info').hide();
                    });   
                }).fail(function(error) {
                    console.log('Error', error);
                }).always(function() {
                    console.log('Always');
                });               
            })
    
        }).fail(function(error) {
            console.log('Error', error);
        }).always(function() {
            console.log('Always');
        });
});
