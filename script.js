let body = document.body;  // без этой строчки ничего почему-то не работает

let preloaderEl = document.getElementById('preloader');

setTimeout(function() {
	preloaderEl.classList.add('hidden');
}, 3000);

let url = window.location.toString();

function checkUsername(url) {
 	let urlSplit = url.split('=');
	let name = urlSplit[1];
	if (name == undefined) {
		name = 'YuliyaHit';
	}
 		return name;
 }

console.log(checkUsername(url));

 
const getTime = new Promise((resolve, reject) => {
	setTimeout(() => resolve(new Date()), 3000)
})

const getInformation = fetch(`https://api.github.com/users/${checkUsername(url)}`);

Promise.all([getInformation, getTime]) 
	.then(([res, time]) => res.json()) // декодирует ответ в формате JSON
    .then(json => {
        console.log(json.avatar_url);
        console.log(json.name);
        console.log(json.bio);
        console.log(json.html_url);

		let img = new Image();   // Создаёт новый элемент изображения
		img.src = json.avatar_url; // Устанавливает путь
        body.append(img); // создает картинку в разметке в конце

        let name = document.createElement('p'); // создаем абзац
        if (json.name != null) {       // если имя не нул, то выводим имя, иначе инфа недоступна 
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация об име пользователе недоступна';
        }

        body.append(name);

        name.addEventListener("click", () => location.assign(`https://github.com/${checkUsername(url)}`)); // именz профиля становиться ссылкой его страницу

        let bio = document.createElement('p');  //аналогично с именем
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация о bio пользователя недоступна';
        }
        body.append(bio);

    })

    .then(() => {
   
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
       //* добавление ведущих нулей */
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    let time = hours + ":" + minutes + ":" + seconds;
    return console.log(time);
        })

    .catch(err => alert('Информация о пользователе недоступна'));

