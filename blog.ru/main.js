let selectedPostId = null; 

getPosts();

async function getPosts() {
	let res = await fetch("https://api.blog.ru/posts");
	let posts = await res.json();

	document.querySelector(".post-list").innerHTML = "";

	posts.forEach((post) => {
		document.querySelector(".post-list").innerHTML += `
        <div class="card col-4">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                <a href="#" class="card-link">Подробнее</a>
                <a href="#" class="card-link" onclick="removePost(${post.id})">Удалить</a>
				<a href="#" class="card-link" onclick="selectPost('${post.id}', '${post.title}', '${post.body}')">Редактировать</a>
            </div>
        </div>`;
	});
}

async function addPost() {
	const title_value = document.querySelector("#title").value;
	const descr_value = document.querySelector("#descr").value;

	let formData = new FormData();
	formData.append("title", title_value);
	formData.append("body", descr_value);

	const res = await fetch("http://api.blog.ru/posts", {
		method: "POST",
		body: formData,
	});

	const data = await res.json();

	if (data.status === true) {
		await getPosts();
	}

	document.querySelector("#title").value = "";
	document.querySelector("#descr").value = "";
}

async function removePost(id) {
	const res = await fetch(`http://api.blog.ru/posts/${id}`, {
		method: "DELETE",
	});

	if (res.ok === true) {
		await getPosts();
	}
}

function selectPost(id, title, body) {
	selectedPostId = id;

	document.querySelector("#edit-title").value = title;
	document.querySelector("#edit-descr").value = body;
}

async function updatePost() {
	const title_value = document.querySelector("#edit-title").value;
	const descr_value = document.querySelector("#edit-descr").value;

	const data = {
		title: title_value,
		body: descr_value
	}

	const res = await fetch(`http://api.blog.ru/posts/${selectedPostId}`, {
		method: "PATCH",
		body: JSON.stringify(data)
	});

	if (res.ok === true) {
		await getPosts();
	}
}