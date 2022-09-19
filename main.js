
let namePeople = null;
let next;
let prev;
let URLPeople = 'https://swapi.dev/api/people/';
let infoPeople;
let listFilms;


$(document).ready(function() {
    $.ajax({
        url: URLPeople,
        method: 'GET'
        }).done(function(result) {
            console.log(result);
            next = result.next;
            // console.log(next);
            prev = result.previous;
            // console.log(prev);

            namePeople = result.results;
            // console.log(namePeople); // arr of obj of peoples characters
            
            function People(name, url) {
                this.name = name,
                this.url = url,
                this.render = function Render() {
                    return `<p class="name-list">
                                <a href="#" class="link-btn" data-link="${this.url}">${this.name}</a>
                            </p>`
                };   
            };
            
            const listPeople = namePeople.map((value) => {
                const people = new People(value.name, value.url);
                return people.render();
              }).join(" ");
              
            $('.list-people').append(listPeople);


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
            // });
            
        }).fail(function(error) {
            console.log('Error', error);
        }).always(function() {
            console.log('Always');
        });
});
