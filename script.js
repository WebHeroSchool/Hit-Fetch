let body = document.body;  // без этой строчки ничего почему-то не работает

let url = window.location.toString();

function checkUsername(url) {
 	let urlSplit = url.split('=');
	let name = urlSplit[1];
	if (name == undefined) {
		name = 'YuliyaHit';
	}
 	else {
 		return name;
 	}
 }

console.log(checkUsername(url));

 fetch(`https://api.github.com/users/${checkUsername(url)}`)
	.then(res => res.json()) // декодирует ответ в формате JSON
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
            name.innerHTML = 'Информация об имепользователе недоступна';
        }

        body.append(name);

        name.addEventListener("click", () => location.assign(`https://api.github.com/users/${checkUsername(url)}`)); // именz профиля становиться ссылкой его страницу

        let bio = document.createElement('p');  //аналогично с именем
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация о bio пользователя недоступна';
        }
        body.append(bio);

    })

    .catch(err => alert('Информация о пользователе недоступна'));





